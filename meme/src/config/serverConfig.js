const dotenv = require('dotenv');

if(process.env.NODE_ENV !== "prod"){
    const serverConfigFile = `./.env.${process.env.NODE_ENV}`
    dotenv.config({path:serverConfigFile})
}else{
    dotenv.config()
}

module.exports = {
    PORT : process.env.PORT
}

