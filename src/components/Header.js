// Header.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 40,
    height: 40,
  },
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <img src="/logo.png" alt="Logo" className={classes.logo} />
        <Typography variant="h6">Senior Developer Portfolio</Typography>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </AppBar>
  );
};

export default Header;
