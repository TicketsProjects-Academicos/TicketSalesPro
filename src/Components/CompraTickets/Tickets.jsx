import React, { useState, useEffect } from 'react';
import Eventos1 from "../../Eventos_1.jpg"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { Button, Card, Checkbox, Label, TextInput, Dropdown, Select } from 'flowbite-react';
import { useQuery } from '../../Hooks/useQuery';
import Alert from '../Modal/AlertTrue';
import AlertFalse from '../Modal/AlertFalse';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const CompraTickets = ({ eventList, seccionlist, asientolist }) => {


    const [evento, setevento] = useState(null);
    const [selectedSeccion, setSelectedSeccion] = useState('');
    const [Precio, setPrecio] = useState(0.0);
    const [AsientoSelect, setAsientoSelect] = useState([]);
    const [idseccion, setIdseccion] = useState(0);

    const [nombreCliente, setNombreCliente] = useState(localStorage.getItem("name"));


    const [precioBase, setPrecioBase] = useState(0.0);
    const [precioTotal, setPrecioTotal] = useState(0.0);

    const [cantidadAsientosSeleccionados, setCantidadAsientosSeleccionados] = useState(0);
    const [facturasGeneradas, setFacturasGeneradas] = useState([]);


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

            if (selectedAsientos.length <= 5) {
                setSelectedAsientos([...selectedAsientos, asiento]);
                setCantidadAsientosSeleccionados(selectedAsientos.length + 1);
                setstateselecasiento(false)
                console.log("POR Asiento");
                console.log(asiento)
                console.log("Por conjunto de asientos")
                console.log(selectedAsientos)
            } else {
                setstateselecasiento(true)
                console.log("Solo se puede seleccinar maximo 6 asiento");
            }


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



    const handlecompra = async () => {

        console.log("Compra de tickets asiento selecionado antes del useeffect")
        console.log(selectedAsientos)

        selectedAsientos.forEach((asientoput) => {
            console.log("ASIENTO en actualizacion")
            asientoput.reservado = true;

        })
        console.log("ASIENTOS ACTUALIZADO")
        console.log(selectedAsientos)
        handleconfir()
        setState(true)
        await generateInvoicePDF();

    }

    useEffect(() => {
        console.log(selectedAsientos)

    }, [selectedAsientos, AsientoSelect])

    const handleconfir = () => {
        console.log("ASIENTOS LISTO PARA COMPRAR KLKKKKKKK")
        console.log(selectedAsientos)
        selectedAsientos.forEach((asientoupdate) => {
            if (asientoupdate.reservado == true && stateselecasiento == false) {
                console.log("Asiento por asiento listo para comprar")
                console.log(asientoupdate)
                const nombre = localStorage.getItem("name")
                // postData(nombre, asientoupdate.numero)
                // updateData(asientoupdate.id, asientoupdate)





            }
        })


    }



    const [state, setState] = useState(false);
    const [stateselecasiento, setstateselecasiento] = useState(false);


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
                console.log(response.ok)

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
                console.log(response.ok);

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


    const generateInvoicePDF = async () => {

        const sectionToCapture = document.getElementById('tickets-section');
        const originalWidth = sectionToCapture.style.width;
        const originalHeight = sectionToCapture.style.height;


        sectionToCapture.style.width = '300px';
        sectionToCapture.style.height = '300px';

        const dataContainer = document.createElement('div');
        sectionToCapture.appendChild(dataContainer);

        try {
            const canvas = await html2canvas(sectionToCapture);
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'factura.png';
            link.href = image;
            link.click();
        } catch (error) {
            console.error('Error al generar la imagen:', error);
        } finally {
            sectionToCapture.style.width = originalWidth;
            sectionToCapture.style.height = originalHeight;
            sectionToCapture.removeChild(dataContainer);
        }



        // const sectionToCapture = document.getElementById('tickets-section');
        // const dataContainer = document.createElement('div');
        // sectionToCapture.appendChild(dataContainer);

        // try {
        //     const canvas = await html2canvas(sectionToCapture);
        //     const image = canvas.toDataURL('image/png');

        //     const pdf = new jsPDF();

        //     pdf.addImage(image, 'PNG', 10, 10, 190, 100);
        //     pdf.save('factura.pdf');
        //     sectionToCapture.removeChild(dataContainer);
        // } catch (error) {
        //     console.error('Error al generar la factura:', error);
        // }
    };



    function generarCodigo() {
        const caracteresValidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';

        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * caracteresValidos.length);
            codigo += caracteresValidos.charAt(randomIndex);
        }




        return codigo;
    }


    return (
        <div className="grid grid-cols-4 gap-4" >
            <div>
                <div className='w-[20rem] pl-12 pt-12'>
                    {/*Card */}

                    <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={evento.image}
                                alt={evento.image}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between ml-4">
                            <div className="">
                                <h3 className="text-xl font-bold text-gray-900 ">
                                    <span >
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {evento.nombreEvento}
                                    </span>
                                </h3>

                                <div className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <div>
                                        <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                                    </div>
                                    <span className="pl-2">
                                        {evento.fechaEvento instanceof Date
                                            ? `${event.fechaEvento.getDate()}/${evento.fechaEvento.getMonth() + 1}/${evento.fechaEvento.getFullYear()}`
                                            : new Date(evento.fechaEvento).toLocaleDateString("es-ES")}

                                    </span>
                                </div>


                                <p className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <span>
                                        <MdLocationOn size={16} style={{ verticalAlign: "middle" }} />
                                    </span>
                                    <span className="pl-2">
                                        {evento.lugarEvento}
                                    </span>
                                </p>


                            </div>

                        </div>
                    </div>


                    {/* <Card

                        imgSrc={evento.image}
                    >
                        <p className="text-base text-black dark:text-gray-400" >
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

                    </Card> */}
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

                                            <option value={""}  >SELECCIONE UNA SECCIÓN</option>


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
                            <Button onClick={generateInvoicePDF} className='w-[10rem]'>
                                Generar Factura
                            </Button>

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
                                    asiento.reservado == false &&
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

            {state == true && (
                <div>





                    {selectedAsientos.map((asientOName, index) => (
                        <div key={index}>
                            <Factura
                                evento={evento.nombreEvento}
                                lugar={evento.lugarEvento}
                                fecha={evento.fechaEvento instanceof Date
                                    ? `${evento.fechaEvento.getDate()}/${evento.fechaEvento.getMonth() + 1}/${evento.fechaEvento.getFullYear()}`
                                    : new Date(evento.fechaEvento).toLocaleDateString("es-ES")}
                                nombreCliente={nombreCliente}
                                codigoGenerado={generarCodigo()}
                                nombreAsiento={asientOName.numero}
                                nombreSeccion={selectedSeccion}
                                precio={precioBase}
                            /></div>
                    ))}
                </div>
            )}




            {state === true && (<Alert />)}
            {stateselecasiento === true && (<AlertFalse />)}
        </div>



    );
};



export default CompraTickets;




const Factura = ({ evento, lugar, fecha, nombreCliente, codigoGenerado, nombreAsiento, nombreSeccion, precio }) => {
    return (
        <div id="tickets-section">


            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ marginBottom: '10px' }}>Factura</h2>
                <p><strong>Nombre del evento:</strong> {evento}</p>
                <p><strong>Lugar:</strong> {lugar}</p>
                <p><strong>Fecha del evento:</strong> {fecha}</p>
                <p><strong>Nombre del cliente:</strong> {nombreCliente}</p>
                <p><strong>Código generado:</strong> {codigoGenerado}</p>
                <p><strong>Nombre del asiento:</strong> {nombreAsiento}</p>
                <p><strong>Nombre de la sección:</strong> {nombreSeccion}</p>
                <p><strong>Precio de la boleta:</strong> {precio}</p>
            </div></div>
    )
}



