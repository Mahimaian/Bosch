import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Link,
  Dialog,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Help as HelpIcon,
} from "@material-ui/icons";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import Alerts from "../../pages/dashboard/Alerts";

import { useUserDispatch, signOut } from "../../context/UserContext";

import logo from "../../assets/img/logo.png";

import {
  getAlerts,
} from "../../services/services";


export default function Header(props) {
  const classes = useStyles();

  // global
  const userDispatch = useUserDispatch();

  // local
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationsValue, setNotificationsValue] = useState([]);
  const [profileMenu, setProfileMenu] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' })
  const [openAlert, openAlertWindow] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [notifyState, setnotifyState] = useState({
      message: "",
      status: "",
    }); 
  
  function addNotification() {
    notificationsList.concat(notificationsValue);
    console.log(notificationsValue);
  }

  useEffect(() => {
    getAlerts(localStorage.getItem("id_token"))
    .then((response) => {
      setAlerts(response.data);
    })
    .catch((error) => {
      setnotifyState({
        message: error,
        status: "error",
      });
      });
      }, []) ;  

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      username: localStorage.getItem('displayname'),
      email: localStorage.getItem('email')
    })
  }, [])
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <img
        className={classes.topBrand}
        src="data:image/png;base64,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"
        alt="bosch colors"
      />
      <Toolbar className={classes.toolbar}>
        {/* <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
        </IconButton> */}
        <Grid container>
          <Grid item xs={2}>
            <img className={classes.logo_css} src={logo} alt="bosch logo" />
          </Grid>
          <Grid item xs={8} style={{textAlign:'center', marginTop:'10px'}}>
            <Typography variant="h2" weight="medium" className={classes.logotype} style={{ "color": "#00000", "fontSize": "25px" }}>
              JMaaS Self Service
            </Typography>
          </Grid>
        </Grid>


        <div className={classes.grow} />
        {/* <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}
         
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? alerts.filter(data => data.alert_name === "disk_usage" || data.alert_name === "inodes_usage" ).length : null}
            color="secondary"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> 
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"

        >
          <Link href="https://inside-docupedia.bosch.com/confluence/display/cines4info/JMaaS+-+Self-Service+Portal" target="_blank"  variant="body2">
          <HelpIcon classes={{ root: classes.headerIcon }} />
          </Link>
          
        </IconButton>

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>

        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {alerts.sort((a, b) => a.alert_sent_date < b.alert_sent_date ? 1 : -1)
          .filter(data => data.alert_name === "disk_usage" || data.alert_name === "inodes_usage" )
          .slice(0,5)
          .map(a => (             
            <MenuItem
              key={a.id}
              className={classes.headerMenuItem}
            >
              <Notification 
              {...{id: a.id, color: "warning",  type: "info", 
              message: (a.alert_name=="disk_usage" ? "Disk utilization of " : "Inode Utilization of ")  + a.instance_name + " is " +  + a.comments + "%"}}
               typographyVariant="inherit" />
            </MenuItem>
          ))}
          <MenuItem
              key={0}
              onClick={e => {
                setNotificationsMenu(null);
                openAlertWindow(true);
              }}
              className={classes.headerMenuItem}
            >
              <Notification 
              {...{id: 0, color: "warning",  type: "info", message: "View All Alerts" }}
               typographyVariant="inherit" />
            </MenuItem>
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium" style={{ textTransform: 'capitalize' }}>
              {userInfo.username}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="/"
            >
              {userInfo.email}
            </Typography>
          </div>
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>*/}
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>

      <Dialog
        open={openAlert}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alerts data={alerts}/>
        <DialogActions>
          <Button onClick={ () => openAlertWindow(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>

      

  );
}
