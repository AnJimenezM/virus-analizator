import  { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Global } from '../global/Global';
import { createContext } from 'react';



//Crea un contexto de autenticacion
const AuthContext = createContext();

//Definir el componente proveedor de contexto AuthProvider
export const AuthProvider = ({children}) => {

//Estado local para guardar la informacion del usuario  y verificar si esta autenticado
   const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

   // La primera vez que ejecutemos el AuthProvider comprobamos el token

   useEffect(()=>{
    authUser();
   }, []);

   const authUser = async () =>{
    //Obtener los datos del usuario autenticado del localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    
    // Comprobar si existe el token o el usuario
    if(!token || !user){
      setLoading(false);
      return false;
    }

    //Transformar los datos 

    const userObj = JSON.parse(user);
    const userId = userObj.id;

   
  

    //Peticion al backend que permita comprobar el token y que nos devuelva todo los datos del usuario

    const request = await fetch(Global.url + "user/profile/" + userId,{
      method: "GET",
      headers:{
        "Content-type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    //Setear a variable de estado auth
    setAuth(data.user);

   }
    //Renderizar el proveedor de contexto con el contexto AuthContext.provider
  return (
   <AuthContext.Provider value={{
    auth, 
    setAuth,
    loading
    }}
    >
    {children} {/* Renderiza los componentes hijos envueltos por el proveedor */}
   </AuthContext.Provider>
  )
}
//Definir propTypes para el componente AuthProvider
AuthProvider.propTypes ={
    children: propTypes.node.isRequired //children debe ser un nodo React y es requerido
};

export default AuthContext;
