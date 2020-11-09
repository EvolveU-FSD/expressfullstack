var theRecords = []

function loadPage(){
    showAllRecords()
}

function showAllRecords(){
    const showAllRecordsDiv = document.getElementById('showAllRecords')
    fetch('/records', {cache: 'no-store'})
    .then(response => response.json())
    .then(records => {
        theRecords = records
        showAllRecordsDiv.textContent = JSON.stringify(records)})    
}

function changeWithPut(){
    const id = 1
    const newTitle = document.getElementById('newTitle').value
    const existingRecord = theRecords.find(record => record.id == id)
    if (!id || !newTitle || !existingRecord)
        alert('bad request')
    else 
        fetch(`/record?id=${id}`, {
            method: 'PUT',2
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...existingRecord, name: newTitle})
        }).then(
            showAllRecords()
        )
}

function changeWithPatch(){
    const id = 1
    const newTitle = document.getElementById('newTitle').value
    const existingRecord = theRecords.find(record => record.id == id)
    if (!id || !newTitle || !existingRecord)
        alert('bad request')
    else 
        fetch(`/record?id=${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: newTitle})
        }).then(
            showAllRecords()
        )
}