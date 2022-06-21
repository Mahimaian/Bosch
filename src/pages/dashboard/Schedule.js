import React, { useState, useEffect } from "react";
import {
  Grid,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";

import {
  updateJenkins,
  getJKversion,
  scheduleUpdate,
  productionDB,
  developmentDB,
  testingDB,
} from "./../../services/services";
import {
  Close as CloseIcon,
} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SnackNotify from "../../components/SnackNotify/SnackNotify";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// styles
import useStyles from "./styles";

export default function Schedule() {
  let classes = useStyles();

  const [TableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schedulemodal, setschedulemodal] = useState(false);
  const [JKversion, setJKversions] = useState([]);
  const [instanceoption, setInstanceoption] = useState([]); 
  const [uslot, setUslot] = useState("");

  const [cluster, setcluster] = useState([]);
  const [jversion, setjversion] = useState("");
  const [s_time, setS_time] = useState(new Date());
  const [date, setdate] = useState(new Date());
  const [inname, setinname] = useState("");
  const [cversion, setCversion] = useState("");
  var count = 1;
  const [color, setColor] = useState("#4a90e2");
  //var color = "#4a90e2";
  const [avail, setAvail] = useState([]);

  const [current, setCurrent] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [scheduledtime, setScheduledtime] = useState([]);
  const [enable, setEnable] = useState(false);
  const [slots, setSlots] = useState([]);
  const [currentslots, setCurrentslots] = useState([]);
  const [currentversion, setCurrentversion] = useState([]);
  const [updateversion, setUpdateversion] = useState([]);
  const [comments, setComments] = useState();
  const [snackOpen, setsnackOpen] = useState(false);
  const [notifyState, setnotifyState] = useState({});
  const [changed, setChanged] = useState(false);

  const [today, setToday] = useState();
  const handleSnackClose = () => {
    setsnackOpen(false);
  };
  var checktime = 100000;
  var hours;
  const timeslots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  useEffect(() => {
    var tdate = moment().format("YYYY-MM-DD");
    setToday(tdate);
    const interval = setInterval(() => {
      var currentdate = moment().format("YYYY-MM-DD");
      var currenthr = date.getHours(); // to check the current hour
      if (hours != currenthr && currentdate == date) {
        hours = date.getHours();
        var hr = hours + ":00";
        var index = timeslots.indexOf(hr);
        var available = timeslots.slice(index, 24);
        setCurrent(available);
      } 
    }, checktime);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(() => {
    setEnable(false);

    updateJenkins(localStorage.getItem("id_token"))
      .then((response) => {
        if (response.data.length >= 1) {
          setTableData(response.data);
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
  }, []);

  const onScheduleopen = () => {
    setschedulemodal(true);
    setEnable(false);
  };

  const onScheduleclose = () => {
    setschedulemodal(false);
    setEnable(false);
  };
  const handleClusterChange = (e) => {
    const up = cluster;
    up[0] = e.target.value;
    setcluster(up);
    localStorage.setItem("cluster", up);
    if (e.target.value == "production") {
      productionDB(localStorage.getItem("id_token"))
        .then((response) => {
          let i, j;
          let inst = [];
          for (i = 0; i < response.data.length; i++) {
            if (i == 0) {
              inst[i] = response.data[i].instance_name;
            } else {
              for (j = 0; j < up.length; j++) {
                if (inst[j] != response.data[i].instance_name) {
                  inst[inst.length] = response.data[i].instance_name;
                }
              }
            }
          }
          setInstanceoption(inst);
        })
        .catch((error) => {
          setLoading(false);
          setnotifyState({
            message: error,
            status: "error",
          });
          setsnackOpen(true);
        });
    } else if (e.target.value == "testing") {
      testingDB(localStorage.getItem("id_token"))
        .then((response) => {
          let i, j;
          let inst = [];
          for (i = 0; i < response.data.length; i++) {
            if (i == 0) {
              inst[i] = response.data[i].instance_name;
            } else {
              for (j = 0; j < up.length; j++) {
                if (inst[j] != response.data[i].instance_name) {
                  inst[inst.length] = response.data[i].instance_name;
                }
              }
            }
          }

          // setTestingInstance(inst);
          setInstanceoption(inst);
        })
        .catch((error) => {
          setLoading(false);
          setnotifyState({
            message: error,
            status: "error",
          });
          setsnackOpen(true);
        });
    } else if (e.target.value == "development") {
      developmentDB(localStorage.getItem("id_token"))
        .then((response) => {
          let i, j;
          let inst = [];
          for (i = 0; i < response.data.length; i++) {
            if (i == 0) {
              inst[i] = response.data[i].instance_name;
            } else {
              for (j = 0; j < up.length; j++) {
                if (inst[j] != response.data[i].instance_name) {
                  inst[inst.length] = response.data[i].instance_name;
                }
              }
            }
          }

          // setDevelopmentInstance(inst);
          setInstanceoption(inst);
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
  };
  const handleSelectdate = (e) => {
    setdate(e.target.value);
    localStorage.setItem("date", e.target.value);
    var currentdate = moment().format("YYYY-MM-DD");
    if (e.target.value == currentdate) {
      var today = new Date();
      hours = today.getHours();
      var germantime = today.toLocaleTimeString("de-DE", {
        timeZone: "Europe/Berlin",
      });
      var germanhr = germantime.slice(0, 2);
      var hr = germanhr + ":00";
      var index = timeslots.indexOf(hr);
      var available = timeslots.slice(index, 24);
      var tmp = [];
      var result = [];
      var timearr = [];
      var str = 0;
      var tr = 0;
      for (var i = 0; i < available.length; i++) {
        str = available[i].replace(":", "");
        tmp.push(str);
      }
      result = tmp.map((i) => Number(i));

      for (var i = 0; i < result.length; i++) {
        tr = result[i] - 400;
        timearr.push(tr);
      }
      var final = timearr.toString().split(",");
      setCurrent(available); //timeslots for current date
    } else {
      setCurrent(timeslots);
    }

    var req = {
      status: "scheduled",
    };

    scheduleUpdate(req, localStorage.getItem("id_token"))
      .then((response) => {
        var S_Data = [];
        for (var i = 0; i < response.data.length; i++) {
          S_Data.push({
            Date: response.data[i].updation_date_time.substring(0, 10),
            Time: response.data[i].updation_date_time.substring(
              11,
              response.data[i].updation_date_time.length
            ),
          });
        }
        setScheduled(S_Data); //already scheduled dates
      })
      .catch((error) => {
        setnotifyState({
          message: error,
          status: "error",
        });
        setsnackOpen(true);
      });
  };
  var updateslots;
  const handleSelecttime = (e) => {
    var temp = [];
    var arr = [];
    var t_arr = [];
    var t_time = e.target.value.replace(":", "");
    var num = parseInt(t_time);
    if (scheduled.length != 0) {
      scheduled.forEach(function (arrayItem) {
        var x = arrayItem.Date;
        var y = arrayItem.Time;
        t_arr.push(arrayItem.Time.slice(0, 2));
        if (x == date && t_arr.includes(t_time.slice(0, 2))) {
          //to check if the selected date contains already scheduled time
          temp.push(arrayItem.Time.slice(0, 5));

          setScheduledtime(temp); //already scheduled time slot of the selected date
          setEnable(true);
          for (var i = 0; i < 6; i++) {
            if (i == 0) {
              num = parseInt(t_time) + 0;
              arr.push(num);
            } else {
              num = num + 10;

              arr.push(num);
            }
          }
        } else {
          setEnable(true);
          for (var i = 0; i < 6; i++) {
            if (i == 0) {
              num = parseInt(t_time) + 0;
              arr.push(num);
            } else {
              num = num + 10;
              arr.push(num);
            }
          }
        }
      });
    } else {
      setEnable(true);
      for (var i = 0; i < 6; i++) {
        if (i == 0) {
          num = parseInt(t_time) + 0;
          arr.push(num);
        } else {
          num = num + 10;
          arr.push(num);
        }
      }
    }
    var slicearr = arr.slice(0, 6);
    var strarr = [];
    var final = [];
    var currentslot = [];
    var position = 2;
    if (slicearr[0].toString().length == 3) {
      position = 1;
    } else {
      position = 2;
    }
    var b = ":";
    for (var i = 0; i < slicearr.length; i++) {
      strarr.push(String(slicearr[i]));
    }
    for (var i = 0; i < strarr.length; i++) {
      var output = [
        strarr[i].slice(0, position),
        b,
        strarr[i].slice(position),
      ].join("");
      final.push(output); //adding minutes to hour
    }
    const d = new Date();
    var currentMin = d.getMinutes();
    var currenthr = d.getHours();
    var currentdate = moment().format("YYYY-MM-DD");
    if (currentMin <= 1 || currentMin <= 9) {
      currentMin = "0" + currentMin;
    }
    var today = new Date();

    var germantime = today.toLocaleTimeString("de-DE", {
      timeZone: "Europe/Berlin",
    });
    var gertime = germantime.slice(0, 5);
    setUslot(gertime);
    currentslot = final;
    setCurrentslots(currentslot);
    setSlots(final);
  };
  const flatPropsinstance = {
    options: instanceoption,
  };

  const handleInstancechange = (name) => {
    setinname(name);
    localStorage.setItem("inname", name);
    var current_version;
    var x = 0;
    var templist = [];
    setUpdateversion(templist);
      
    if (cluster == "production") {
      
      productionDB(localStorage.getItem("id_token"))
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (name == response.data[i].instance_name) {
              current_version = response.data[i].jenkins_version;
            }
          }
          setCurrentversion(current_version);
          localStorage.setItem("currentversion", current_version);
          JKversion.map((option, index) => {
            if (option.jenkins_version > current_version ) {
              templist.push(JKversion[index].jenkins_version);
            }
          });
          templist = templist.sort();
          if (templist.length == 0) {
              setnotifyState({
                message: "Instance is already having latest version.",
                status: "success",
              });
              setsnackOpen(true);
          }
          else {
            templist = templist.slice(0,4);
            setUpdateversion(templist);
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

    if (cluster == "testing") {
      
      testingDB(localStorage.getItem("id_token"))
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (name == response.data[i].instance_name) {
              current_version = response.data[i].jenkins_version;
            }
          }
          setCurrentversion(current_version);
          localStorage.setItem("currentversion", current_version);
          JKversion.map((option, index) => {
            if (option.jenkins_version > current_version ) {
              templist.push(JKversion[index].jenkins_version);
            }
          });
          templist = templist.sort();
          if (templist.length == 0) {
            setnotifyState({
              message: "Instance is already having latest version.",
              status: "success",
            });
            setsnackOpen(true);
          }
          else {
            templist = templist.slice(0,4);
            setUpdateversion(templist);
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

    if (cluster == "development") {
      
      developmentDB(localStorage.getItem("id_token"))
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (name == response.data[i].instance_name) {
              current_version = response.data[i].jenkins_version;
            }
          }
          setCurrentversion(current_version);
          localStorage.setItem("currentversion", current_version);
          JKversion.map((option, index) => {
            if (option.jenkins_version > current_version ) {
              templist.push(JKversion[index].jenkins_version);
            }
          });
          templist = templist.sort();
          if (templist.length == 0) {
            setnotifyState({
              message: "Instance is already having latest version.",
              status: "success",
            });
            setsnackOpen(true);
          }
          else {
            templist = templist.slice(0,4);
            setUpdateversion(templist);
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
  };
  const flatPropsversion = {
    options: updateversion,
  };

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: "absolute", right: 10, top: 5, color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const handleClick = (id, value) => {
    var property = document.getElementById(id);

    var tempid = [];
    tempid.push(id);
    setAvail(tempid);
    setS_time(value);
    localStorage.setItem("s_time", value);
    if ((property.style.backgroundColor = "#4a90e2")) {
      property.style.backgroundColor = "#57bf2e";
    } else {
      property.style.backgroundColor = "#4a90e2";
    }
    if (avail.length != 0) {
      var chipid = document.getElementById(avail[0]);
      chipid.style.backgroundColor = "#4a90e2";
      setAvail([id]);
    }
  };

  const formatAMPM = (time) => {
    if (time.length == 4) {
      var hours = time.slice(0, 1);
      var minutes = time.slice(2, 5);
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      hours = hours < 10 ? "0" + hours : hours;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    } else {
      var hours = time.slice(0, 2);
      var minutes = time.slice(3, 5);
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      hours = hours < 10 ? "0" + hours : hours;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
  };

  return (
    <React.Fragment>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Typography variant="h6">Cluster</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cluster}
                defaultValue="production"
                label="cluster"
                onChange={(event) => {
                  handleClusterChange(event);
                }}
              >
                <MenuItem value={"production"}>production</MenuItem>
                <MenuItem value={"testing"}>testing</MenuItem>
                <MenuItem value={"development"}>development</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Instance Name</Typography>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              {...flatPropsinstance}
              value={inname}
              id="combo-box-demo"
              onChange={(event, value) => {
                // setinname(value);
                handleInstancechange(value);
              }}
              renderInput={(params) => (
                <TextField size="small" variant="outlined" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Current Jenkins Version</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={currentversion}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Jenkins Version</Typography>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              {...flatPropsversion}
              value={jversion}
              id="combo-box-demo"
              onChange={(event, value) => {
                setjversion(value);
                localStorage.setItem("jversion", value);
              }}
              renderInput={(params) => (
                <TextField size="small" variant="outlined" {...params} />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Select Date and Time</Typography>
          </Grid>
          <Grid item xs={4}>
            <input
              type="date"
              name="date"
              min={today}
              style={{ height: "30px", width: "270px" }}
              onChange={(e) => {
                handleSelectdate(e);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(event) => {
                  handleSelecttime(event);
                }}
              >
                {current.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {enable ? (
            <>
              <Grid item xs={4}>
                <Typography variant="h6">Available Time Slots</Typography>
              </Grid>

              <Grid item xs={8}>
                <Stack direction="row" spacing={1}>
                  {currentslots.map((item, index) => {
                    if (scheduledtime.includes(item))
                      return <Chip label={item} size="large" color="warning" />;
                    else if (
                      item <= uslot &&
                      date == moment().format("YYYY-MM-DD")
                    ) {
                      return <Chip label={item} size="large" />;
                    } else {
                      return (
                        <Chip
                          label={item}
                          id={index}
                          size="large"
                          style={{ background: color, color: "white" }}
                          onClick={() => {
                            handleClick(index, item);
                          }}
                        />
                      );
                    }
                  })}
                  {}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Chip label="Past time" />
                  <Chip label="Already Scheduled" color="warning" />
                  <Chip label="Available" color="primary" />
                  <Chip label="Selected" style={{ background: "#57bf2e" }} />
                </Stack>
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
      </DialogContent>
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
    </React.Fragment>
  );
}
