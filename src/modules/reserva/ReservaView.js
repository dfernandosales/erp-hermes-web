import React, { useContext, useState } from "react";
import { useEntityManager } from '../../lib/Hooks'
import { ReadView } from '../../lib/Components'
import reservaRepository from "./reservaRepository";
import { AlertDialog } from "../../Components";
import * as R from 'ramda';
import { AuthContext } from '../../lib/Login'
import { Typography } from "@material-ui/core";
import { Snackbar } from "../../lib/Common";

const ReservaView = (props) => {
    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState('');
    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        callback: null,
        id: 0,
        message: "",
    });

    const entityManager = useEntityManager({
        path: "reserva",
        repository: reservaRepository,
    })
    const config = [
        {
            title: "Reserva",
            children: {
                id: {
                    label: "Numero Reserva",
                    format: id => id || "Não cadastrado",
                },
                dataInicioReserva: {
                    label: "Data Check-In",
                },
                dataFimReserva: {
                    label: "Data Check-Out",
                    format: dataFimReserva => dataFimReserva || "Checkout não realizado ",
                },
                status:{
                    label:"Status"
                },
                valorReserva: {
                    label: "Valor da Reserva",
                    format: valorReserva => new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(valorReserva)
                },
                reservaHospede: {
                    label: "Hospedes",
                    format: reservaHospede => reservaHospede?.length? reservaHospede?.map(element => <p>{element.hospede.nomeCompleto}</p>) : "Não cadastrado"
                },
                
            },
        },
    ];

    const handleActionsClick = async (id, callback) => {
        setConfirmationDialog({
            open: true,
            callback,
            id,
            message: '',
        });
    };

    const closeDialog = () => {
        setConfirmationDialog({
            open: false,
            callback: null,
            id: 0,
        });
    };

    const handleConfirmationDialog = async data => {
        const { id, callback } = confirmationDialog;
        if (callback) {
            const response = await callback(id, data);
            if (response.ok) {
                entityManager.getItem();
                closeDialog();
                setMessage(`Status alterado com sucesso!`);
            } else {
                setMessage(
                    R.pathOr("Ops, algo deu errado!", ["data", "message"], response)
                );
                entityManager.getItem();
            }
        }
    };

    const customActionsFactory = item => {
        const actions = [
            {
                can: ["ADMIN", "FUNC"],
                show: ["ABERTA"],
                label: "Checkout",
                props: {
                    color: "primary",
                    variant: "contained",
                },
                onClick: () => {
                    handleActionsClick(item.id, reservaRepository.checkout);
                },
            }
        ]

        const actionsByStatus = actions.filter(
            action => action.show.includes(item.status)
        );

        const actionsByRole = actionsByStatus.filter(action =>
            action.can.includes(user.role)
        );
        return actionsByRole;
    }

    const customActions = customActionsFactory(entityManager.item);

    return (
        <>
            <ReadView
                customActions={customActions}
                {...entityManager}
                config={config}
                edit={false}
                onGoBack={() => props.history.goBack()}
            />
            <AlertDialog
                open={!!confirmationDialog.open}
                buttonLabel="Não"
                handleClose={closeDialog}
                primaryAction={handleConfirmationDialog}
                title="Deseja realizar o check-out dessa reserva?"
                message={confirmationDialog.message}
                primaryActionButtonLabel="Confirmar"
            />
            <Snackbar message={message} />
        </>
    );
};

export default ReservaView;
