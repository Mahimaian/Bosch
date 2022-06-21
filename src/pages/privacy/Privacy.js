import React from "react";

import {Grid } from "@material-ui/core";
import useStyles from "./styles";

export default function Privacy() {
  var classes = useStyles();

  return (
    <React.Fragment>
       <Grid container style={{ marginTop: "2px", marginBottom: "2px"}} >
          <div className={classes.grow}>
            <h1> 1. Bosch respects your privacy</h1>  
            <p>The protection of your privacy throughout the course of processing personal data as well as the security of all business data are important concerns to us.</p>
            <p>Data protection and information security are included in our corporate policy.</p>
            <h1>2. Collection, processing and usage of personal data</h1>
            <h2>2.1 Processed data categories</h2>
            <p>Communication data (e.g. name, e-mail address, costcenter) are processed.</p>
            <h2>2.2 Principles</h2>
            <p>Personal data consists of all information related to an identified or identifiable natural person, this includes, e.g. names,  email addresses which is an expression of a person’s identity.</p>
            <p>We collect, process, and use personal data  only when there is either a statutory legal basis to do so or if you have given your consent to the processing or use of personal data concerning this matter.</p>          
            <h2>2.3 Processing purposes and legal basis</h2>
            <p>We as well as the service providers commissioned by us, process your personal data for the following processing purposes:</p>
            <h2>2.4 Log files</h2>
            <p>Each time you use the internet, your browser is transmitting certain information which we store in so-called log files.</p>
            <p>We store log files to determine service disruptions and for security reasons (e.g., to investigate attack attempts) for a period of 7 days and delete them afterwards. Log files which need to be maintained for evidence purposes are excluded from deletion until the respective incident is resolved and may, on a case-by-case basis, be passed on to investigating authorities.</p>
            <p>Log files are also used for analysis purposes (without the IP address or without the complete IP address)</p>
            <p>In log files, the following information is saved:</p>
            <p>Name of the files or information accessed;</p>
            <p>Date and time as well as duration of recalling the data;</p>
            <p>http status code (e.g., “Request successful” or “File requested not found”).</p>
            <h2>2.5 Duration of storage, retention periods</h2>
            <p>We will store the history of data upto one month</p>
            <h1>3. Security</h1>
            <p>Our employees and the companies providing services on our behalf, are obliged to confidentiality and to compliance with the applicable data protection laws. We take all necessary technical and organizational measures to ensure an appropriate level of security and to protect your data that are administrated by us especially from the risks of unintended or unlawful destruction, manipulation, loss, change, or unauthorized disclosure or unauthorized access. Our security measures are, pursuant to technological progress, constantly being improved.</p>
            <p></p>
            <p>--------------------------------------</p>
          </div>
        </Grid>
    </React.Fragment>
  );
}

