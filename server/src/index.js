const { MongoClient, Db, ObjectId, UpdateQuery } = require('mongodb');

const connectionString = "mongodb://hackmit:FPj59IerX8J4Yk570tJKYK6S1GkDeXPdvIH7cUmqJVFYwwJHqCkr7mPcSLzY4N6VitcgMIvrr7bTOHqotEaQQg==@hackmit.documents.azure.com:10255/shellhacks?ssl=true&replicaSet=globaldb";

let db;

MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
    if (err) throw new Error(err.message);
    db = client.db();
    console.log('Connected');
    // this.db.createIndex(Collections.Accounts, 'username', { unique: true }, () => log('index created')); // Ensure that usernames are unique
    // this.db.createIndex(Collections.Clients, 'name', { unique: true }, () => log('index created')); // Ensure that usernames are unique


});

const Twilio = require('twilio');

const twilio_creds = {
    "account_sid": "AC2e9791a102ff64ae9008e3fbb3a5cec5",
    "auth_token": "025d9a00616ca977b29a1da388c2501d",
    "sender": "+13212412208"
}

const twilio = new Twilio(twilio_creds.account_sid, twilio_creds.auth_token);

const bodyParser = require('body-parser')

const express = require('express')
const app = express()

var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/users', (req, res) => {

    db.collection('users').find().toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({ items: result })

    });
})

app.post('/message', (req, res) => {
    const message = req.body.message;
    const number = req.body.number;

    twilio.messages.create({
        from: twilio_creds.sender,
        to: number,
        body: message
    }).then((message) => {
        console.log('Created message using promises');
        console.log(message.sid);
        res.send({ sid: message.sid })
    });
})

app.listen(3005)