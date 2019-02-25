# RESTFul API


Get started production
```
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh prod
docker-compose up -d
```
  
Get started development
```
git clone git@github.com:1dv527/el223nc-examination-2.git
chmod +x ./createConfigs.sh && ./createConfigs.sh dev
docker-compose up
```

`creatConfigs.sh` will generate a `.env` file with random credentials in production and easy to type in development. In development it will start node with nodemon.
The file will also generate a ssh key to sign/decode your JWT.
