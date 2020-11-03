var alertNumber
var theAlert

function loadPage(){
    setAlertNumber()
    loadAlertInfo()
}

function setAlertNumber(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    alertNumber = urlParams.get('alertNumber')
}

function loadAlertInfo(){
    fetch(`http://localhost:8081/alert?alertNumber=${alertNumber}`)
    .then(response => response.json())
    .then(alert => setAlertInfo(alert))
}

function setAlertInfo(alert)
{
    theAlert = alert

    const alertText = document.getElementById('alertText')
    alertText.textContent = alert.title

    const status = document.getElementById('alertStatus')
    status.textContent= alert.state

    const dispatchButton = document.getElementById('dispatchButton')
    if (alert.state != 'New')
        dispatchButton.classList.add('disabledButton')
}

function dispatchHeroes(){
    if (theAlert.state == 'New')
    {
        fetch(`http://localhost:8081/alert?alertNumber=${theAlert.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newState: 'In Progress'})
        })
        .then(response => response.json())
        .then(alert => setAlertInfo(alert))
    }
}

function deleteAlert(){
    fetch(`http://localhost:8081/alert?alertNumber=${theAlert.id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(alert => setAlertInfo(alert))
}