import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import clsx from "clsx";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Footer from "../Footer";

// pages
import Dashboard from "../../pages/dashboard";
import Instance from "../../pages/instance";
import Update from "../../pages/update";
import EventCalendar from "../../pages/calendar";
import Production from "../../pages/production";

import Charts from "../../pages/charts";
import DefaultPage from "../../pages/defaultpage";

// context
import { useLayoutState } from "../../context/LayoutContext";

import { Scrollbars } from 'react-custom-scrollbars';

import BoschBG from '../../assets/img/Bg.png';
import Privacy from "../../pages/privacy/Privacy";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div style={{ backgroundImage: `url(${BoschBG})` , minHeight: 500, backgroundRepeat:'no-repeat' }}
      className={clsx({
        [classes.root]: true,
      })}>
      <Header history={props.history} />
      {/* <Sidebar /> */}
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >

        <div className={classes.fakeToolbar} />
        <Scrollbars className={classes.cusScroll}>
          <Switch>
            <Route path="/app/home" component={Dashboard} />
            <Route path="/app/instance" component={Instance} />
            {/* <Route path="/app/update" component={Update} /> */}
            {/* <Route path="/app/calendar" component={EventCalendar} /> */}
            {/* <Route path="/app/notifications" component={DefaultPage} /> */}
            {/* <Route path="/app/charts" component={Charts} /> */}
            <Route path="/app/production" component={Production} />
            <Route path="/app/privacy" component={Privacy} />
          </Switch>
        </Scrollbars>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(Layout);
