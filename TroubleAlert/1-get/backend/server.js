var someAlerts = [
    {
        id: 1,
        state: 'New',
        title: 'Octopus attacking the harbour'
    },
    {
        id: 2,
        state: 'New',
        title: 'Bizzaro robbing bank'
    },
    {
        id: 3,
        state: 'In Progress',
        title: 'Get milk'
    }
]

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(express.json());

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log(`Trouble Alert Server started on ${host}:${port}`)
})

app.get('/alerts', function(req, res){
    res.send(someAlerts)
})

app.post('/alerts', function(req, res){
    res.json({requestBody: req.body})
    const newId = someAlerts.reduce((max, cur)=> max>cur.id?max:cur.id, 1)+1
    someAlerts.push({id: newId, state: 'New', title: req.body.newAlert})
})

app.get('/alert', function(req, res){
    const alertNumber = req.query.alertNumber
    const alert = someAlerts.find(alert => alert.id == alertNumber)
    res.send(alert)
})

app.put('/alert', function(req, res){
    const alertNumber = req.query.alertNumber
    const alert = someAlerts.find(alert => alert.id == alertNumber)
    alert.state = 'In Progress'
    res.send(alert)
})

app.delete('/alert', function(req, res){
    const alertNumber = req.query.alertNumber
    const alert = someAlerts.find(alert => alert.id == alertNumber)
    alert.state = 'Deleted'
    res.send(alert)
})

