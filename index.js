const express = require('express');
const bodyParser = require('body-parser')
const swaggerUi  = require('swagger-ui-express')

const {dbConnection} = require('./config/dbConnection');
const ENV            = require('./config/enviroVarible.json');
const userRoute      = require('./Route/user.route');
const swaggerDoc     = require('./config/swagger.json')

const options = {
    swaggerOptions: {
      authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
  };
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/users',userRoute);
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDoc,options))

app.listen(ENV.serverPort,error=>{
    if(!error) {
        console.log('Server Listens on 4000 Port');
    }else{
        console.log('Server Failds to Listen on 4000 port')
    }
})