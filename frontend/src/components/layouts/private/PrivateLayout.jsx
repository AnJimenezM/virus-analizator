import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { HeaderPriv } from './HeaderPriv'
import useAuth from '../../../hooks/useAuth'


export const PrivateLayout = () => {
  const {auth, loading} = useAuth();
  if(loading){

    return (
      <>
      {/*Menu de navegacion principal*/}
      <HeaderPriv/>
      {/*Contenido principal*/}
      <section className='layout__content'>
        {auth._id ?
        <Outlet/> 
      :
      <Navigate to='/Login'/>}
      
      
      </section>
   
      </>
    )
   
  } 
   
  
}
