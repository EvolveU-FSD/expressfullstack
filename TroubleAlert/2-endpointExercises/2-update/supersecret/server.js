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

app.put('/record', function(req, res){
    const id = req.query.id
    const indexOfId = someData.findIndex(record => record.id == id)
    someData[indexOfId] = req.body    
})

app.patch('/record', function(req,res){
    const id = req.query.id
    const recordToChange = someData.find(record => record.id == id)
    Object.assign(recordToChange, req.body)
    console.log('record to change ater patch is now', recordToChange)
})