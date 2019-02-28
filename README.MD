# RESTFul API

This is a RESTful API where you can add your training, you can also register a webhook getting notified when your friends made a new run.

## Prerequisites
* docker
* docker-compose

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
The start-script will also generate a SSH key to sign/verify JWT.

You can find the server running here [https://api.gosemojs.org](https://api.gosemojs.org)
## Root of the application explaining how to use it.
```json
{
  "meta": {
    "title": "RESTful API for saving your training exercises",
    "license": "MIT",
    "author": "Emil Larsson",
    "desc": "JWT for authentication, login save your token. Set token in headers as authorization"
  },
  "links": {
    "self": {
      "href": "https://api.gosemojs.org/",
      "method": "GET",
      "desc": "Root: This url"
    },
    "users": {
      "register": {
        "href": "https://api.gosemojs.org/users",
        "method": "POST",
        "desc": "Register user: username, password, email in body as JSON"
      },
      "login": {
        "href": "https://api.gosemojs.org/users/login",
        "method": "POST",
        "desc": "Login: username, password in body as JSON"
      },
      "view": {
        "href": "https://api.gosemojs.org/users",
        "method": "GET",
        "authentication": "true",
        "desc": "View registered user"
      },
      "delete": {
        "href": "https://api.gosemojs.org/users",
        "method": "DELETE",
        "authentication": "true",
        "desc": "Delete user"
      }
    },
    "training": {
      "view": {
        "href": "https://api.gosemojs.org/training?start=0&offset=20",
        "method": "GET",
        "authentication": "true",
        "desc": "Get training - You will get a nextURL for more data and you can change start and offset if you like."
      },
      "add": {
        "href": "https://api.gosemojs.org/training",
        "method": "POST",
        "authentication": "true",
        "desc": "Add training: type, length, startTime, endTime, comment in body as JSON"
      },
      "delete": {
        "href": "https://api.gosemojs.org/training",
        "method": "DELETE",
        "authentication": "true",
        "desc": "Delete training: id in body as JSON"
      },
      "update": {
        "href": "https://api.gosemojs.org/training",
        "method": "PUT",
        "authentication": "true",
        "desc": "Update training: id, type, length, startTime, endTime, comment in body as JSON. ID is required the other fields is optional"
      }
    },
    "hooks": {
      "view": {
        "href": "https://api.gosemojs.org/hooks",
        "method": "GET",
        "authentication": "true",
        "desc": "Get registered hooks"
      },
      "add": {
        "href": "https://api.gosemojs.org/hooks",
        "method": "POST",
        "authentication": "true",
        "desc": "Add hook: url in body as JSON"
      },
      "delete": {
        "href": "https://api.gosemojs.org/hooks",
        "method": "DELETE",
        "authentication": "true",
        "desc": "Delete hook: id in body as JSON"
      }
    }
  }
}
```

### Report
#### Explain and defend your implementation of HATEOAS in your solution.
The root of the application show all routes available and explain how to use them. I use JOI as a middleware providing information when the user of the API is doing something wrong.
  
#### If your solution should implement multiple representations of the resources. How would you do it?
Check the headers of the incoming request, `Accept:` if it's either JSON or XML and then send it to the user.
Or I can have a specifik tag in the URI telling the server what response it want, but that is problably not the solution I would have picked. A nice URI is a nice URI.
  
#### Motivate and defend your authentication solution.
For startes using JWT was required in this assignment. But I problably would have picked it anyways because I think it's a really good solution. The downside of JWT is that there is no good way too block JWT ones it's already created. One solution is too set the timeout of the JWT to a quite short time. Another solution is to have a blacklist of JWT, worst case scenario change the JWT secret and restart the server.
  
Other solutions for authentication is OAuth, or maybee let the user send in username/password everytime. When the user login returning a secret and use that for authentication.
  
#### Explain how your web hook works.
A loggedin user post to `https://api.gosemojs.org/hooks` providing the URI in body as JSON. My server make a request to the URI. If the server responds add it to the database and generate a random key and send it back to the user.
  
When a user add some training the server get all registered hooks from the database, making a hash with the key/body and add it to the header. Then making all the ajax calls to the different URIs.
  
#### Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. Write your down thoughts about this.
Error handling, Now every route send errors and if I want to change something I have to remember all 30 places I did something. I belive that a much better solution is to throw an error and let some code pick it up and return JSON and the right statuscode to the user. I could not get it to work the way I wanted with restify.
    
I guess it is the same with a correct request that it would have been much better sending it through a view or something.
#### Did you do something extra besides the fundamental requirements? Explain them.
The setup of the system is quite easy. I provide a bash-script genereating `.env` with easy passwords in development and random in production. The script also create ssh keys for signing/verifying JWTs. I also have a entrypoint script for starting Node to start it with nodemon in development and without in production.
  
I learned how to make a subdomain `api.gosemojs.org` I already owned `gosemojs.org` and I wanted to learn how to make a subdomain and give it a cerfiticate from letsencrypt.
  
I belive my REST API is kind of userfriendly because I use JOI as a middleware giving the user a lot of information about what I expect the user to send in and in what way I want the information.
  
When the user get the webhook I implemented the same system as Github veriyfing that the hook was sent from the server and nothing else. An example of how to use it below.
  
## Validate incoming webhooks
If you want to validate the incoming webhook and verify that there was no tampering, use this snippet. Use the key provided when registering the hook and set the value in a `.env` file.
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
