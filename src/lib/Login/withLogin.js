import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { validate, handleSubmit } from "./LoginLib";

const withLogin = LoginComponent => {
  return class LoginContainer extends React.Component {
    static propTypes = {
      doLogin: PropTypes.func,
      onSubmit: PropTypes.func.isRequired, //(credentials: {username, password}) => Promise
      requiredLabel: PropTypes.string,
      redirectPath: PropTypes.string,
      loggedin: PropTypes.bool,
      recoverPasswordLabel: PropTypes.string
    };
    static contextType = AuthContext;
    state = {
      errorMessage: ""
    };

    handleSubmit = async credentials => {
      const result = await handleSubmit({
        credentials,
        onSubmit: this.props.onSubmit,
        handleUserLogin: this.context.handleUserLogin,
        console
      });
      if (result && result.error) {
        this.setState({
          errorMessage: result.error
        });
        return;
      }
      return result;
    };

    handleRecoverPasswordClick = () => {
      if (!this.props.history) {
        return console.warn(
          "History not found. Try to pass password to login component"
        );
      }
      this.props.history.push("/recuperar-senha");
    };

    handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({
        errorMessage: ""
      });
    };

    render() {
      const { screen: Screen, redirectPath, ...rest } = this.props;
      const { loggedin } = this.context;

      if (Screen) {
        return <Screen handleLogin={this.login} />;
      }

      if (loggedin) {
        return <Redirect to={redirectPath || "/"} />;
      }

      return (
        <LoginComponent
          {...rest}
          onPasswordRecoverClick={this.handleRecoverPasswordClick}
          onSnackbarClose={this.handleSnackbarClose}
          validate={validate(this.props.requiredLabel)}
          onPasswordRecoverLick={this.handleRecoverPasswordClick}
          errorMessage={this.state.errorMessage}
          requiredLabel={this.props.requiredLabel}
          onSubmit={this.handleSubmit}
        />
      );
    }
  };
};

export default withLogin;
