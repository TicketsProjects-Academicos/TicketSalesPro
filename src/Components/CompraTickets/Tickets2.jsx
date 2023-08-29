import React, { useState, useEffect } from 'react';
import Eventos1 from "../../Eventos_1.jpg"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { Button, Card, Checkbox, Label, TextInput, Dropdown, Select } from 'flowbite-react';
import { useQuery } from '../../Hooks/useQuery';
import Alert from '../Modal/AlertTrue';
import AlertFalse from '../Modal/AlertFalse';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useDispatch, useSelector } from "react-redux";
import { fetchList } from '../../Redux/eventos/functions';
import { fetchListSeccion } from '../../Redux/Seccion/FunctionsSeccion';



const ShoppingTickets = () => {

    const dispatch = useDispatch()

    const eventlist = useSelector(state => state.Eventos.eventosList)

    //Variables Informacion del evento en mostrar en el card
    const [Event, setEvent] = useState(null)
    const query = useQuery()
    const search = query.get("search")

    useEffect(() => {
        dispatch(fetchList())
        const data = eventlist.find((d) => d.idEventos == search)
        console.log(eventlist)
        console.log(search)
        console.log(data)
        if (data) {
            dispatch(fetchListSeccion(data.idEventos))
            setEvent(data)
        }
    }, [search, eventlist])

    useEffect(() => {

    })


    const [SelectedSeccion, setSelectedSeccion] = useState('')
    const HandleSelectChange = (event) => {
        const selectedSecccion = event.target.value
        setSelectedSeccion(selectedSecccion)
    }





    //Evaluar si el evento es nulo y no mostra nada!
    if (!Event) {
        return null
    }

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Evento</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gapx-8 ">

                    <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={Event.image}
                                alt=""
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between ml-4">
                            <div className="">
                                <h3 className="text-xl font-bold text-gray-900 ">
                                    <span >
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {Event.nombreEvento}
                                    </span>
                                </h3>

                                <div className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <div>
                                        <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                                    </div>
                                    <span className="pl-2">
                                    
                                        {Event.fechaEvento instanceof Date
                                            ? `${Event.fechaEvento.getDate()}/${Event.fechaEvento.getMonth() + 1}/${Event.fechaEvento.getFullYear()}`
                                            : new Date(Event.fechaEvento).toLocaleDateString("es-ES")}

                                    </span>
                                </div>


                                <p className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <span>
                                        <MdLocationOn size={16} style={{ verticalAlign: "middle" }} />
                                    </span>
                                    <span className="pl-2">
                                        {Event.lugarEvento}
                                    </span>
                                </p>


                            </div>

                        </div>
                    </div>
                    {/*-------------------------------- */}
                   
                    {/* <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          
                          
                          
                            <h3>Selecion de tickets</h3>
                            <div className='max-w-md' id='select'>
                                <div className='mb-2 block'>
                                    <Label htmlFor='section' value='Select your seccion'></Label>
                                </div>

                                <Select
                                    id="secciones"
                                    required
                                    onChange={(event) => HandleSelectChange(event)}
                                >

                                    <option value={""}  >SELECCIONE UNA SECCIÓN</option>


                                    {seccionlist.map((seccion, indexe) => (

                                        Event.idEventos === seccion.idEventos && (
                                            <option key={indexe} value={seccion.nombreSeccion}>{seccion.nombreSeccion}</option>
                                        )
                                    ))}

                                </Select>

                            </div>

                            <img
                                src={Event.image}
                                alt=""
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between ml-4">
                            <div className="">
                                <h3 className="text-xl font-bold text-gray-900 ">
                                    <span to={"/compra?search=" + event.idEventos}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        Nombre de evento
                                    </span>
                                </h3>

                                <div className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <div>
                                        <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                                    </div>
                                    <span className="pl-2">
                                        8/16/2023
                                        {event.fechaEvento instanceof Date
                                            ? `${event.fechaEvento.getDate()}/${event.fechaEvento.getMonth() + 1}/${event.fechaEvento.getFullYear()}`
                                            : new Date(event.fechaEvento).toLocaleDateString("es-ES")}

                                    </span>
                                </div>


                                <p className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <span>
                                        <MdLocationOn size={16} style={{ verticalAlign: "middle" }} />
                                    </span>
                                    <span className="pl-2">
                                        Lugar de evento
                                    </span>
                                </p>


                            </div>

                        </div>
                    </div> */}

                </div>

            </div>

        </div>
    )

}

export default ShoppingTickets