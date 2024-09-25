import React from 'react'
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../global/Global";
import avatar from '../../assets/images/default_user.png'
import { SerializeForm } from "../../global/SerializeForm";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const Config = () => {
    // Se recibe la información desde el Contexto a través del hook useAuth
  const { auth, setAuth } = useAuth();

  // Estado para mostrar resultado del registro del user
  const [saved, setSaved] = useState("not_saved");

  // Hook para redirigir
  const navigate = useNavigate();

  // Función para actualizar el usuario
  const updateUser = async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Variable para almacenar el token para las peticiones a realizar en este componente
    const token = localStorage.getItem("token");

    // Obtener los datos del formulario
    let newDataUser = SerializeForm(e.target);

    // Borrar file0 porque no lo vamos a actualizar por acá
    delete newDataUser.file0;

    try {
      // Actualizar el usuario modificado en la BD con una petición Ajax
      const userUpdateResponse = await fetch(`${Global.url}user/update`, {
        method: "PUT",
        body: JSON.stringify(newDataUser),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      // Obtener la información retornada por la request
      const userData = await userUpdateResponse.json();

      if (userData?.status === "success" && userData.user) {

        // Eliminar del objeto recibido la contraseña
        delete userData.user.password;

        // Actualizar en el Contexto los datos del usuario modificado
        setAuth(userData.user);
        setSaved("saved");

        // Seleccionar el elemento del formulario donde se va a subir el archivo del avatar
        const fileInput = document.querySelector("#file0");
        if (fileInput.files[0]) {
          await uploadAvatar(fileInput.files[0], token);
        }

        // Mostrar modal de éxito con el mensaje del backend o un mensaje por defecto
        const successMessage = userData?.message || '¡Usuario actualizado correctamente!';

        Swal.fire({
          title: successMessage,
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => {
          // Redirigir después de cerrar el modal
          navigate('/perfil');
        });

      } else {
        setSaved("error");

        // Mostrar modal de error con el mensaje del backend o un mensaje por defecto
        const errorMessage = userData?.message || '¡El usuario no se ha actualizado!';

        // Mostrar modal de error
        Swal.fire({
          title: errorMessage,
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente',
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setSaved("error");

      // Mostrar modal de error con el mensaje del backend o un mensaje por defecto
      const errorMessage = error.response?.data?.message || '¡Error al actualizar el usuario!';

      // Mostrar modal de error
      Swal.fire({
        title: errorMessage,
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    }
  }

  // Función para actualizar el avatar del usuario
  const uploadAvatar = async (file, token) => {
    try {
      // Obtener el archivo a subir
      const formData = new FormData();
      formData.append('file0', file);

      // Petición para enviar el archivo a la api del Backend y guardarla
      const uploadResponse = await fetch(`${Global.url}user/upload-avatar`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      // Obtener la información retornada por la request
      const uploadData = await uploadResponse.json();

      if (uploadData.status === "success" && uploadData.user) {

        // Eliminar del objeto recibido la contraseña
        delete uploadData.user.password;

        // Actualizar en el Contexto los datos del usuario modificado
        setAuth(uploadData.user);
        setSaved("saved");
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setSaved("error");

      // Mostrar modal de error con el mensaje del backend o un mensaje por defecto
      const errorMessage = error.response?.data?.message || '¡Error al subir el avatar!';

      Swal.fire({
        title: errorMessage,
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    }
  }

  return (
    <>
    <header className="content__header content__header--public">
      <h1 className="profile-text">Editar Usuario</h1>
    </header>
    {saved === "saved" ? (
            <strong className="alert alert-success">¡Usuario actualizado correctamente!</strong>
          ) : ''}

          {saved === "error" ? (
            <strong className="alert alert-danger">¡El usuario no se ha actualizado!</strong>
          ) : ''}
   
        <form className="form-config" onSubmit={updateUser}>

          <div className="form-group">
            <label htmlFor="name">Nombres</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="given-name"
              defaultValue={auth.first_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Apellidos</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              autoComplete="family-name"
              defaultValue={auth.last_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="username"
              defaultValue={auth.username}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              defaultValue={auth.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
            />
          </div>

          <div className="formulario-edit">
            <label id='avatar' htmlFor="file0">Avatar</label>
            <div className="avatar">
              <div className="general-info__container-avatar">
                {auth.image !== "default_user.png" ? (
                  <img src={`${Global.url}user/avatar/${auth.image}`} className="container-avatar__img" alt="Foto de perfil" />
                ) : (
                  <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                )}
              </div>
            </div>
            <br/>
            <input className='submit-image' type="file" name="file0" id="file0" autoComplete="file0"/>
          </div>
          <input type="submit" value="Editar" className="btn btn-success submit-edit" />

        </form>
  </>
  )
}
