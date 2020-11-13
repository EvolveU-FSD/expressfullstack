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
    const newTitleInput = document.getElementById('newTitle')
    const newTitle = newTitleInput.value
    fetch('http://localhost:8082/records', {       
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: newTitle})
    }).then(
        showAllRecords()
    )
}