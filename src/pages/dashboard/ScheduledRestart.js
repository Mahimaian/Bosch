import React, { useState, useEffect } from "react";

import {
  Grid,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

import { Typography } from "../../components/Wrappers";

import {
  instanceDB,
  getScheduledRestartFilter,
} from "../../services/services";


import FormControl from "@mui/material/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function ScheduledRestart(props) {  

  const [instanceName, setInstanceName] = useState("");
  const [cluster, setCluster] = useState([]);
  const [restartDateTime, setRestartDateTime] = useState([]); 
  const [cronEntry, setCronEntry] = useState(""); 
  const [instanceoption, setInstanceoption] = useState([]);  
  const [restart, setRestart] = React.useState(false);

  const flatPropsinstance = {
    options: instanceoption,
  };
  
  const handleClusterChange = (e) => {
    const up = cluster;
    up[0] = e.target.value;
    console.log(up);
    setCluster(up);
    localStorage.setItem("cluster", up);
    
    instanceDB(localStorage.getItem("id_token"),e.target.value)
        .then((response) => {
          let i, j;
          let inst = [];
          console.log(response);
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
          console.log(inst);
        })
        .catch((error) => {
         
        });
   
  };

  const handleInstancechange = (name) => {
    setInstanceName(name);
    localStorage.setItem("instance_name", name);

    getScheduledRestartFilter(localStorage.getItem("id_token"), name)
        .then((response) => {
          if (response.data.length >= 0) {
            var cluster = response.data[0].cluster;
            var restart_date_time = response.data[0].restart_date_time;
            var cron_entry = response.data[0].cron_entry;
            setCluster(cluster);
            setRestartDateTime(restart_date_time);
            setCronEntry(cron_entry);

            localStorage.setItem("cluster", cluster);
            localStorage.setItem("restart_date_time", restart_date_time);
            localStorage.setItem("cron_entry", cron_entry);
          }
          else {
            localStorage.setItem("restart_date_time", '');
            localStorage.setItem("cron_entry", '');
          }
        })
        .catch((error) => {
            console.warn("Error getting Alerts data.");
        });   
    
  };
  console.log(props.data);
  return (

    ( props.data.id > 0 ?
        <React.Fragment>
        <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Typography variant="h6">Cluster</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">{ props.data.cluster }</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Instance Name</Typography>
          </Grid>
          <Grid item xs={8}>
          <Typography variant="h6">{ props.data.instance_name }</Typography>
          </Grid>
          { props.data.cron_entry != 'unknown' && 
          <Grid item xs={4}>
            <Typography variant="h6">Cron Entry</Typography>
          </Grid> } 
          { props.data.cron_entry != 'unknown' && 
          <Grid item xs={8} >
                <TextField onChange = {(event) => {
                  setCronEntry(event.target.value);
                  setRestartDateTime('');
                  localStorage.setItem("cron_entry", event.target.value);
                  localStorage.setItem("restart_date_time", '');
                }}  size="small" variant="outlined" value={cronEntry}  />
          </Grid>
           }
          
          { props.data.cron_entry == 'unknown' && 
          <Grid item xs={4}>
            <Typography variant="h6">Restart Date Time</Typography>
          </Grid>
          }
          {  props.data.cron_entry == 'unknown'  && 
          <Grid item xs={8}>
            <form  noValidate>
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={props.data.restart_date_time.slice(0,19) }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {(event) => {
                  setRestartDateTime(event.target.value);
                  setCronEntry('');
                  localStorage.setItem("cron_entry", '');
                  localStorage.setItem("restart_date_time", event.target.value);
                  console.log(event.target.value);
                }} 
              />
            </form>
          </Grid>
         }
        </Grid>
      </DialogContent>

        </React.Fragment>
      :
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
              value={instanceName}
              noOptionsText
              id="combo-box-demo"
              onChange={(event, value) => {
                setInstanceName(value);
                handleInstancechange(value);
              }}
              renderInput={(params) => (
                <TextField size="small" variant="outlined" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="CRON" >
                <FormControlLabel value="CRON" control={<Radio />} label="Cron Entry"  labelPlacement="end"
                onClick = { (e) => setRestart(false) } />
                <FormControlLabel value="DATE_TIME" control={<Radio />} label="Restart Date time" onClick = { (e) => setRestart(true)} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={8}></Grid>
          { !restart && 
          <Grid item xs={4}>
            <Typography variant="h6">Cron Entry</Typography>
          </Grid> } 
          { !restart && 
          <Grid item xs={8} >
                <TextField onChange = {(event) => {
                  setCronEntry(event.target.value);
                  setRestartDateTime(' ');
                  localStorage.setItem("cron_entry", event.target.value);
                  localStorage.setItem("restart_date_time", '');
                }}  size="small" variant="outlined" value={cronEntry}  />
          </Grid>
           }
          
          { restart && 
          <Grid item xs={4}>
            <Typography variant="h6">Restart Date Time</Typography>
          </Grid>
          }
          { restart && 
          <Grid item xs={8}>
          <form  noValidate>
            <TextField
              id="datetime-local"
              type="datetime-local"
              value={restartDateTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
              onChange = {(event) => {
                setRestartDateTime(event.target.value);
                setCronEntry('');
                localStorage.setItem("cron_entry", '');
                localStorage.setItem("restart_date_time", event.target.value);
                console.log(event.target.value);
              }} 
            />
            </form>
              
          </Grid>
         }
        </Grid>
      </DialogContent>
     
    </React.Fragment> 
    )
  );
}
