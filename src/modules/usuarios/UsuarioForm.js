import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Field } from "react-final-form";
import { CrudForm } from "../../lib/Components";
import { Select, TextField } from "../../lib/Fields";
import { useEntityManager } from "../../lib/Hooks";
import usuariosRepository from "./usuariosRepository";
import { ROLES } from "./UsuariosList";
import { useAbility } from ".";
import { Email } from "../../Components";
import * as yup from "yup";
import yupValidation from "../../lib/yupValidation";

const useStyles = makeStyles(theme => ({
  container: {
    ["@media (min-height:800px)"]: {
      marginTop: theme.spacing(3)
    }
  }
}));

const usuarioSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email Inválido")
    .required("Obrigatório"),
  name: yup.string().required("Obrigatório"),
  role: yup.string().required("Obrigatório"),
  password: yup
    .string()
    .notRequired()
    .when("isNew", (isNew, passwordSchema) =>
      isNew ? passwordSchema.required("Obrigatório") : passwordSchema
    )
});

const validate = yupValidation(usuarioSchema);

const UsuarioForm = props => {
  const abilities = useAbility();
  const classes = useStyles();

  const entityManager = useEntityManager({
    repository: usuariosRepository
  });
  const cannotUpdate =
    abilities.cannot("update", "usuarios") && !entityManager.isNew;

  return (
    <Grid className={classes.container}>
      <CrudForm
        {...props}
        {...entityManager}
        validate={validate}
        disableSubmit={cannotUpdate}
        withPaper
      >
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Field fullWidth name="name" label="Nome" component={TextField} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Email />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              type="password"
              fullWidth
              name="password"
              label="Senha"
              hideEmpty
              component={TextField}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
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
      </CrudForm>
    </Grid>
  );
};

export default UsuarioForm;
