var someData = [
    {id: 1, name: 'first record'}
]

const express = require('express')      // we're using request
const cors=require('cors')              // cors helps us call from other websites.. in particular if we want to run from 127.0.0.1 instead of localhost
const app = express()                   // create the express app

app.use(express.json());                // handles reading json, which we need for set posts
app.use(cors());                        // open cors policy... allows us to use either http://localhost or http://127.0.0.1
app.use(express.static('.'))

var server = app.listen(8083, function(){   // listen on port 8081
    var port = server.address().port
    console.log(`Server started on ${port}`)  // open by showing the port in case I forgot
})

app.get('/records', function(req, res){
    res.send(someData)
})

// your app.put and app.push here
app.put('/records/:recordId', function(req, res) {
    // get the parameters from the request
    let id = req.params.recordId
    let newRecord = req.body

    console.log('Going to replace record ' + id + ' with ', newRecord)

    // do the thing
    let replaceIndex = someData.findIndex((data) => data.id == id)
    console.log('Found the record at index:', replaceIndex)

    if (replaceIndex !== -1) {
        someData[replaceIndex] = newRecord
    }

    // make a response
    res.sendStatus(200)
})

app.patch('/records/:recordId', function(req, res) {
    // get the parameters from the request
    let id = req.params.recordId
    let patchRecord = req.body

    console.log('Going to patch record ' + id + ' with ', patchRecord)

    // do the thing
    let patchIndex = someData.findIndex((data) => data.id == id)
    console.log('Found the record at index:', patchIndex)

    if (patchIndex !== -1) {
        let existingRecord = someData[patchIndex]
        let newData = { ...existingRecord, ...patchRecord }
        someData[patchIndex] = newData
        console.log('Patching record at index ' + patchIndex + ' with ', newData)
        // make a response
        res.sendStatus(200)
    }
    else {
        res.sendStatus(404)
    }
    
})
