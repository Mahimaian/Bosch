import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Today as TodayIcon,
  Storage as StorageIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  Help as HelpIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

import { Scrollbars } from 'react-custom-scrollbars';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const AdminStructure = [
  { id: 11, type: "divider" },
  { id: 0, label: "Home", link: "/app/home", icon: <HomeIcon /> },
  // {
  //   id: 1,
  //   label: "Instance",
  //   link: "/app/instance",
  //   icon: <PostAddIcon />,
  // },
  // {
  //   id: 2,
  //   label: "Update",
  //   link: "/app/update",
  //   icon: <UpdateIcon />,
  // },
  {
    id: 3,
    label: "Event Calendar",
    link: "/app/calendar",
    icon: <TodayIcon />,
  },
  {
    id: 4,
    label: "Production Instance",
    link: "/app/production",
    icon: <StorageIcon />,
  },
  // {
  //   id: 5,
  //   label: "Alerts",
  //   link: "/app/alerts",
  //   icon: <NotificationsActiveIcon />,
  // },
  // {
  //   id: 6,
  //   label: "Live Logs",
  //   link: "/app/logs",
  //   icon: <DescriptionIcon />,
  // },
  // {
  //   id: 7,
  //   label: "Scheduler",
  //   link: "/app/restart",
  //   icon: <ScheduleIcon />,
  // },
  // {
  //   id: 8,
  //   label: "Start Jenkins",
  //   link: "/app/jenkins",
  //   icon: <PlayCircleOutlineIcon />,
  // },
  // {
  //   id: 9,
  //   label: "Tickets",
  //   link: "/app/tickets",
  //   icon: <ConfirmationNumberIcon />,
  // },
  { id: 10, type: "divider" },
];

const UserStructure = [
  { id: 11, type: "divider" },
  { id: 0, label: "Home", link: "/app/home", icon: <HomeIcon /> },
  // {
  //   id: 1,
  //   label: "Instance",
  //   link: "/app/instance",
  //   icon: <PostAddIcon />,
  // },
  // {
  //   id: 2,
  //   label: "Scheduler",
  //   link: "/app/restart",
  //   icon: <ScheduleIcon />,
  // },
  {
    id: 3,
    label: "Live Logs",
    link: "/app/logs",
    icon: <DescriptionIcon />,
  },
  {
    id: 4,
    label: "Event Calendar",
    link: "/app/calendar",
    icon: <TodayIcon />,
  },
  // {
  //   id: 5,
  //   label: "Document",
  //   link: "/app/doc",
  //   icon: <MenuBookIcon />,
  // },
  {
    id: 6,
    label: "Help",
    link: "/app/help",
    icon: <HelpIcon />,
  },
  { id: 7, type: "divider" },
];

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();
  const [Structure, setStructure] = useState([]);

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  const handleWindowWidthChange = () => {
    let windowWidth = window.innerWidth;
    let breakpointWidth = theme.breakpoints.values.md;
    let isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('role') === 'normal_user') {
      setStructure(UserStructure);
    } else {
      setStructure(AdminStructure);
    }
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, []);

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <Scrollbars>
        <List className={classes.sidebarList}>
          {Structure.map(link => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </List>
      </Scrollbars>
    </Drawer>
  );
}

export default withRouter(Sidebar);
