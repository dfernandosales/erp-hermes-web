import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class SimpleDialog extends React.Component {
  render() {
    const {
      open,
      buttonLabel = "Ok",
      handleClose,
      primaryAction,
      primaryActionButtonLabel,
      title,
      message
    } = this.props;
    const handlePrimaryAction = () => {
      primaryAction();
      handleClose();
    };
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color={primaryAction ? "default" : "primary"}
              autoFocus
            >
              {buttonLabel}
            </Button>
            {primaryAction ? (
              <Button onClick={handlePrimaryAction} color="primary" autoFocus>
                {primaryActionButtonLabel}
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SimpleDialog;
