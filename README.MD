# RESTFul API

This is a RESTful API where you can add your training, you can also register a webhook getting notified when your friends made a new run.

Get started production
```bash
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh prod
docker-compose up -d
```
  
Get started development
```bash
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh dev
docker-compose up
```

`creatConfigs.sh` will generate a `.env` file with random credentials in production and easy to type in development. In development it will start node with nodemon.
The file will also generate a ssh key to sign/decode your JWT.
