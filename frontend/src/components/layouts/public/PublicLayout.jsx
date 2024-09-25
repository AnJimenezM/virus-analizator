import React from 'react'
import { HeaderPub } from './HeaderPub'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export const PublicLayout = () => {

  const{auth} = useAuth();
  return (
    <>
    {/*Menu de navegacion principal*/}
    <HeaderPub/>
    {/*Contenido principal*/}
    <section className='layout__content'>
      {!auth._id ?
      <Outlet/> :
      <Navigate to='/perfil'/>}
    
    </section>
    </>
  )
}
