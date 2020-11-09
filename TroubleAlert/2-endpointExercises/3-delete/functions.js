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

function deleteRecord(recordToDelete){
    fetch(
        // your fetch goes here
    )
    .then(
        showAllRecords()
    )
}