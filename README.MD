# RESTFul API

This is a RESTful API where you can add your training, you can also register a webhook getting notified when your friends made a new run.

### Get started production
```console
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh prod
docker-compose up -d
```
  
### Get started development
```console
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh dev
docker-compose up
```

`creatConfigs.sh` will generate a `.env` file with random credentials in production and easy to type in development. In development it will start node with `nodemon`.
The start-script will also generate a SSH key to sign/decode your JWT.

## Validate incoming webhooks
If you want to validate the incoming webhook and verify that there was no tampering with a man in the middle attack, you can use this snippet.  
Use the key provided when registering the hook and set in an `.env` file.
```JavaScript
const crypto = require('crypto')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())

const createComparisionSignature = (body, key) => {
  const hmac = crypto.createHmac('sha1', key)
  const self_signature = hmac.update(JSON.stringify(body)).digest('hex')
  return `sha1=${self_signature}`
}

const compareSignatures = (signature, comparisonSignature) => {
  const source = Buffer.from(signature)
  const comparison = Buffer.from(comparisonSignature)
  return crypto.timingSafeEqual(source, comparison) // constant time comparison
}

app.post('/webHook', (req, res) => {
  signature = req.headers['x-hub-signature']
  const controll = createComparisionSignature(req.body, process.env.KEY)
  console.log(`Webhook is valid: ${compareSignatures(signature, controll)}`)
})

app.listen(3000)
```
