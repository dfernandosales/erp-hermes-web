import React from "react";
import { TextField } from "final-form-material-ui";
import { Field, Form as FinalForm } from "react-final-form";
import { Button, Paper, Grid, withStyles, Typography } from "@material-ui/core";
import { Snackbar } from "../../lib/Common";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#52c8fa",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 496,
    height: 512,
  },
});

const LoginForm = ({
  logo,
  onSubmit,
  errorMessage,
  handleSnackBarClose,
  classes,
}) => {
  const validate = values => {
    return {
      email: values.email ? undefined : "Obrigatório",
      password: values.password ? undefined : "Obrigatório",
    };
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={4}>
        <Grid container direction="row" justify="center" alignItems="center">
          {logo}
          <Grid item xs={8}>
            <FinalForm onSubmit={onSubmit} validate={validate}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        component={TextField}
                        label="Email"
                        name="email"
                        type="email"
                      />
                      <Field
                        fullWidth
                        component={TextField}
                        label="Senha"
                        name="password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Entrar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </FinalForm>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message={errorMessage}
      />
    </div>
  );
};
export default withStyles(styles)(LoginForm);
