import { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Route, Routes, Navigate
} from 'react-router-dom';

import { Flowbite } from 'flowbite-react';

import { useDispatch, useSelector } from 'react-redux';


import NavBar from './Components/NavBar/NavBar'
import NavBars from './Components/NavBar/Navbars';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import SignIn from './Components/SignIn/SignIn'
import Eventos from './Components/Eventos/Eventos'
import Contacto from './Components/Contacto/Contacto';
import CompraTickets from './Components/CompraTickets/Tickets';
import ShoppingTickets from './Components/CompraTickets/Tickets2';




//New
import Events from './Components/Eventos/Events';
import Prueba from './Components/CompraTickets/Tickets_';
import { autoLogin } from './Redux/users/functionsUser';
import Logout from './Components/Logout/Logout';
// import Example from './Components/CompraTickets/Example';
import { History } from './Components/Historial/history';

import Example from './Components/CompraTickets/ClearCodigo';

function App() {

  const dispatch = useDispatch()


  const auth = useSelector(state => state.Users.authToken)

  useEffect(() => {
    dispatch(autoLogin())
  },[])

  
  



  if (!auth) {

    return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login  />} />
            <Route exact path='/signin' element={<SignIn />} />

          </Routes>
        </Router>
      </div>
    )

  } else {
    return (
      <Flowbite>
        <div className=''>
          <Router>
            <header>
              <NavBars />
            </header>
            <main>

              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/eventos' element={<Events />} />
                <Route exact path='/contacto' element={<Contacto />} />
                <Route exact path='/compra' element={<Example  />} />
                <Route exact path='/history' element={<History  />} />
                <Route exact path='/logout' element={<Logout/>}/>
                {/* <Route exact path='/prueba' element={<Prueba eventList={eventList} seccionlist={seccionlist} asientolist={asientolist} />} /> */}

              </Routes>
            </main>
          </Router>
        </div>
      </Flowbite>
    )

  }





}

export default App
