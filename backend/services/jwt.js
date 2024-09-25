import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv'
//Cargar variable de entorno desde .env

dotenv.config();
//Configuración del archivo .env
const secret = process.env.SECRET_KEY;

//Generar token
const createToken = (user) =>{
    const payload ={
        userId: user._id,
        name: user.name,
        //Fecha de emision
        iat: moment().unix(),
        exp: moment().add(365, 'days').unix()
    };

    //Devolver jwt_token codificado
    return jwt.encode(payload, secret);
};

export{
    secret,
    createToken
}