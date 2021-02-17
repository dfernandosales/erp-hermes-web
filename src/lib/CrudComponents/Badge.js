import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: size,
    height: size,
    borderRadius,
    marginRight: 8,
    backgroundColor: theme.palette.grey["500"],
    color: theme.palette.common.white
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  disabled: {
    backgroundColor: theme.palette.grey["500"],
    color: theme.palette.common.white
  }
}));

/**  Um Badge para uso geral */
const SimpleBadge = ({ content, label, primary, disabled }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        className={classNames(
          classes.root,
          primary && classes.primary,
          disabled && classes.disabled
        )}
      >
        <Typography variant="caption" color="inherit">
          {content}
        </Typography>
      </div>
      <Typography variant="body2">{label}</Typography>
    </div>
  );
};

SimpleBadge.propTypes = {
  /** Número que aparece dentro do badge */
  content: PropTypes.number.isRequired,
  /** Label para aparecer ao lado*/
  label: PropTypes.string,
  /** Aplica a cor primário ao badge */
  primary: PropTypes.bool,
  /** Aplica visual desabilistado ao badge */
  disabled: PropTypes.bool
};

const size = 18;
const borderRadius = size / 2;

export default SimpleBadge;
