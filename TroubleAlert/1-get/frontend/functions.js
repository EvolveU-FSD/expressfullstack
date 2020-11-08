function loadPage(){
    loadAlerts();    
}

function loadAlerts(){
    fetch('http://localhost:8081/alerts')
    .then(response => response.json())
    .then(alerts => loadAlertsOntoPage(alerts))
    .catch(error => console.log('error', error))
}

function loadAlertsOntoPage(alerts){
    const newAlerts = alerts.filter(alert => alert.state === 'New')
    const inProgressAlerts = alerts.filter(alert => alert.state == 'In Progress')

    populateAlerts('newAlerts', newAlerts)
    populateAlerts('inProgressAlerts', inProgressAlerts)
}

function populateAlerts(id, alerts){
    const alertArea = document.getElementById(id)  

    alerts.forEach( alert => {
        const newAlertDiv = document.createElement('div')
        newAlertDiv.classList.add('alertItem')
        newAlertDiv.textContent = alert.title
        // newAlertDiv.onclick=()=>location.href=`alert.html?alertNumber=${alert.id}`
        alertArea.appendChild(newAlertDiv)
    })
}

function submitNewAlert(){
    console.log('submit new alert coming soon')
}





