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
    if (!id || !newTitle || !existingRecord) {
        alert('bad request')
    }
    else {
        let newRecord = {
            id: id,
            name: newTitle
        }
        console.log('Going to PUT record:', newRecord)
        fetch('/records/'+id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
        })
        .then(() => {
            console.log('Put completed!')
            showAllRecords()
        })
    } 
}

function changeWithPatch(){
    const id = 1
    const newTitle = document.getElementById('newTitle').value
    const existingRecord = theRecords.find(record => record.id == id)

    if (!id || !newTitle || !existingRecord)
        alert('bad request')
    else {
        let patchRecord = {
            name: newTitle
        }
        console.log('Going to patch ' + id + ' with', patchRecord )
        fetch('/records/'+id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchRecord)
        })
        .then(() => {
            console.log('Patch completed!')
            showAllRecords()
        })
    }
}