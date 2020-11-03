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
const app = express()

const cors = require('cors') // quick work around for CORS issues
app.use(cors())

var server = app.listen(8081, function(){
    var port = server.address().port
    console.log(`Trouble Alert Server started on ${port}`)
})

app.get('/alerts', function(req, res){
    res.send(someAlerts)
})


