import React from "react";
import { Select, TextField } from "../../lib/Fields";
import { List, Filter } from "../../lib/Components";
import { useFilter, useListRepository } from "../../lib/Hooks";
import { Field } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import usuariosRepository from "./usuariosRepository";
import { useAbility } from ".";
import { getListActions } from "../../lib/crudAuthorization";
import { Email } from "../../Components";

export const ROLES = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Funcionario", value: "FUNC" }
];

const formatRole = value => {
  const role = ROLES.find(r => r.value === value);
  return role ? role.label : "";
};

const UsuarioFilter = () => {
  const filter = useFilter({});
  return (
    <Filter {...filter} labels={{ find: "Buscar", clear: "Limpar" }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Field name="name" label="Nome" fullWidth component={TextField} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Email />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name="role"
            label="Cargo"
            component={Select}
            options={ROLES}
            hideEmpty
          />
        </Grid>
      </Grid>
    </Filter>
  );
};

const UsuariosList = ({ ...props }) => {
  const abilities = useAbility();
  const listOptions = {
    defaultOrder: "name",
    fields: {
      name: {
        label: "Nome"
      },
      email: {
        label: "E-mail"
      },
      role: {
        label: "Cargo",
        format: role => formatRole(role)
      }
    }
  };

  const listHook = useListRepository({
    repository: usuariosRepository,
    defaultSort: "name",
    path: "users"
  });

  const actions = getListActions(abilities, listHook, "usuarios");
  return (
    <>
      <UsuarioFilter />
      <List
        {...props}
        {...listHook}
        {...actions}
        onClickView={null}
        hideDownloadIcon
        listOptions={listOptions}
      />
    </>
  );
};

export default UsuariosList;
