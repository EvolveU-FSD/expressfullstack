var someAlerts = [          // just some data in an array
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

const express = require('express')      // we're using request
const cors=require('cors')              // cors helps us call from other websites.. in particular if we want to run from 127.0.0.1 instead of localhost
const app = express()                   // create the express app

app.use(express.json());                // handles reading json, which we need for set posts
app.use(cors());                        // open cors policy... allows us to use either http://localhost or http://127.0.0.1
app.use(express.static('../frontend'))  // serve up our files from the server instead of using the files... html is in ../frontend from this file (which is in backend)

var server = app.listen(8081, function(){   // listen on port 8081
    var port = server.address().port
    console.log(`Trouble Alert Server started on ${port}`)  // open by showing the port in case I forgot
})

app.get('/alerts', function(req, res){              // get all alerts (alerts is plural and we just return the data)
    res.send(someAlerts)
})

app.post('/alerts', function(req, res){                                         // add a new alert... note not idempotent will create a new alert each time its called
    const newId = someAlerts.reduce((max, cur)=> max>cur.id?max:cur.id, 1)+1    // spicy! get the next id with an aggregator... spicy!
    const newAlert= {id: newId, state: 'New', title: req.body.newAlert}         // create the alert
    someAlerts.push(newAlert)                                                   // put the alert in our data array
    res.send(newAlert)                                                          // return the new alert
})

app.get('/alert', function(req, res){                                   // get a specific alert
    const alertNumber = req.query.alertNumber                           // get the alert id from the request query
    const alert = someAlerts.find(alert => alert.id == alertNumber)     // spicy? find the alert in our data with that id
    res.send(alert)                                                     // return the alert
})

app.put('/alert', function(req, res){                                           
    const alertNumber = req.query.alertNumber                           // get the alert number (id) from the query
    const alertIndex =  
        someAlerts.findIndex(alert => alert.id == alertNumber)          // find the index that matches the id ... this should be related to the id for this code, but if the delete endpoint completely removed records then it could change. Best to be safe
    someAlerts[alertIndex] = req.body                                   // change the data at the correct index  
    const newAlert = someAlerts[alertIndex]                             // get the data out of the array ... it probably matches the data in req.body but probably best to return the real data that we are keeping
    res.send(newAlert)                                                     
})

app.patch('/alert', function(req, res){                                 // update an alert by patching it
    const alertNumber = req.query.alertNumber                           // get the alert number (id) from the query
    const alert = someAlerts.find(alert => alert.id == alertNumber)     // spicy? find the alert
    Object.assign(alert, req.body)                                      // spicy! update the alert with Object.assing (look it up, it's helpful but basically a patch)
    res.send(alert)                                                     // return the alert
})

// I went with soft-delete here because it's easier to debug. You could just remove the
// alert from the array and redirect back to the main page
// But, it might be confusing if it didn't delete properly. So soft delete is nice
// Remember: you are in charge of what your server does. You could make another choice in your project
//           you'd just need slightly different server implementation
app.delete('/alert', function(req, res){                                // delete an alert
    const alertNumber = req.query.alertNumber                           // get the alert number (id) from the query
    const alert = someAlerts.find(alert => alert.id == alertNumber)     // get the alert
    alert.state = 'Deleted'                                             // soft delete the alert. Soft delete marks it so it won't get confused as an active alert, but keeps it in the database
    res.send(alert)                                                     // we return the soft-deleted alert, so that we can show the operator that the alert is deleted.
})                                          

