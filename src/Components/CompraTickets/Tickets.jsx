import React, { useState, useEffect } from 'react';
import Eventos1 from "../../Eventos_1.jpg"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { Button, Card, Checkbox, Label, TextInput, Dropdown, Select } from 'flowbite-react';

import { useQuery } from '../../Hooks/useQuery';


const CompraTickets = ({ eventList, seccionlist, asientolist }) => {


    const [evento, setevento] = useState(null);
    const [selectedSeccion, setSelectedSeccion] = useState('');
    const [Precio, setPrecio] = useState(0.0);
    const [AsientoSelect, setAsientoSelect] = useState([]);
    const [idseccion, setIdseccion] = useState(0);


    const [precioBase, setPrecioBase] = useState(0.0);
    const [precioTotal, setPrecioTotal] = useState(0.0);

    const query = useQuery();
    const search = query.get("search");

    useEffect(() => {

        const data = eventList.find((d) => d.idEventos == search);

        console.log(search)
        console.log("Aqui seccion list")
        console.log(seccionlist)
        console.log("Aqui Asiento list")
        console.log(asientolist)

        if (data) {
            setevento(data)
        }

    }, [search]);


    const [selectedAsientos, setSelectedAsientos] = useState([]);

    const handleCheckboxChange = (asiento) => {
        if (asiento.reservado) return;

        if (selectedAsientos.includes(asiento)) {
            setSelectedAsientos(selectedAsientos.filter((a) => a !== asiento));
        } else {

            setSelectedAsientos([...selectedAsientos, asiento]);
            console.log("POR Asiento");
            console.log(asiento)
            console.log("Por conjunto de asientos")
            console.log(selectedAsientos)
        }
    };

    useEffect(() => {
        const selectedCount = selectedAsientos.length;
        const totalPrice = selectedCount * precioBase;
        setPrecioTotal(totalPrice);
    }, [selectedAsientos, precioBase]);

    useEffect(() => {
        console.log("Asientos que pertenece a esa seccion actualizada")
        console.log(AsientoSelect);
    }, [AsientoSelect]);

    useEffect(() => {
        console.log("Asientos selecionado actualizado")
        console.log(selectedAsientos)
    }, [selectedAsientos]);


    const handleSelectChange = (event) => {

        const selectedSeccion = event.target.value;
        setSelectedSeccion(selectedSeccion);

        seccionlist.forEach((seccion) => {
            console.log("dentro de forech");
            if (seccion.nombreSeccion === selectedSeccion) {
                setPrecio(seccion.precio);
                setPrecioBase(seccion.precio);
                setIdseccion(seccion.idSecciones)

                const asientosFiltrados = asientolist.filter(
                    (asiento) => asiento.idSecciones === seccion.idSecciones
                );

                setAsientoSelect(asientosFiltrados);

                asientolist.forEach((asiento) => {
                    if (asiento.idSecciones === seccion.idSecciones) {
                        console.log("Asientos que pertenece a esa seccion")
                        console.log(asiento.numero)

                    }
                })
            }
        });


    };

    const [asientoreservado, setAsientoreservado] = useState([]);


    const handlecompra = () => {

        console.log("Compra de tickets asiento selecionado antes del useeffect")
        console.log(selectedAsientos)

        selectedAsientos.forEach((asientoput) => {
            console.log("ASIENTO en actualizacion")
            asientoput.reservado = true;

        })
        console.log("ASIENTOS ACTUALIZADO")
        console.log(selectedAsientos)
        handleconfir()
    }

    const handleconfir = () => {
        console.log("ASIENTOS LISTO PARA COMPRAR KLKKKKKKK")
        console.log(selectedAsientos)
        selectedAsientos.forEach((asientoupdate) => {
            if(asientoupdate.reservado == true){
                console.log("Asiento por asiento listo para comprar")
                console.log(asientoupdate)
               const nombre =  localStorage.getItem("name")
                postData(nombre, asientoupdate.numero)
                updateData(asientoupdate.id,asientoupdate )
            }
        })
    }


    const postData = async (cliente, asiento) => {
        const url = 'http://www.ticketsproxapia.somee.com/api/Reservas';
        const data = {
            id: 0,
            cliente: cliente,
            evento: evento.nombreEvento,
            seccion: selectedSeccion,
            asiento: asiento,
        };

        console.log("Data de reservacion")
        console.log(data)

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
              
                console.log(' exitoso');
               
            } else {
           
                console.log('Error en el post');
            }
        } catch (error) {
         
            console.error('Error durante la solicitud:', error);
        }
    };

    const updateData = async (id, asiento) => {
        const url = 'http://www.ticketsproxapia.somee.com/api/Asientos';


        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(asiento)
            });

            if (response.ok) {
                console.log('Actualización exitosa');

            } else {

                console.log('Error en la actualización');
            }
        } catch (error) {

            console.error('Error durante la solicitud:', error);
        }
    };








    if (!evento) {
        return null;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            <div>
                <div className='w-[20rem] pl-12 pt-12'>
                    <Card

                        imgSrc={evento.image}
                    >
                        <p className="text-base text-black dark:text-gray-400">
                            <p>
                                {evento.nombreEvento}
                            </p>
                        </p>

                        <div className="text-base text-black dark:text-gray-400 flex items-center">
                            <div>
                                <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                            </div>
                            <span className="pl-2">
                                {evento.fechaEvento instanceof Date
                                    ? `${evento.fechaEvento.getDate()}/${evento.fechaEvento.getMonth() + 1}/${evento.fechaEvento.getFullYear()}`
                                    : new Date(evento.fechaEvento).toLocaleDateString("es-ES")}
                            </span>
                        </div>
                        <p className="text-base text-black dark:text-gray-400 flex items-center">
                            <div>
                                <MdLocationOn size={16} style={{ verticalAlign: "middle" }} />
                            </div>
                            <span className="pl-2">
                                {evento.lugarEvento}
                            </span>
                        </p>

                    </Card>
                </div>
            </div>

            <div>
                <div className='w-[50rem] pl-12 pt-12'>


                    <Card>
                        <div className="flex flex-col gap-4">
                            <h4>Selecion de tickets</h4>
                            <div className="grid grid-cols-4 gap-4">
                                <div>

                                    <div
                                        className="max-w-md"
                                        id="select"
                                    >
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="countries"
                                                value="Select your seccion"
                                            />
                                        </div>


                                        <Select
                                            id="secciones"
                                            required
                                            onChange={(event) => handleSelectChange(event)}
                                        >

                                            <option value={""} disabled selected>SELECCIONE UNA SECCIÓN</option>


                                            {seccionlist.map((seccion, indexe) => (

                                                evento.idEventos === seccion.idEventos && (
                                                    <option key={indexe} value={seccion.nombreSeccion}>{seccion.nombreSeccion}</option>
                                                )
                                            ))}

                                        </Select>
                                    </div>
                                </div>

                                <div className='px-8'>
                                    <span>
                                        Precio
                                    </span>

                                    <p className='pt-4'>$ {precioTotal}</p>
                                </div>

                            </div>

                            <Button type="submit" onClick={handlecompra} className='w-[10rem]'>
                                Comprar
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <h2>Asientos</h2>
                        <div className="grid gap-x-8 gap-y-4 grid-cols-3">
                            {
                                AsientoSelect.map((asiento, index) => (
                                    <div
                                        key={index}
                                        className={`grid gap-x-8 gap-y-4 grid-cols-3 ${asiento.reservado ? 'text-red-500' : ''
                                            }`}
                                    >
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedAsientos.includes(asiento)}
                                                onChange={() => handleCheckboxChange(asiento)}
                                                disabled={asiento.reservado}
                                            />
                                            <span className="ml-2">{asiento.numero}</span>
                                        </label>
                                    </div>
                                ))
                            }

                        </div>
                    </Card>
                </div>
            </div>
        </div>

    );
};

export default CompraTickets;

