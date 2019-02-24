const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json);

let publicKey= 'BC2_L_A8XzOUeVeNRnR8Kda39elR6lAlK4ddmurzO5tC1dYPFB27_Bij1alAcNbWKWFMzFMkkzyCh2pvsTZCXVI';
let privateKey= 'rpiGfj9kNNUxgY-BaT3WSco9vdi07YB7WDnq4mRVPVI';

webpush.setVapidDetails('mailto:test@test.com',publicKey,privateKey);

app.post('/subscribe', (req, res)=>{
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({title: 'push test'});

    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`));