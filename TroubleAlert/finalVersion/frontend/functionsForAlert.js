var alertNumber
var theAlert

function loadPage(){                                                        // when the page loads
    setAlertNumber()                                                        // get the alert number from the url 
    loadAlertInfo()                                                         // load the alertinfo
}

function setAlertNumber(){                                                  
    const queryString = window.location.search                              // get the url query string ?alertNumber=1
    const urlParams = new URLSearchParams(queryString)                      // pull the params out
    alertNumber = urlParams.get('alertNumber')                              // store the alert number
}

function loadAlertInfo(){                                                   
    fetch(`http://localhost:8081/alert?alertNumber=${alertNumber}`)         // get the alert data from the server
    .then(response => response.json())                                      // read the response out of the json
    .then(alert => setAlertInfo(alert))                                     // set the alert info
}

function setAlertInfo(alert)
{
    theAlert = alert                                                        // we have a new alert so sset it

    const alertText = document.getElementById('alertText')                  // get and set the alert text
    alertText.textContent = alert.title

    const status = document.getElementById('alertStatus')                   /// get and set the status
    status.textContent= alert.state

    const dispatchButton = document.getElementById('dispatchButton')        // if the alert isn't new
    if (alert.state != 'New')
        dispatchButton.classList.add('disabledButton')                      // add disabledButton class to the dispatch button
}

function dispatchHeroes(){
    if (theAlert.state == 'New')
    {
        // could use a post this way
        // fetch(`http://localhost:8081/alert?alertNumber=${theAlert.id}`, {
        //     method: 'PUT',                                                       // a put
        //     headers: {'Content-Type': 'application/json'},                       // body is json
        //     body: JSON.stringify({...theAlert, state: 'In Progress'})            // spicy? need to send whole object but changin state
        // })
        fetch(`http://localhost:8081/alert?alertNumber=${theAlert.id}`, {
            method: 'PATCH',                                                        // a patch
            headers: {'Content-Type': 'application/json'},                          // body is json
            body: JSON.stringify({state: 'In Progress'})                            // just send the thing we want to change
        })
        .then(response => response.json())                                          // get the body from the response json
        .then(alert => setAlertInfo(alert))                                         // set alert info with the new data
    }
}

function deleteAlert(){
    fetch(`http://localhost:8081/alert?alertNumber=${theAlert.id}`, {method: 'DELETE'}) // call delete
    .then(response => response.json())                                                  // get the body from response json
    .then(alert => setAlertInfo(alert))                                                 // set the alert info
}