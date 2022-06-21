import React, { useState } from "react";

import {
  Grid,
  DialogContent,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";


import {
  instanceDB,
  getAlertsConfigurationFilter,
} from "../../services/services";


import FormControl from "@mui/material/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AlertsConfiguration() {  

  const [instanceName, setInstanceName] = useState("");
  const [cluster, setcluster] = useState([]);
  const [instanceoption, setInstanceoption] = useState([]); 
  const [diskUsage, setDiskUsage] = useState(""); 
  const [inodeUsage, setInodeUsage] = useState(""); 

  const flatPropsinstance = {
    options: instanceoption,
  };

  const flatPropsAlerts = {
    options: ["70","75","80","85","90","95"],
  };

  const handleClusterChange = (e) => {
    const up = cluster;
    up[0] = e.target.value;
    console.log(up);
    setcluster(up);
    localStorage.setItem("cluster", up);
    
    instanceDB(localStorage.getItem("id_token"),e.target.value)
        .then((response) => {
          let i, j;
          let inst = [];
          console.log(response);
          for (i = 0; i < response.data.length; i++) {
            if (i === 0) {
              inst[i] = response.data[i].instance_name;
            } else {
              for (j = 0; j < up.length; j++) {
                if (inst[j] !== response.data[i].instance_name) {
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

    getAlertsConfigurationFilter(localStorage.getItem("id_token"), name)
        .then((response) => {
          if (response.data.length >= 0) {
            var disk_usage = response.data[0].disk_usage_threshold;
            var inode_usage = response.data[0].inodes_usage_threshold;
            setDiskUsage(disk_usage);
            setInodeUsage(inode_usage);
            localStorage.setItem("disk_usage", disk_usage);
            localStorage.setItem("inode_usage", inode_usage);
          }
        })
        .catch((error) => {
            console.warn("Error getting Alerts data.");
        });   
    
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
            <Typography variant="h6">Disk Usage Threshold</Typography>
          </Grid>
          <Grid item xs={8}>
          <Autocomplete
              {...flatPropsAlerts}
              value={diskUsage}
              noOptionsText
              id="combo-box-demo"
              onChange={(event, value) => {
                setDiskUsage(value);
                localStorage.setItem("disk_usage", value);
              }}
              renderInput={(params) => (
                <TextField size="small" variant="outlined" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Inode Usage Threshold</Typography>
          </Grid>
          <Grid item xs={8}>
          <Autocomplete
              {...flatPropsAlerts}
              value={inodeUsage}
              noOptionsText
              id="combo-box-demo"
              onChange={(event, value) => {
                setInodeUsage(value);
                localStorage.setItem("inode_usage", value);
              }}
              renderInput={(params) => (
                <TextField size="small" variant="outlined" {...params} />
              )}
            />
          </Grid>
          
        </Grid>
      </DialogContent>
     
    </React.Fragment>
  );
}
