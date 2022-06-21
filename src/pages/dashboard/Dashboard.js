import React, { useState, useEffect } from "react";
import {
  Grid,
  TableRow,
  Snackbar,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Collapse,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Fab,
  Chip,
  InputBase,
  Paper,
} from "@material-ui/core";
import TablePagination from "@mui/material/TablePagination";

import { useTheme } from "@material-ui/styles";
//graph
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import ReactEcharts from "echarts-for-react";
import Clock from 'react-live-clock';


import {
  Update as UpdateIcon,
  PostAdd as PostAddIcon,
  Schedule as ScheduleIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Settings as SettingsIcon,
  SettingsApplications as SettingsApplicationsIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  MoreVert as MoreVertIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
  HighlightOff as HighlightOffIcon,
  CheckCircle as CheckCircleIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon, 
  Search as SearchIcon,
  CancelRounded as CancelRoundedIcon,
  OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";

import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import SnackNotify from "../../components/SnackNotify/SnackNotify";
import Carousel from "react-material-ui-carousel";
import Schedule from "../update/Schedule";
import AlertsConfiguration from "./AlertsConfiguration";
import ScheduledRestart from "./ScheduledRestart";

//date
import moment from "moment";
//API's'
import {
  productionDB,
  updateJenkins,
  getUpdate,
  getAlertsConfiguration,
  getScheduledRestart,
  updateinstance,
  cancelUpdateInstance,
  getJKversion,
  getLiveData,
  setAlertThreshold,
  setScheduledRestart,
  cancelScheduledRestart,
} from "../../services/services";

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [isAdmin, setAdmin] = useState(true);
  const [small, setSmall] = useState(0);
  const [medium, setMedium] = useState(0);
  const [large, setLarge] = useState(0);
  const [config, setConfig] = useState([]);
  const [status, setStatus] = useState([]);
  const [total, setTotal] = useState(0);
  const [fail, setFail] = useState(0);
  const [pass, setPass] = useState(0);
  const [chargeable, setChargeable] = useState([]);
  const [date, setDate] = useState([]);
  const [totaldates, setTotaldates] = useState([]);
  const [select, setSelect] = useState([]);
  const [notify, setNotify] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [notcompleted, setNotcompleted] = useState([]);
  const [charge, setCharge] = useState(0);
  const [unCharge, setUncharge] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setsnackOpen] = useState(false);
  const [notifyState, setnotifyState] = useState({
    message: "",
    status: "",
  });
  const [productionInst, setProductionInst] = useState([]);
  const [scheduleUpdate, setscheduleUpdate] = useState([]);
  const [scheduledRestart, setscheduledRestart] = useState([]);
  const [alertsConfiguration, setAlertsConfiguration] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [restartOpen, setRestartOpen] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [JKversion, setJKversions] = useState([]);
  const [page1, setPage1] = React.useState(0);
  const [page2, setPage2] = React.useState(0);
  const [page3, setPage3] = React.useState(0);
  const [page4, setPage4] = React.useState(0);


  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  const [rowsPerPage3, setRowsPerPage3] = React.useState(5);
  const [rowsPerPage4, setRowsPerPage4] = React.useState(5);

  const [cancelUpdate, setCancelUpdate] = useState(false);
  const [cancelUpdateId, setCancelUpdateId] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [alertConfiguration, setAlertConfiguration] = useState(false);
  const [scheduledRestartModal, setScheduledRestartModal] = useState(false);
  const [scheduledRestartData, setScheduledRestartData] = useState([]);
  const [cancelSchRestartWindow, cancelScheduledRestartWindow] = useState(false);

  // Filtered data
  const [alertsConfigurationFiltered, setAlertsConfigurationFiltered] = useState([]);
  const [productionInstFiltered, setProductionInstFiltered] = useState([]);
  const [scheduleUpdateFiltered, setscheduleUpdateFiltered] = useState([]);
  const [scheduledRestartFiltered, setscheduledRestartFiltered] = useState([]);

  const [updateHistoryWindow, openUpdateHistoryWindow] = useState(false);
  const handleHistoryClose = () => {
    openUpdateHistoryWindow(false);
  };


  // local
  var [mainChartState, setMainChartState] = useState("all");

  const handleChangePageOne = (event, newPage) => {
    setPage1(newPage);
  };
  const handleChangePageTwo = (event, newPage) => {
    setPage2(newPage);
  };
  const handleChangePageThree = (event, newPage) => {
    setPage3(newPage);
  };
  const handleChangePageFour = (event, newPage) => {
    setPage4(newPage);
  };
  const handleChangeRowsPerPageOne = (event) => {
    setRowsPerPage1(+event.target.value);
    setPage1(0);
  };
  const handleChangeRowsPerPageTwo = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };
  const handleChangeRowsPerPageThree = (event) => {
    setRowsPerPage3(+event.target.value);
    setPage3(0);
  };
  const handleChangeRowsPerPageFour = (event) => {
    setRowsPerPage4(+event.target.value);
    setPage4(0);
  };
  const handleSnackClose = () => {
    setsnackOpen(false);
  };

  const handleUpdate = () => {
    setUpdateOpen(false);
  };

  const scheduleUpdateView = () => {
    setUpdateOpen(true);
  };

  const handleRestart = () => {
    setRestartOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_menu = Boolean(anchorEl);

  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    setCancelUpdateId(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu - Scheduled Restart

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open_restart_menu = Boolean(anchorEl2);

  const handleMenuClick = (event, value) => {
    setAnchorEl2(event.currentTarget);
    setScheduledRestartData(value);
  };

  const handleMenuClose = () => {
    setAnchorEl2(null);
  };

  // end 

  const comingSoonView = () => {
    setComingSoon(true);
  };
  const handlecomingSoon = () => {
    setComingSoon(false);
  };

  const cancelUpdateView = (id) => {
    setCancelUpdate(true);
  };

  const dismissCancelUpdateView = () => {
    setCancelUpdate(false);
  };

  const openAlertsConfiguration = () => {
    setAlertConfiguration(true);
  };

  const dismissAlertsConfiguration = () => {
    setAlertConfiguration(false);
  };


  const getstatusColor = (status) => {
    if (status === "scheduled") {
      return "#FFFB00 ";
    } else if (status === "completed") {
      return "#92FB03 ";
    } else if (status === "failed") {
      return "#FF0000 ";
    } else {
      return "#FFA600 "; //cancelled
    }
  };

  const getUtilizationColor = (value) => {
    if (value < 70 ) {
      return "#92FB03 "; // green
    } else if (value >= 70 && value < 90) {
      return "#FFFB00 "; // amber
    } else if (value >= 90) {
      return "#FF0000 "; // red
    } 
  };

  const isVersionDeprecated = (version) => {
    let deprecated = false;
    JKversion.map((option, index) => {
      if (version === option.jenkins_version) {
        deprecated = Boolean(option.deprecated);
      }
    });
    return deprecated;
  };

  const getInstanceDiskUsage = (instance_name) => {
    let disk_usage = 0;
    liveData.map((option, index) => {
      if (
        instance_name === option.instance_name &&
        option.metric === "disk_usage"
      ) {
        disk_usage = option.value;
      }
    });
    return disk_usage;
  };

  const getInstanceInodeUsage = (instance_name) => {
    let inode_usage = 0;
    liveData.map((option, index) => {
      if (
        instance_name === option.instance_name &&
        option.metric === "inode_usage"
      ) {
        inode_usage = option.value;
      }
    });
    return inode_usage;
  };

  // Initialization
  useEffect(() => {
    setNotify(false);
    getJKversion(localStorage.getItem("id_token"))
      .then((response) => {
        if (response.data.length >= 1) {
          setJKversions(response.data);
        }
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
        setsnackOpen(true);
      });

    getLiveData(localStorage.getItem("id_token"))
      .then((response) => {
        if (response.data.length >= 1) {
          setLiveData(response.data);
        }
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
      });

    productionDB(localStorage.getItem("id_token"))
      .then((response) => {
        var temp = [];
        var ctemp = [];
        for (var i = 0; i < response.data.length; i++) {
          temp.push(response.data[i].configuration);
          ctemp.push(response.data[i].chargeable);
        }
        setChargeable(ctemp);
        setConfig(temp);
        setProductionInst(response.data);
        setProductionInstFiltered(response.data)
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
        setsnackOpen(true);
      });
    updateJenkins(localStorage.getItem("id_token"))
      .then((response) => {
        var temp = [];
        var datearr = [];
        for (var i = 0; i < response.data.length; i++) {
          temp.push(response.data[i].status);
          datearr.push(response.data[i].updation_date_time.slice(0, 10));
        }
        const uniqueDates = datearr.filter((val, id, array) => {
          return array.indexOf(val) === id;
        });
        setStatus(temp);
        setDate(uniqueDates);
        setTotaldates(uniqueDates);
        setscheduleUpdate(response.data);
        setscheduleUpdateFiltered(response.data);
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
        // setsnackOpen(true);
      });     

    getAlertsConfiguration(localStorage.getItem("id_token"))
      .then((response) => {
        setAlertsConfiguration(response.data);
        setAlertsConfigurationFiltered(response.data);
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
      });  

    getScheduledRestart(localStorage.getItem("id_token"))
      .then((response) => {
        setscheduledRestart(response.data);
        setscheduledRestartFiltered(response.data);
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
      });

    if (localStorage.getItem("role") === "normal_user") {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);
  //1. cost data
  useEffect(() => {
    var ctemp = 0;
    var ntemp = 0;
    if (chargeable.length != 0) {
      for (var i = 0; i < chargeable.length; i++) {
        if (chargeable[i] === "no") {
          ntemp = ntemp + 1;
          setUncharge(ntemp);
        } else if (chargeable[i] === "yes") {
          ctemp = ctemp + 1;
          setCharge(ctemp);
        }
      }
    }
  }, [chargeable]);
  //2. configuration data
  useEffect(() => {
    var stemp = 0;
    var mtemp = 0;
    var ltemp = 0;
    if (config.length != 0) {
      for (var i = 0; i < config.length; i++) {
        if (config[i] === "small") {
          stemp = stemp + 1;
          setSmall(stemp);
        } else if (config[i] === "medium") {
          mtemp = mtemp + 1;
          setMedium(mtemp);
        } else if (config[i] === "large") {
          ltemp = ltemp + 1;
          setLarge(ltemp);
        }
      }
    }
  }, [config]);
  //3. Instance update data
  useEffect(() => {
    var ttemp = 0;
    var ftemp = 0;
    var ptemp = 0;
    if (status.length != 0) {
      for (var i = 0; i < status.length; i++) {
        if (status[i] === "failed") {
          ftemp = ftemp + 1;
          setFail(ftemp);
        } else if (status[i] === "completed") {
          ptemp = ptemp + 1;
          setPass(ptemp);
        }
      }
      ttemp = status.length;
      setTotal(ttemp);
    }
  }, [status]);
  //4. Initial graph "all" data
  useEffect(() => {
    setLoading(true);
    var comp = [];
    var notcomp = [];
    for (var i = 0; i < date.length; i++) {
      getUpdate(date[i], localStorage.getItem("id_token"))
        .then((response) => {
          var pcount = 0;
          var fcount = 0;
          for (var k = 0; k < response.data.length; k++) {
            if (response.data[k].status === "completed") {
              pcount = pcount + 1;
            }
            if (response.data[k].status === "failed") {
              fcount = fcount + 1;
            }
          }
          comp.push(pcount);
          notcomp.push(fcount);
          setCompleted(comp);
          setNotcompleted(notcomp);
          if (comp.length === date.length && notcomp.length === date.length) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setnotifyState({
            message: error,
            status: "error",
          });
          setsnackOpen(true);
        });
    }
  }, [date]);
  useEffect(() => {
    setLoading(true);
    var comp = [];
    var notcomp = [];
    for (var i = 0; i < select.length; i++) {
      getUpdate(select[i], localStorage.getItem("id_token"))
        .then((response) => {
          var pcount = 0;
          var fcount = 0;
          for (var k = 0; k < response.data.length; k++) {
            if (response.data[k].status === "completed") {
              pcount = pcount + 1;
            }
            if (response.data[k].status === "failed") {
              fcount = fcount + 1;
            }
          }
          comp.push(pcount);
          notcomp.push(fcount);
          setCompleted(comp);
          setDate(select);
          setNotcompleted(notcomp);
          if (
            completed.length === select.length &&
            notcompleted.length === select.length
          ) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setnotifyState({
            message: error,
            status: "error",
          });
          setsnackOpen(true);
        });
    }
  }, [select]);
  var resultArray = [];

  const getgraphdata = () => {
    var resultArray = [];
    var pass = completed;
    var fail = notcompleted;
    for (let i = 0; i < date.length; i++) {
      resultArray.push({
        name: date[i],
        pass: pass[i],
        fail: fail[i],
      });
    }
    return resultArray;
  };

  const graphdata = getgraphdata();

  const PieChartData = [
    { name: "Small", value: small, color: "primary" },
    { name: "Medium", value: medium, color: "secondary" },
    { name: "Large", value: large, color: "warning" },
  ];

  const getOption = () => ({
    color: ["rgba(116, 231, 16, 1)", "rgba(235, 47, 47, 1)"],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      emphasis: {
        selectorLabel: {
          show: true,
        },
      },
      tooltip: {
        show: true,
        trigger: "axis",
        showContent: true,
      },
    },
    xAxis: {
      data: date,
      axisLabel: {
        show: true,
        interval: 0,
        rotate: 0,
        hideOverlap: true,
        fontSize: "9px",
        overflow: "breakAll",
        width: 90,
        fontWeight: "bold",
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Completed",
        data: completed,
        type: "line",
        stack: "Total",
      },
      {
        name: "Failed",
        data: notcompleted,
        type: "line",
        stack: "Total",
      },
    ],
  });

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelect = (event) => {
    setNotify(false);
    setMainChartState(event.target.value);
    if (event.target.value === "all") {
      var datearr = totaldates;
      setSelect(datearr);
    }
    if (event.target.value === "monthly") {
      const d = new Date();
      let name = month[d.getMonth()];
      var datearr = [];
      for (var i = 0; i < totaldates.length; i++) {
        var format = moment(moment(totaldates[i]).format("YYYY/MM/DD")).format(
          "MMMM"
        );
        if (format === name) {
          datearr.push(totaldates[i]);
        }
      }
      setSelect(datearr);
    }
    if (event.target.value === "daily") {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      for (var i = 0; i < totaldates.length; i++) {
        if (totaldates[i] === today) {
          datearr.push(totaldates[i]);
          setSelect(datearr);
        } else {
          setNotify(true);
        }
      }
    }
    if (event.target.value === "weekly") {
      var curr = new Date(); // get current date
      var first = curr.getDate() - curr.getDay(); // first day of a week (sunday)
      var last = first + 6; // last day - week

      var firstday = new Date(curr.setDate(first)).toUTCString();
      var lastday = new Date(curr.setDate(last)).toUTCString();
      var formatfirst = moment(firstday).format("YYYY-MM-DD");
      var formatlast = moment(lastday).format("YYYY-MM-DD");
      for (var i = 0; i < totaldates.length; i++) {
        if (totaldates[i] >= formatfirst && date[i] <= formatlast) {
          datearr.push(totaldates[i]);
          setSelect(datearr);
        } else {
          setNotify(true);
        }
      }
    }
  };

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow key={row.id}>
          <TableCell style={{padding: '0', width: '0'}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className={classes.TableCell} component="th" scope="row">
            {row.instance_name} 
            <a href={`https://rb-jmaas.de.bosch.com/${row.instance_name}`} target="_blank" >
             <Tooltip interactive title="open instance">
                  <OpenInNewIcon style={{ color: "#005691"}}   fontSize="small"  />
                </Tooltip>
            </a>
          </TableCell>
          <TableCell className={classes.TableCell}>
            <div>
            {row.jenkins_version}
            {isVersionDeprecated(row.jenkins_version) ? (
              <a href="https://inside-docupedia.bosch.com/confluence/display/cines4info/JMaaS+-+Jenkins+Versions+and+Plugins" target="_blank"  variant="body2">
                <Tooltip interactive title="Deprecated Jenkins Version">
                  <WarningIcon style={{ color: "#ff0000" }}  fontSize="small" />
                </Tooltip>
              </a>
            ) : (
              <Tooltip title="Supported Jenkins Version">
                <CheckCircleIcon style={{ color: "#92FB03" }}  fontSize="small"/>
              </Tooltip>
            )}
            </div>
          </TableCell>
          <TableCell className={classes.TableCell}>
            <Chip 
                label={ getInstanceDiskUsage(row.instance_name)}
                variant="outlined"
                style={{
                  backgroundColor: getUtilizationColor(getInstanceDiskUsage(row.instance_name)),
                  fontWeight: "bold",
                  width: "94px",
                }}
            />
          </TableCell>
          <TableCell className={classes.TableCell}>
            <Chip
                label={getInstanceInodeUsage(row.instance_name)}
                variant="outlined"
                style={{
                  backgroundColor: getUtilizationColor(getInstanceInodeUsage(row.instance_name)),
                  fontWeight: "bold",
                  width: "95px",
                }}
            />
          </TableCell>
          <TableCell className={classes.TableCell}>
            {row.cost_center}
            {row.cost_center_is_valid ? (
              <Tooltip title="Cost Center is valid">
                <IconButton>
                  <CheckCircleIcon style={{ color: "#92FB03" }}  fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Cost Center not valid">
                <IconButton>
                  <ErrorIcon style={{ color: "#ff0000" }}  fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </TableCell>
          <TableCell className={classes.TableCell}>
            {row.sso_enabled ? (
              <Tooltip title="Enabled">
                <IconButton>
                  <CheckCircleIcon style={{ color: "#92FB03" }} fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Disabled">
                <IconButton>
                  <CancelRoundedIcon style={{ color: "#ff0000" }} fontSize="small"/>
                </IconButton>
              </Tooltip>
            )}
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.TableCell} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h8" gutterBottom component="div">
                  More Info
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHeadCell}>
                        Primary Contact
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Secondary Contact
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                          Configuration
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                          JDK Version
                        </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        BIaaS Linked
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Chargeable
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Cluster
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Units
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Customer Identifier
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Division
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.id}>
                      <TableCell className={classes.TableCell} component="th" scope="row">
                        {row.primary_contact}
                      </TableCell>
                      <TableCell className={classes.TableCell}> {row.secondary_contact} </TableCell>
                      <TableCell className={classes.TableCell}>{row.configuration}</TableCell>
                      <TableCell className={classes.TableCell}>{row.jdk_version}</TableCell>
                      <TableCell className={classes.TableCell}>{row.biaas_linked}</TableCell>
                      <TableCell className={classes.TableCell}>{row.chargeable}</TableCell>
                      <TableCell className={classes.TableCell}>{row.cluster}</TableCell>
                      <TableCell className={classes.TableCell}>{row.units}</TableCell>
                      <TableCell className={classes.TableCell}>
                        {row.customeridentifier}
                      </TableCell>
                      <TableCell className={classes.TableCell}>{row.division}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const NextButton = () => {
    return (
      <Fab aria-label="add">
        <ArrowForwardIcon />
      </Fab>
    );
  };

  const BackButton = () => {
    return (
      <Fab aria-label="add">
        <ArrowBackIcon />
      </Fab>
    );
  };

  return (
    <React.Fragment>
       <Grid container spacing={4} style={{ marginTop: "2px"}} >
          <Grid item xs={6} >
              <Typography className={classes.typo} variant="h2"  >
                Welcome to JMaaS Self Service
             </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className={classes.typo} variant="h4"  size="sm" align="right">
            Timezone : Europe/Berlin ( Current Time : 
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} /> )
        </Typography>
      </Grid>
      </Grid>
      <div className={classNames(classes.setBottom)}>
        <Carousel
          NextIcon={<NextButton />}
          PrevIcon={<BackButton />}
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              borderRadius: 0,
              backgroundColor: "#f0f8ff00",
              marginTop: "10px",
            },
          }}
          navButtonsWrapperProps={{
            // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
              bottom: "0",
              top: "unset",
              borderRadius: 0,
            },
          }}
          autoPlay={false}
          animation="slide"
          cycleNavigation={false}
          indicators={false}
          duration={1000}
          navButtonsAlwaysVisible={true}
          reverseEdgeAnimationDirection={true}
        >
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            <Grid
              item
              xs={2}
              onClick={() => {
                comingSoonView();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <PostAddIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Create Instance
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Create an instance on JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                scheduleUpdateView();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <UpdateIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Schedule Update
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Schedule update of an instance on JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                setScheduledRestartModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <ScheduleIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Schedule Restart
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Schedule restart of an instance on JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                comingSoonView();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <SettingsIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Configure Instance
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Enable SSO, JDK 11, Java Parameters
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                openAlertsConfiguration();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <NotificationsIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Configure Alerts
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Configure Alerts of an instance on JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() => {
                comingSoonView();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <PlayCircleOutlineIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Start Jenkins
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Start a jenkins instance on JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ marginTop: 40 }}>
            <Grid
              item
              xs={2}
              onClick={() => {
                comingSoonView();
              }}
              style={{ cursor: "pointer" }}
            >
              <Widget
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                disableWidgetMenu
              >
                <SettingsApplicationsIcon className={classes.iconColor} />
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium" color="#005691">
                    Delete Instance
                    <br />
                  </Typography>
                </div>
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xs" weight="medium">
                    Delete a jenkins instance in JMaaS
                  </Typography>
                </div>
              </Widget>
            </Grid>
            </Grid>
            </Carousel>  
            { isAdmin ? 
            (
              <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={4}>
                  <Widget
                  title="Instance Updates" upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Typography size="xxl" weight="medium">
                        {total}
                      </Typography>
                      <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(e) => {
                            openUpdateHistoryWindow(true);
                          }}
                        >
                          <Tooltip interactive title="View Update History">
                            <HistoryIcon fontSize="large" color="primary" />
                          </Tooltip>
                        </IconButton>
                    </div>
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <Grid item>
                      <Typography color="text" colorBrightness="secondary">
                      Failed
                      </Typography>
                      <Typography size="md">{fail}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="text" colorBrightness="secondary">
                      Completed
                      </Typography>
                      <Typography size="md">{pass}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="text" colorBrightness="secondary">
                      Rate
                      </Typography>
                      <Typography size="md">
                      {((pass / total) * 100).toFixed()}%
                      </Typography>
                    </Grid>
                    </Grid>
                  </Widget>
                </Grid>
                <Grid item xs={4}>
                  <Widget
                  title="Cost"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  >
                  <div className={classes.visitsNumberContainer}>
                    <Typography size="xxl" weight="medium">
                    {small * 60.5 + medium * 181.5 + large * 423.5} €
                    </Typography>
                  </div>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                      Chargeable
                    </Typography>
                    <Typography size="md">{charge}</Typography>
                    </Grid>
                    <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                      Non Chargeable
                    </Typography>
                    <Typography size="md">{unCharge}</Typography>
                    </Grid>
                    <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                      Cost Center - Validation
                    </Typography>
                    <Typography size="md">TBD</Typography>
                    </Grid>
                  </Grid>
                  </Widget>
                </Grid>
                <Grid item xs={4}>
                  <Widget
                  title="Configuration"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                    <div className={classes.visitsNumberContainer}>
                      <Typography size="xxl" weight="medium">
                      { productionInst.length }
                      </Typography>
                    </div>
                    </Grid>

                    <Grid item xs={4}>
                    <ResponsiveContainer width="100%" height={144}>
                      <PieChart margin={{ left: theme.spacing(1) }}>
                      <Pie
                        data={PieChartData}
                        innerRadius={45}
                        outerRadius={60}
                        dataKey="value"
                      >
                        {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                        ))}
                      </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={4}>
                    <div className={classes.pieChartLegendWrapper}>
                      {PieChartData.map(({ name, value, color }, index) => (
                      <div key={color} className={classes.legendItemContainer}>
                        <Dot color={color} />
                        <Typography style={{ whiteSpace: "nowrap" }}>
                        &nbsp;{name}&nbsp;
                        </Typography>
                        <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                        </Typography>
                      </div>
                      ))}
                    </div>
                    </Grid>
                  </Grid>
                  </Widget>
                </Grid>
              </Grid>
            ) : (
              <p/>
            )
          
            }            
            
                
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Widget
              title="Instance Details"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
            <span style={{ width : "100%"}}>
              <Paper component="form" className={classes.Paper}  >
                <InputBase
                  className={classes.input}
                  placeholder="Instance Search"
                  onChange = {(e) => {                  
                    setProductionInstFiltered(
                      productionInst
                      .filter( data =>  data.instance_name.toLowerCase().includes(e.target.value.toLowerCase()))
                    );
                  }}
                />
                <IconButton  className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
            </Paper>
            </span>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: "#005691", fontWeight: "bold" , padding: '0', width: '0'}}/>
                      <TableCell 
                        style={{ color: "#005691", fontWeight: "bold" , padding: '0', width: '0'}}
                      >
                        Instance Name
                      </TableCell>
                      <TableCell
                        style={{ color: "#005691", fontWeight: "bold", padding: '0', width: '0' }}
                        align="left"
                      >
                        Version
                      </TableCell>
                      <TableCell
                        style={{ color: "#005691", fontWeight: "bold", padding: '0', width: '0' }}
                        align="left"
                      >
                        Disk Utilization(%)
                      </TableCell>
                      <TableCell
                        style={{ color: "#005691", fontWeight: "bold", padding: '0', width: '0' }}
                        align="left"
                      >
                        Inode Utilization(%)
                      </TableCell>
                      <TableCell
                        style={{ color: "#005691", fontWeight: "bold", padding: '0', width: '0' }}
                        align="left"
                      >
                        Cost center
                      </TableCell>
                      
                      <TableCell
                        style={{ color: "#005691", fontWeight: "bold", padding: '0', width: '0' }}
                        align="left"
                      >
                        SSO
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productionInstFiltered
                    .sort((a, b) => a.instance_name > b.instance_name ? 1 : -1)
                      .slice(
                        page1 * rowsPerPage1,
                        page1 * rowsPerPage1 + rowsPerPage1
                      )
                      .map((value) => (
                        <Row key={value.id} row={value} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={productionInstFiltered.length}
                rowsPerPage={rowsPerPage1}
                page={page1}
                onPageChange={handleChangePageOne}
                onRowsPerPageChange={handleChangeRowsPerPageOne}
              />
            </Widget>
          </Grid>

          <Grid item xs={6}>
            <Widget
              title="Update Summary"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
            <span style={{ width : "100%"}}>
              <Paper component="form" className={classes.Paper}  >
                <InputBase
                  className={classes.input}
                  placeholder="Instance Search"
                  onChange = {(e) => {                  
                    setscheduleUpdateFiltered(
                      scheduleUpdate
                      .filter( data =>  data.instance_name.toLowerCase().includes(e.target.value.toLowerCase()))
                    );
                  }}
                />
                <IconButton  className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
            </Paper>
          </span>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHeadCell}>
                        Instance Name
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Current Version
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Update Version
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Cluster
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Scheduled Datetime
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Status
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Requester
                      </TableCell>
                      <TableCell className={classes.TableHeadCell}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduleUpdateFiltered
                    .sort((a, b) => a.updation_date_time < b.updation_date_time ? 1 : -1)
                      .slice(
                        page2 * rowsPerPage2,
                        page2 * rowsPerPage2 + rowsPerPage2
                      )
                      .map((value, index) => (
                        <TableRow key={value.id}>
                          <TableCell className={classes.TableCell} component="th" scope="row" >
                            {value.instance_name}
                          </TableCell>
                          <TableCell className={classes.TableCell}>{value.prev_version} </TableCell>
                          <TableCell className={classes.TableCell}>{value.version}</TableCell>
                          <TableCell className={classes.TableCell}>{value.cluster}</TableCell>
                          <TableCell className={classes.TableCell}>{value.updation_date_time.slice(0, 19)} </TableCell>
                          <TableCell className={classes.TableCell}>
                            <Chip
                              label={value.status}
                              variant="outlined"
                              style={{
                                backgroundColor: getstatusColor(value.status),
                                fontWeight: "bold",
                                width: "94px",
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.TableCell}> {value.requester} </TableCell>
                          <TableCell className={classes.TableCell}> 
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e) => {
                                handleClick(e, value);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open_menu}
                              onClose={handleClose}
                              PaperProps={{
                                style: { maxHeight: 100, width: "20ch" },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  window.open(cancelUpdateId.html_report  ,"_blank");
                                }}
                              >
                                {" "}
                                View Report{" "}
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  cancelUpdateView();
                                }}
                              >
                                {" "}
                                Cancel{" "}
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={scheduleUpdateFiltered.length}
                rowsPerPage={rowsPerPage2}
                page={page2}
                onPageChange={handleChangePageTwo}
                onRowsPerPageChange={handleChangeRowsPerPageTwo}
              />
            </Widget>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Widget
              title="Alerts Configuration"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
            <span style={{ width : "100%"}}>
            <Paper component="form" className={classes.Paper}  >
              <InputBase
                className={classes.input}
                placeholder="Instance Search"
                onChange = {(e) => {                 
                  setAlertsConfigurationFiltered(
                    alertsConfiguration
                    .filter( data =>  data.instance_name.toLowerCase().includes(e.target.value.toLowerCase()))
                  );
                }}
              />
              <IconButton  className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            </span>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHeadCell}> Instance Name </TableCell>
                      <TableCell className={classes.TableHeadCell}> Cluster </TableCell>
                      <TableCell className={classes.TableHeadCell}> Disk Usage Threshold </TableCell>
                      <TableCell className={classes.TableHeadCell}> Inode Usage Threshold </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alertsConfigurationFiltered
                    .sort((a, b) => a.instance_name > b.instance_name ? 1 : -1)
                      .slice(
                        page3 * rowsPerPage3,
                        page3 * rowsPerPage3 + rowsPerPage3
                      )
                      .map((value, index) => (
                        <TableRow key={ `alerts_${value.instance_name}` }>
                          <TableCell className={classes.TableCell} component="th" scope="row" > {value.instance_name} </TableCell>
                          <TableCell className={classes.TableCell}>{value.cluster}</TableCell>
                          <TableCell className={classes.TableCell}>{value.disk_usage_threshold} </TableCell>
                          <TableCell className={classes.TableCell}>{value.inodes_usage_threshold} </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={alertsConfigurationFiltered.length}
                rowsPerPage={rowsPerPage3}
                page={page3}
                onPageChange={handleChangePageThree}
                onRowsPerPageChange={handleChangeRowsPerPageThree}
              />
            </Widget>
          </Grid>

          <Grid item xs={6}>
            <Widget
              title="Scheduled Restart Configuration"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <span style={{ width : "100%"}}>
                <Paper component="form" className={classes.Paper}  >
                  <InputBase
                    className={classes.input}
                    placeholder="Instance Search"
                    onChange = {(e) => {                  
                      setscheduledRestartFiltered(
                        scheduledRestart
                        .filter( data =>  data.instance_name.toLowerCase().includes(e.target.value.toLowerCase()))
                      );
                    }}
                  />
                  <IconButton  className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
              </Paper>
            </span>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHeadCell}> Instance Name </TableCell>
                      <TableCell className={classes.TableHeadCell}> Cluster </TableCell>
                      <TableCell className={classes.TableHeadCell}> Cron Entry </TableCell>
                      <TableCell className={classes.TableHeadCell}> Restart Date Time </TableCell>
                      <TableCell className={classes.TableHeadCell}> Requester </TableCell>
                      <TableCell className={classes.TableHeadCell}> Action </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduledRestartFiltered
                    .sort((a, b) => a.instance_name > b.instance_name ? 1 : -1)
                      .slice(
                        page4 * rowsPerPage4,
                        page4 * rowsPerPage4 + rowsPerPage4
                      )
                      .map((value, index) => (
                        <TableRow key={value.id}>
                          <TableCell className={classes.TableCell} component="th" scope="row">
                            {value.instance_name}
                          </TableCell>
                          <TableCell  className={classes.TableCell}>
                            {value.cluster}</TableCell>
                          <TableCell  className={classes.TableCell}>
                            { value.cron_entry === "unknown" ? "-" : value.cron_entry }
                          </TableCell>
                          <TableCell  className={classes.TableCell}>
                            { value.restart_date_time ? value.restart_date_time.slice(0,19) : "-" }
                          </TableCell>
                          <TableCell  className={classes.TableCell}>
                            {value.requested_by}
                          </TableCell>
                          <TableCell  className={classes.TableCell}>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e) => {
                                handleMenuClick(e, value);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl2}
                              keepMounted
                              open={open_restart_menu}
                              onClose={handleMenuClose}
                              PaperProps={{
                                style: { maxHeight: 100, width: "20ch" },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleMenuClose();
                                  setScheduledRestartModal(true);
                                  localStorage.setItem("schRestart_Edit", true);
                                }}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleMenuClose();
                                  cancelScheduledRestartWindow(true);
                                }}
                              >
                                Cancel
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={scheduledRestartFiltered.length}
                rowsPerPage={rowsPerPage4}
                page={page4}
                onPageChange={handleChangePageFour}
                onRowsPerPageChange={handleChangeRowsPerPageFour}
              />
            </Widget>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        style={{ paddingBottom: 30 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <SnackNotify
          onClose={handleSnackClose}
          variant={notifyState.status}
          message={notifyState.message}
        />
      </Snackbar>
      <Dialog
        open={updateOpen}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Typography size="xl" weight="medium" color="#005691">
              Schedule Update for a Instance
          </Typography>
        </DialogTitle>
        <Schedule />
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              let data = {
                instance_name: localStorage.getItem("inname"),
                version: localStorage.getItem("jversion"),
                prev_version: localStorage.getItem("currentversion"),
                cluster: localStorage.getItem("cluster"),
                updation_date_time:
                  moment(new Date(localStorage.getItem("date"))).format(
                    "YYYY-MM-DD"
                  ) +
                  " " +
                  localStorage.getItem("s_time"),
                status: "scheduled",
                comments: "Scheduled via self-service portal ",
              };
              updateinstance(data, localStorage.getItem("id_token"))
                .then((response) => {
                  console.log(response);
                  setnotifyState({
                    message: "Scheduled successfully",
                    status: "success",
                  });
                  setsnackOpen(true);
                  handleUpdate();
                })
                .catch((error) => {
                  setnotifyState({
                    message: error.response.data.message,
                    status: "error",
                  });
                  setsnackOpen(true);
                  handleUpdate();
                  console.log(error.response.data.message);
                });
            }}
          >
            <CalendarTodayIcon style={{ paddingRight: 4 }} />
            Schedule
          </Button>
          <Button color="inherit" variant="contained" onClick={handleUpdate}>
            <HighlightOffIcon style={{ paddingRight: 4 }} />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={restartOpen}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography size="md" weight="medium">
            Schedule Restart
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Schedule Restart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRestart} color="primary" autoFocus>
            Schedule Restart
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={comingSoon}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography size="md" weight="medium">
            Coming Soon
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Feature will be available in the upcoming version.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecomingSoon} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cancelUpdate}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography size="xl" weight="medium">
            {
              cancelUpdateId.status == "scheduled" ? (
                  "Are you sure want to cancel this update?" 
              ) : (
                  "Only scheduled updates can be cancelled."
              )
            }
            </Typography>   
              <p>Current Status : {cancelUpdateId.status}</p>
              <p>Instance Name  : {cancelUpdateId.instance_name}</p>
              <p>Update Version : {cancelUpdateId.version}</p>
              <p>Cluster        : {cancelUpdateId.cluster}</p>
              <p>Scheduled Time : {cancelUpdateId.updation_date_time}</p>    

        </DialogTitle>
        <DialogActions>
          <Button onClick={dismissCancelUpdateView} color="primary">
            Cancel
          </Button>
          {
              cancelUpdateId.status === "scheduled" ? (
                <Button
                  onClick={() => {
                    cancelUpdateInstance(
                      cancelUpdateId.id,
                      localStorage.getItem("id_token")
                    ).then((response) => {
                        setnotifyState({
                          message: "Cancelled Successfully",
                          status: "success",
                        });
                        setsnackOpen(true);
                        dismissCancelUpdateView();
                      })
                      .catch((error) => {
                        setnotifyState({
                          message: "Failed to Cancel",
                          status: "error",
                        });
                        dismissCancelUpdateView();
                        setsnackOpen(true);
                      });
                  }}
                  color="primary"
                >
                  Proceed
                </Button>
              ) : ( <p/>)
          }
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertConfiguration}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            <Typography size="xl" weight="medium" color="#005691">
            Alerts configuration
          </Typography>
        </DialogTitle>

        <AlertsConfiguration />
        <DialogActions>
          <Button color="primary" variant="contained" onClick={() => {
              let data = {
                instance_name: localStorage.getItem("instance_name"),
                disk_usage_threshold: localStorage.getItem("disk_usage"),
                inodes_usage_threshold: localStorage.getItem("inode_usage"),
                comments: "Alert Configured via self-service portal ",
              };
              setAlertThreshold(data, localStorage.getItem("id_token"))
                .then((response) => {
                  setnotifyState({
                    message: "Configured successfully",
                    status: "success",
                  });
                  setsnackOpen(true);
                  dismissAlertsConfiguration();
                })
                .catch((error) => {
                  setnotifyState({
                    message: "Alert configuration failed.",
                    status: "error",
                  });
                  setsnackOpen(true);
                });
            }} > Configure </Button>
          <Button color="inherit" variant="contained" onClick={dismissAlertsConfiguration} >
            <HighlightOffIcon style={{ paddingRight: 4 }} />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={scheduledRestartModal}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Typography size="xl" weight="medium" color="#005691">
            Schedule Restart
          </Typography>
        </DialogTitle>
        <ScheduledRestart data={scheduledRestartData}/>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={() => {
              let data = {
                instance_name: localStorage.getItem("instance_name"),
                cluster: localStorage.getItem("cluster"),
                cron_entry: localStorage.getItem("cron_entry"),
                restart_date_time: localStorage.getItem("restart_date_time"),
                comments: "Restart Configured via self-service portal ",
                edit : localStorage.getItem("schRestart_Edit"),
                id : scheduledRestartData.id,
              };
              setScheduledRestart(data, localStorage.getItem("id_token"))
                .then((response) => {
                  setnotifyState({
                    message: "Configured successfully",
                    status: "success",
                  });
                  setsnackOpen(true);
                  setScheduledRestartModal(false);
                })
                .catch((error) => {
                  setnotifyState({
                    message: "Alert configuration failed.",
                    status: "error",
                  });
                  setsnackOpen(true);
                  setScheduledRestartModal(false);
                });
            }}  > Configure </Button>
          <Button color="inherit" variant="contained" 
            onClick={ () => { 
              setScheduledRestartModal(false) ;  
              setScheduledRestartData([]);
              localStorage.setItem("schRestart_Edit", false);
            }} >
            <HighlightOffIcon style={{ paddingRight: 4 }} />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={cancelSchRestartWindow}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography size="xl" weight="medium">
              Are you sure want to cancel this restart schedule?
            </Typography>   
              <p>Instance Name  : {scheduledRestartData.instance_name}</p>
              <p>Cluster        : {scheduledRestartData.cluster}</p>
              <p>Cron entry     : {scheduledRestartData.cron_entry}</p>
              <p>Restart Time   : {scheduledRestartData.restart_date_time}</p>    
        </DialogTitle>
        <DialogActions>
          <Button onClick={ () => {cancelScheduledRestartWindow(false);  setScheduledRestartData([]);} } color="primary">
            Cancel
          </Button>
          <Button
              onClick={() => {
                cancelScheduledRestart(
                  scheduledRestartData.id,
                  localStorage.getItem("id_token")
                ).then((response) => {
                    setnotifyState({
                      message: "Scheduled restart Cancelled Successfully",
                      status: "success",
                    });
                    cancelScheduledRestartWindow(false);
                    setsnackOpen(true);
                  })
                  .catch((error) => {
                    setnotifyState({
                      message: "Failed to Cancel",
                      status: "error",
                    });
                    cancelScheduledRestartWindow(false);
                    setsnackOpen(true);
                  });
              }}
              color="primary"
            >
              Proceed
            </Button>
        </DialogActions>
      </Dialog>  

      <Dialog
        open={updateHistoryWindow}
        BackdropProps={{classes: {root: classes.backDrop,},}}
        fullWidth={true}
        maxWidth="xl"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose = {handleHistoryClose}
      >
        <Grid container className={classes.setBottom}>
          <Typography variant="h3" style={{ marginLeft: "18px", color: "rgb(74, 144, 226)" }} >
            Update History
          </Typography>
          <Grid item xs={12}>
            <Widget
              bodyClass={classes.mainChartBody}
              header={
                <div className={classes.mainChartHeader}>
                  <Typography variant="h3" style={{ visibility: "hidden" }}>
                    Jenkins Update
                  </Typography>
                </div>
              }
            >
              {!loading && !notify ? (
                <ReactEcharts
                  option={getOption()}
                  style={{ height: "500px" }}
                />
              ) : (
                ""
              )}

              {notify ? (
                <h3 style={{ textAlign: "center" }}>No Data Found</h3>
              ) : (
                ""
              )}
              {loading ? (
                <h3 style={{ textAlign: "center" }}>Loading...</h3>
              ) : (
                ""
              )}
            </Widget>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

