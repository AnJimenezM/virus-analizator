import { useState } from 'react';
import {userForm} from '../../hooks/userForm'
import {useNavigate} from 'react-router-dom'
import {Global} from '../../global/Global'
import Swal from 'sweetalert2'

export const Register = () => {
// Usamos el hook personalizado useForm para cargar los datos del formulario
  const {form, changed} = userForm({});
// Estado para mostrar resultado del registro del user

const [saved, setSaved] = useState("not sended");

//hook para redirigir

const navigate = useNavigate();

//Guardar usuario en la base de datos 

const saveUser = async (e) =>{
  //prevenir que se actualice la pantalla
  e.preventDefault();

  //Obtener los datos del formulario 
  let newUser = form;
  console.log("datos del nuevo usuario:", newUser)

  //Peticion a la API  del backend para guardar usuario en la Base de datos
  const request = await fetch(Global.url + "user/register", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers:{
      "content-Type": "application/json"
    }
  });

  //Obtener la informacion retornada por la respuesta 

  const data = await request.json();
  console.log("respuesta del backend", data)

  //Verificar si el estado de la respuesta del backend es "created" seteamos la variable saved con "saved" y si no, le asignamos 

  if(request.status === 201 && data.status === "created"){
    setSaved("saved");

    //Mostrar modal de exito
    Swal.fire({
      title: data.message || "usuario registrado correctamente",
      icon: "success",
      confirmButtonText: "continuar",
    }).then(()=>{
      //Redirigir despues de cerrar el modal
      navigate("/Login");
    });
  } else{
    setSaved("error");

    //Mostrar modal de error 

    Swal.fire({
      title: data.message || "¡Error en el registro!",
      icon: 'error',
      confirmButtonText: 'Intentar nuevamente'
    });
  }
};
  return (
    <>
    <div>
      <div className='formulario-register'>
        <h2 className='title-register'>Registrarse</h2>
          
        <form id="register" className='Login' onSubmit={saveUser}>
           {/* Respuestas de usuario registrado*/}
           {saved == "saved" ?(
            <strong className='alert alert-success'>¡Usuario registrado</strong>
          ): ''}
          {saved == "error" ?(
            <strong className='alert alert-danger'>¡Usuario no registrado correctamente</strong>
          ): ''}
          <label htmlFor='username'>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            placeholder='Ingresa nombre de usuario' required onChange={changed} />

          <label htmlFor='first_name'>Nombre</label>
          <input
            type="text"
            name="first_name"
            placeholder='Ingresa nombre' required onChange={changed} />
      
          <label htmlFor='last_name'>Apellidos</label>
          <input
            type="text"
            name="last_name"
            placeholder='Ingresa apellidos' required onChange={changed} />
 
          
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            name="email"
            placeholder='Ingresa email' required onChange={changed} />
          <label htmlFor='password'>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder='Ingresa la contraseña' required onChange={changed} />
          
          
          <button className="btn btn-primary register" value="Registrarse" type="submit ">Registrarse</button>
          
          <p className='text-center'>Si ya tienes cuenta ingrese <a className='click-login' href="/Login">aquí</a></p>
          <a className='text-center back' href="/">Volver</a>
        </form>
      </div>
    </div>
  </>
  );
};

