function loadPage(){
    showAllRecords()
}

function showAllRecords(){
    const showAllRecordsDiv = document.getElementById('showAllRecords')
    fetch('http://localhost:8082/records', {cache: 'no-store'})
    .then(response => response.json())
    .then(records => showAllRecordsDiv.textContent = JSON.stringify(records))    
}

function addRecord(){
    const newTitleDiv = document.getElementById('newTitle')
    const newTitle = newTitleDiv.value
    fetch('http://localhost:8082/records', {       
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({newTitle: newTitle})
    }).then(
        showAllRecords()
    )
}