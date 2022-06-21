import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

/******* URL Info *********/

// let url = "https://rb-jmaas-test.de.bosch.com/restapi"

let url = "https://rb-jmaas.de.bosch.com/restapi";

/******** Set Header ******/

function head(header) {
  if (header === null || header === undefined) header = "Token 0";
  const ob = { Authorization: "Token " + header };
  return ob;
}

/******* Auth API's *******/

function userLogin(data) {
  return axios.post(`${url}/api-token-auth/`, data, { timeout: 100000 });
}

/****** Instance API's *******/

function listInstance(header) {
  return axios.get(`${url}/api/Update/`, {
    headers: head(header),
    timeout: 30000,
  });
}

/****** Production Instance API's *******/

function productionDB(header) {
  return axios.get(`${url}/api/ProductionCustomerInstances/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function productionDelete(data, header) {
  return axios.delete(`${url}/api/ProductionCustomerInstances/` + data + `/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function productionUpdate(id, header, data) {
  return axios.put(
    `${url}/api/ProductionCustomerInstances/` + id + `/`,
    data,
    { headers: head(header), timeout: 30000 },
    data
  );
}

function getAlerts(header) {
  return axios.get(`${url}/api/AlertsAudit/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function getAlertsConfiguration(header) {
  return axios.get(`${url}/api/Alerts/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function getAlertsConfigurationFilter(header, instance_name) {
  return axios.get(`${url}/api/Alerts/?instance_name=${instance_name}`, {
    headers: head(header),
    timeout: 30000,
  });
}
function setAlertThreshold(data, header) {
  return axios.post(`${url}/api/Alerts/`, data, {
    headers: head(header),
    timeout: 30000,
  });
}


function getScheduledRestart(header) {
  return axios.get(`${url}/api/ScheduledRestart/`, {
    headers: head(header),
    timeout: 30000,
  });
}


function getScheduledRestartFilter(header, instance_name) {
  return axios.get(`${url}/api/ScheduledRestart/?instance_name=${instance_name}`, {
    headers: head(header),
    timeout: 30000,
  });
}

function setScheduledRestart(data,header) {
  if (data.edit === "true" ) {
    return schduledRestartUpdate(data.id, header, data) 
  }
  else {
    return axios.post(`${url}/api/ScheduledRestart/`,data, {
      headers: head(header),
      timeout: 30000,
    });
  }
  
}

function schduledRestartUpdate(id, header, data) {
  return axios.put(
    `${url}/api/ScheduledRestart/` + id + `/`,
    data,
    { headers: head(header), timeout: 30000 },
    data
  );
}

function cancelScheduledRestart(data, header) {
  return axios.delete(`${url}/api/ScheduledRestart/`  + data + `/`, {
    headers: head(header),
    timeout: 30000,
  });
}

/****** Testing Instance API's *******/
function testingDB(header) {
  return axios.get(`${url}/api/TestingCustomerInstances/`, {
    headers: head(header),
    timeout: 30000,
  });
}
/****** Development Instance API's *******/

function developmentDB(header) {
  return axios.get(`${url}/api/DevelopmentCustomerInstances/`, {
    headers: head(header),
    timeout: 30000,
  });
}
/****** Update Jenkins API's *******/

function updateJenkins(header) {
  return axios.get(`${url}/api/Update/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function scheduleUpdate(data, header) {
  return axios.get(`${url}/api/Update/?status=scheduled`, {
    headers: head(header),
    timeout: 30000,
  });
}
function getUpdate(data, header) {
  return axios.get(
    `${url}/api/Update/?status=&updation_date_time__gte=${data}T00%3A00%3A00&updation_date_time__lte=${data}T23%3A59%3A00`,
    {
      headers: head(header),
      timeout: 30000,
    }
  );
}
function getUpdategraph(data, header) {
  return axios.get(
    `${url}/api/Update/?status=failed&updation_date_time__gte=${data}T00%3A00%3A00&updation_date_time__lte=${data}T23%3A59%3A00`,
    {
      headers: head(header),
      timeout: 30000,
    }
  );
}
function getJKversion(header) {
  return axios.get(`${url}/api/JenkinsVersions/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function getLiveData(header) {
  return axios.get(`${url}/api/LiveData/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function getCurrentJKversion(version, header) {
  return axios.get(`${url}/api/JenkinsVersions/?jenkins_version=` + version, {
    headers: head(header),
    timeout: 30000,
  });
}
function updateinstance(data, header) {
  return axios.post(`${url}/api/Update/`, data, {
    headers: head(header),
    timeout: 30000,
  });
}

function cancelUpdateInstance(data, header) {
  return axios.delete(`${url}/api/Update/`  + data + `/`, {
    headers: head(header),
    timeout: 30000,
  });
}

function instanceDB(header, cluster) {
  if (cluster === "production") {
    return axios.get(`${url}/api/ProductionCustomerInstances/`, {
      headers: head(header),
      timeout: 30000,
    });
  }
  else if (cluster === "testing") {
    return axios.get(`${url}/api/TestingCustomerInstances/`, {
      headers: head(header),
      timeout: 30000,
    });
  }
  else if (cluster === "development") {
    return axios.get(`${url}/api/DevelopmentCustomerInstances/`, {
      headers: head(header),
      timeout: 30000,
    });
  }
 
}

/****** Email notification API's *******/

function emailNotification(data, header) {
  return axios.post(`${url}/api/EmailNotifiation/`, data, {
    headers: head(header),
    timeout: 30000,
  });
}
export {
  userLogin,
  listInstance,
  instanceDB,
  productionDB,
  productionDelete,
  productionUpdate,
  getAlerts,
  getAlertsConfiguration,
  getAlertsConfigurationFilter,
  setAlertThreshold,
  getScheduledRestart,
  getScheduledRestartFilter,
  setScheduledRestart,
  schduledRestartUpdate,
  cancelScheduledRestart,
  updateJenkins,
  getJKversion,
  updateinstance,
  cancelUpdateInstance,
  emailNotification,
  scheduleUpdate,
  getCurrentJKversion,
  getUpdate,
  getUpdategraph,
  testingDB,
  developmentDB,
  getLiveData,
};
