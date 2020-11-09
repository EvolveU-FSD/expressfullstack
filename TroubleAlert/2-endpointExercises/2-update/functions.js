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
        fetch(
            // your fetch here
        ).then(
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
        fetch(
            // your fetch here
        ).then(
            showAllRecords()
        )
}