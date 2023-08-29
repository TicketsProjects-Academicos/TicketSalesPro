import { Navbar, Dropdown, Avatar, Button } from "flowbite-react"
import Login from "../Login/Login"
import { DarkThemeToggle } from "flowbite-react"
import { useState , useEffect} from "react"

import LogoTickets from "../../assets/LogoTickets.png"

const NavBar = ({ autotoken }) => {

    

    const handleLogout = (e) => {
        
        console.log("Cerrando sesion")
        localStorage.clear();
        window.location.reload();
    }




    return (
        <div>
            <div className="bg-slate-900">
                <Navbar
                    fluid
                // rounded
                >
                    <Navbar.Brand href="https://flowbite-react.com">
                        <img
                            alt="Logo"
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src={LogoTickets}
                        />
                        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            TicketsProx
                        </span> */}
                    </Navbar.Brand>

                    <div className="flex md:order-2">

                        <Dropdown
                            inline
                            label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {localStorage.getItem("name")}  {localStorage.getItem("Apellido")} 
                              
                  
                                </span>
                                {/* <span className="block truncate text-sm font-medium">
                                {  localStorage.getItem("email")}
                                </span> */}
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <button onClick={handleLogout}><a href="/">Sign out</a> </button>
                               
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <DarkThemeToggle />
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link
                            active
                            href="/"
                        >
                            <p>
                                Home
                            </p>
                        </Navbar.Link>
                        <Navbar.Link href="/eventos">
                            Eventos
                        </Navbar.Link>
                        <Navbar.Link href="/contacto">
                            Contact
                        </Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        </div>
    )
}

export default NavBar