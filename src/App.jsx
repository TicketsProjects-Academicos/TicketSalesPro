import { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';

import { Flowbite } from 'flowbite-react';


import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import SignIn from './Components/SignIn/SignIn'
import Eventos from './Components/Eventos/Eventos'
import Contacto from './Components/Contacto/Contacto';
import CompraTickets from './Components/CompraTickets/Tickets';
function App() {

  const [autotoken, setAutotoken] = useState(false);

  const [OpenLogin, setOpenLogin] = useState(false);

  const [eventList, setEventList] = useState([]);
  const [seccionlist, setseccionlist] = useState([]);
  const [asientolist, setAsientolist] = useState([]);
  const [clientelist, setClientelist] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        //Evento
        const respevent = await fetch('http://www.ticketsproxapia.somee.com/api/Eventos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const dataevent = await respevent.json();
        setEventList(dataevent);

        //Seccion
        const respseccionlist = await fetch('http://www.ticketsproxapia.somee.com/api/Secciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const dataseccion = await respseccionlist.json();
        setseccionlist(dataseccion);


        //Asientos
        const respasientolist = await fetch('http://www.ticketsproxapia.somee.com/api/Asientos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const dataasiento = await respasientolist.json();
        setAsientolist(dataasiento);

        //Clientes
        const respClientesList = await fetch("http://www.ticketsproxapia.somee.com/api/ClientesControllers", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const datacliente = await respClientesList.json();
        setClientelist(datacliente);


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Lista Act evento:', eventList);
    console.log('Lista Act Seccion:', seccionlist);
    console.log("Lista Act Asiento", asientolist)
    console.log("Lista de Act Clientes", clientelist)
  }, [eventList, seccionlist, asientolist, clientelist]);

  

  // useEffect(() => {
  //   window.location.reload();
  //   const storedToken = localStorage.getItem("Token");
    
  //   if (storedToken && autotoken === false) {
  //     setAutotoken(storedToken);
  //     console.log("Auto Token", storedToken);
  //   } else if (!storedToken && autotoken !== false) {
  //     setAutotoken(false);
  //   }
  // }, [autotoken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    console.log("Useffect autotoken app")
    if (storedToken && autotoken === false) {
      setAutotoken(storedToken);
      console.log("Auto Token", storedToken);
    } else if (!storedToken && autotoken !== false) {
      setAutotoken(false);
    }
  }, [autotoken]);
  
  

  if (autotoken) {

    return (
      <Flowbite>
        <div className=''>
          <Router>
            <header>
              <NavBar autotoken={autotoken}  />
            </header>
            <main>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/eventos' element={<Eventos eventList={eventList} />} />
                <Route exact path='/contacto' element={<Contacto />} />
                <Route exact path='/compra' element={<CompraTickets eventList={eventList} seccionlist={seccionlist} asientolist={asientolist} />} />
              </Routes>
            </main>
          </Router>
        </div>
      </Flowbite>
    )
  } else {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login clientelist={clientelist} />} />
            <Route exact path='/signin' element={<SignIn />} />
          </Routes>
        </Router>
      </div>
    )
  }





}

export default App
