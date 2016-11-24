import * as test from 'unit.js'

test.string(process.env.SLACK_AUTH_TOKEN)
test.string(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
test.string(process.env.FIREBASE_ACCOUNT_URL)