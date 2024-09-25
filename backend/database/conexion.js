import {connect} from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connection = async()=>{
    try {
        await connect(process.env.MONGODB_URI);
        console.log("conectado correctamente a la base de datos de MONGODB")
    } catch (error) {
        console.error('error en la conexion', error)
        throw new Error("No se ha podido realizar la conexion a la base de datos")
    }
}


export default connection;