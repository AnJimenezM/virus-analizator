
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../components/layouts/public/Home'
import { About } from '../components/layouts/public/About'
import { Register } from '../components/users/Register'
import { Login } from '../components/users/Login'
import {AuthProvider} from '../context/AuthProvider'
import { PublicLayout } from '../components/layouts/public/PublicLayout'
import { Sidebar } from '../components/layouts/private/Sidebar'
import { AboutPriv } from '../components/layouts/private/AboutPriv'
import { PrivateLayout } from '../components/layouts/private/PrivateLayout'
import { Logout } from '../components/users/Logout'
import { Config } from '../components/users/Config'





export const BrowserNavigation = () => {
 
  return (
    <Router>
      <AuthProvider>
        <Routes>
            
            <Route  path='/' element={<PublicLayout/>}>
            <Route index element={<Home/>}/>
            <Route  path='/Home' index element={<Home/>}/>
            <Route  path='/Acerca-de' index element={<About/>}></Route>
            <Route  path='/Login' index element={<Login/>}></Route>
            <Route  path='/Registro' index element={<Register/>}></Route>
            
            </Route>
            
           
           
            {/* rutas privada*/}
         
         <Route path='/perfil' element={<PrivateLayout/>}>
         
         <Route index element={<Sidebar/>}/>
         <Route path='Acerca-de' element={<AboutPriv/>}/>
         <Route path='logout' element={<Logout/>}/>
            <Route path='ajustes' element={<Config/>}/>
         </Route>
          
          
         
          
        
           
           
        </Routes>
    </AuthProvider>
    </Router>
   
  )

}
