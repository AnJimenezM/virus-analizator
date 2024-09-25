import { useState } from 'react'
import { userForm } from '../../hooks/userForm'
import { Global } from '../../global/Global';
import useAuth from '../../hooks/useAuth';


export const Login = () => {

  //Estado para obtener los datos desde el formulario
  const {form, changed, resetForm} = userForm({email: "", password: ""});
  
  //Estado para validar si el usuario se identifico correctamente
  const [logged, setLogged] = useState("not logged");

  // Estado para setear los valores del token y usuario en el contexto de la aplicación
  const { setAuth } = useAuth();


  const loginUser = async (e) =>{
    //Prevenir que se actualice el navegador
    e.preventDefault();


    //Obtener datos del formulario

    let userToLogin = form;
    

    //Peticion al backend
  
      
    
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers:{
        "Content-Type": "application/json"
      }
    });
   
    // Obtener la informacion retornada por la request

    const data = await request.json();

    if(data.status == "success"){

      
      //Guardar los datos del token y usuario en el localstorage del navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      //Seteamos la variable de estado logged si no se ha atenticado
      setLogged("logged");

       // Seteamos los datos del usuario en el Auth
       setAuth(data.user);

       // Limpiar el formulario
      resetForm();
 
       // Redirección
       setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else{
      //Seteamos la variable de estado logged si el usuario no se ha autenticado correctamente
      setLogged("error");
    }

   
  };

  return (
    /* Creacion del componente de Login*/
<>
    <div>
       {/* Mensajes para el usuario */}
       {logged == "logged"? (
            <strong className='alert alert-success'>!Usuario autenticado correctamente</strong>
          ) :''}

          {logged == "error"? (
            <strong className='alert alert-danger'>!El usuario no se ha autenticado correctamente</strong>
          ) :''}
         <div className='formulario'>
          
      <h1 className='title-login'>Iniciar sesion</h1>
      
    <form className='Login' onSubmit={loginUser}>
      
      <label> ingresa email</label>
        <input type="email" placeholder='email' name='email' required onChange={changed}/>
        <label> ingresa contraseña</label>
        <input type="password" placeholder='password' name='password' required onChange={changed}/>
        <button className='ingreso'>Iniciar sesion</button>
        <p >si no tienes cuenta? <a className='navegation-r' href="/Registro">registrate aqui</a></p>
    </form>
   </div>
    </div>
    </>
  )
}
