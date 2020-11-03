function loadPage(){
    loadAlerts();    
}

function loadAlerts(){
    fetch('http://localhost:8081/alerts', {cache: 'no-store'})
    .then(response => response.json())
    .then(alerts => loadAlertsOntoPage(alerts))
}

function loadAlertsOntoPage(alerts){
    const newAlerts = alerts.filter(alert => alert.state === 'New')
    const inProgressAlerts = alerts.filter(alert => alert.state == 'In Progress')

    populateAlerts('newAlerts', newAlerts)
    populateAlerts('inProgressAlerts', inProgressAlerts)
}

function populateAlerts(id, alerts){
    const alertArea = document.getElementById(id)

    // clears any existing div children from the alertarea... let's use this when alerts change
    // this is the bluntest way to do this, but it will work for this app
    alertArea.innerHTML = ''        

    alerts.forEach( alert => {
        const newAlertDiv = document.createElement('div')
        newAlertDiv.classList.add('alertItem')
        newAlertDiv.textContent = alert.title
        newAlertDiv.onclick=()=>location.href=`alert.html?alertNumber=${alert.id}`
        alertArea.appendChild(newAlertDiv)
    })
}

function submitNewAlert(){
    const newAlertTitle = document.getElementById('newAlertTitle')
    const alertTitle = newAlertTitle.value
    fetch('http://localhost:8081/alerts', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({newAlert: alertTitle})
    })
    .then(loadAlerts)
}





