export const formatMoney = number => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency", currency: "BRL",
    })
        .format(number);
};

export const formatCpf = (v) => {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")

    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
}

export const situacaoReserva = [
    { label: "Aberta", value: "ABERTA" },
    { label: "Finalizada", value: "FINALIZADA" },
];


export const formatDateTime = date => {
    if (date) {
        return new Date(date).toLocaleString("pt-BR");
    }
    return "Não informados";
};
