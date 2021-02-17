import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.grey[800]
  },
  textColor: {
    color: theme.palette.white
  },
  icon: {
    marginLeft: 5,
    fontSize: 40
  },
  clickable: {
    cursor: "pointer"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  action: {
    float: "right"
  }
}));

const ListTile = ({
  label,
  name,
  onNameClick,
  avatar,
  onAvatarClick,
  action,
  onActionClick,
  children
}) => {
  const classes = useStyles();

  const renderedAvatar = (avatar => {
    const avatarClasses = {
      root: classNames(classes.icon, {
        [classes.clickable]: typeof onAvatarClick === "function"
      })
    };
    if (avatar)
      return (
        <Avatar src={avatar} onClick={onAvatarClick} classes={avatarClasses} />
      );
    return (
      <PersonOutlineIcon
        fontSize="inherit"
        onClick={onAvatarClick}
        classes={avatarClasses}
      />
    );
  })(avatar);

  const onClickHelper = onClick => ({
    root: classNames({
      [classes.clickable]: typeof onClick === "function"
    })
  });

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item className={classes.container}>
        <Grid container>
          <Grid item>
            <Typography
              variant="body1"
              color="inherit"
              onClick={onNameClick}
              classes={onClickHelper(onNameClick)}
            >
              {`${label} ${name}`}
            </Typography>
            {action && (
              <Typography
                variant="caption"
                color="inherit"
                onClick={onActionClick}
                classes={onClickHelper(onActionClick)}
                className={classes.action}
              >
                {action}
              </Typography>
            )}
          </Grid>
          <Grid item>{renderedAvatar}</Grid>
        </Grid>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

ListTile.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onNameClick: PropTypes.func,
  avatar: PropTypes.string,
  onAvatarClick: PropTypes.func,
  action: PropTypes.node,
  onActionClick: PropTypes.func
};

ListTile.defaultProps = {
  label: "Hello",
  name: "Unknown",
  onNameClick: undefined,
  avatar: undefined,
  onAvatarClick: undefined,
  action: undefined,
  onActionClick: undefined
};

export default ListTile;
