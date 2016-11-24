import * as test from 'unit.js'

import * as os from 'os'
const admin = require('firebase-admin')

require('dotenv').config({ path: './.env' });

//admin.database.enableLogging(true)
let app = admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
    databaseURL: process.env.FIREBASE_ACCOUNT_URL
});

console.log(os.hostname())
console.log(`${os.hostname()}/V${process.env.VERSION}`)
// Import Admin SDK

// Get a database reference to our teams
let teamId = process.pid
let teamsParent = admin.database().ref(`${os.hostname()}/V${process.env.VERSION}`);
teamsParent.remove()
let teamsRef = admin.database().ref(`${os.hostname()}/V${process.env.VERSION}/teams`);

teamsRef.on("value", function (snapshot) {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

teamsRef.child(teamId.toString())
    .set({
        name: 'griffin',
        type: 'slack',
        slack_id: 'SLID12345',
        joined: Date.now()
    })


teamsRef.child(teamId.toString()+'/name')
    .set('griffin2')
