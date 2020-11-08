function loadPage(){                                                    // when the page loads
    loadAlerts();                                                       // load all alerts
}

function loadAlerts(){
    fetch('http://localhost:8081/alerts', {cache: 'no-store'})          // get the alerts... spicy! we us no-store to prevent the page from caching. Try the page without it
    .then(response => response.json())                                  // read the json out of the response
    .then(alerts => loadAlertsOntoPage(alerts))                         // load the alerts onto the page
}

function loadAlertsOntoPage(alerts){
    const newAlerts = alerts.filter(alert => alert.state === 'New')     // split the alerts by state so we know where to show them
    const inProgressAlerts = alerts.filter(alert => alert.state == 'In Progress')

    populateAlerts('newAlerts', newAlerts)                              // populate sections for the alerts
    populateAlerts('inProgressAlerts', inProgressAlerts)
}

function populateAlerts(id, alerts){
    const alertArea = document.getElementById(id)                       // get the element to put the new alert objects into

    // clears any existing div children from the alertarea... let's use this when alerts change
    // this is the bluntest way to do this, but it will work for this app
    alertArea.innerHTML = ''        

    alerts.forEach( alert => {                                          // for each alert
        const newAlertDiv = document.createElement('div')               // create a new div
        newAlertDiv.classList.add('alertItem')                          // mark it as an alert for styling
        newAlertDiv.textContent = alert.title                           // give it the correct title
        newAlertDiv.onclick=()=>location.href=`alert.html?alertNumber=${alert.id}`  // add an onclick to take us to the alert specific page
        alertArea.appendChild(newAlertDiv)                              // add the alert to the correct seciton
    })
}

function submitNewAlert(){
    const newAlertTitle = document.getElementById('newAlertTitle')      // get the title for the new alert
    const alertTitle = newAlertTitle.value                                  
    fetch('http://localhost:8081/alerts', {                             // send a post to alerts to create the new alert
        method: 'post',
        headers: {"Content-Type": "application/json"},                  // add a header to tell the seerver to expect json
        body: JSON.stringify({newAlert: alertTitle})                    // add the body with the new title
    })
    .then(loadAlerts)                                                   // reload the alerts when it's done so that we see the new alert
}





