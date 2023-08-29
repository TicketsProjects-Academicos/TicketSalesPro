
import { useState, useEffect, Fragment, useRef } from 'react'
import { StarIcon, CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon, MapIcon, DocumentCheckIcon } from '@heroicons/react/20/solid'
import { RadioGroup, Listbox, Transition, Dialog } from '@headlessui/react'
import { Select, Label } from 'flowbite-react'
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from '../../Redux/eventos/functions';
import { fetchListSeccion } from '../../Redux/Seccion/FunctionsSeccion';
import { fetchListAsientos } from '../../Redux/Asientos/functionsAsientos'
import { useQuery } from '../../Hooks/useQuery';




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {

    const dispatch = useDispatch()

    const eventlist = useSelector(state => state.Eventos.eventosList)
    const seccionlist = useSelector(state => state.Seccion.seccionList)
    const asientolist = useSelector(state => state.Aientos.asientoList)
    const [idSeccionSelect, setidSeccionSelect] = useState('')
    const [nombreSeccion, setNombreSeccion] = useState('')
    const [AddedTickets, setAddedTickets] = useState([]);
    const [OpenFactura, setOpenFactura] = useState(false)
    const cancelButtonRefFactura = useRef(null)

    const [SaveChangeTickets, setSaveChangeTickets] = useState([])

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleOpeFactura = (e) => {
        e.preventDefault();
        setOpenFactura(true)
    }


    //Variables Informacion del evento en mostrar en el card
    const [Event, setEvent] = useState(null)
    const query = useQuery()
    const search = query.get("search")

    useEffect(() => {

        dispatch(fetchList())
        const data = eventlist.find((d) => d.idEventos == search)
        if (data) {
            setEvent(data)
        }
    }, [search, eventlist])

    const [Seccion, setSeccion] = useState([])
    const [precio, setprecio] = useState(0)


    useEffect(() => {
        if (Event) {
            dispatch(fetchListSeccion(Event.idEventos))
        }

    }, [Event, seccionlist])




    useEffect(() => {

        if (idSeccionSelect) {
            const idseccion = parseInt(idSeccionSelect);

            dispatch(fetchListAsientos(idseccion))
        }

    }, [idSeccionSelect, asientolist])


    useEffect(() => {

        console.log("Cuanntas veces")

        if (idSeccionSelect) {
            const idseccion = parseInt(idSeccionSelect);
            const seccion = seccionlist.find((s) => s.idSecciones === idseccion)
            setSeccion([...Seccion, seccion]);
            setprecio(seccion.precio)
            setNombreSeccion(seccion.nombreSeccion)


        }

    }, [idSeccionSelect])


    // useEffect(() => {

    //     if(Seccion.length != 0 && selectedSeats.length != 0){
    //         console.log("SaveChanges")
    //         console.log(idSeccionSelect)
    //         console.log(selectedSeats)
    //         setSaveChangeTickets([...SaveChangeTickets, Seccion, selectedSeats])


    //     }

    // }, [Seccion, selectedSeats])






    const handleAdd = (e) => {
        e.preventDefault();
        if (Seccion.length != 0 && selectedSeats.length != 0) {
            console.log("SaveChanges")
            setSaveChangeTickets([...SaveChangeTickets, Seccion, selectedSeats])









        }
    }


    useEffect(() => {
        console.log("Despues")
        console.log(SaveChangeTickets)

        // SaveChangeTickets.map((tickets, index) => {
        //     console.log(index)

        //     tickets.map((sub, ind) => {
        //         console.log(sub.id)
        //         console.log(sub.nombreSeccion)
        //     })

        // })
    }, [SaveChangeTickets])









    const handleSelectChange = (event) => {
        event.preventDefault();
        const selectedSeccion = event.target.value;
        setidSeccionSelect(selectedSeccion)

    }

    useEffect(() => {
        console.log(idSeccionSelect)
        if (idSeccionSelect) {
            dispatch(fetchListAsientos(idSeccionSelect))
        }


    }, [idSeccionSelect])





    //Modal 
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true)
    }


    const handleSeatSelection = (asiento, checked) => {

        if (checked) {
            if (selectedSeats.length < 5 && !selectedSeats.includes(asiento)) {
                setSelectedSeats([...selectedSeats, asiento]);
            }
        } else {
            setSelectedSeats(selectedSeats.filter(seat => seat !== asiento));
        }

    }

    useEffect(() => {
        console.log(selectedSeats)
    }, [selectedSeats])





    if (!Event) {
        return null
    } else

        return (
            <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                            <li >
                                <div className="flex items-center">
                                    <a className="mr-2 text-sm font-medium text-gray-900">
                                        {Event.tipoEvento}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {Event.nombreEvento}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <MapIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            Seleccion de asientos (Max 5)
                                                        </Dialog.Title>
                                                        <div className="mt-2">

                                                            <RadioGroup className="mt-4">
                                                                <RadioGroup.Label className="sr-only">Choose a asiento</RadioGroup.Label>
                                                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                                    {asientolist.map((asiento, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className={classNames(
                                                                                selectedSeats.includes(asiento)
                                                                                    ? 'cursor-not-allowed bg-gray-50 text-gray-200'
                                                                                    : asiento.reservado
                                                                                        ? 'cursor-not-allowed bg-gray-50 text-gray-200'
                                                                                        : 'cursor-pointer bg-white text-gray-900 shadow-sm',
                                                                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                                                                                selectedSeats.includes(asiento) ? 'ring-2 ring-indigo-500' : ''
                                                                            )}

                                                                            onClick={() => handleSeatSelection(asiento, !selectedSeats.includes(asiento))}
                                                                        >
                                                                            <span>{asiento.numero}</span>
                                                                            {({ active, checked }) => (
                                                                                <>
                                                                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                                    {size.inStock ? (
                                                                                        <span
                                                                                            className={classNames(
                                                                                                active ? 'border' : 'border-2',
                                                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                                            )}
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    ) : (
                                                                                        <span
                                                                                            aria-hidden="true"
                                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                                        >
                                                                                            <svg
                                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                                viewBox="0 0 100 100"
                                                                                                preserveAspectRatio="none"
                                                                                                stroke="currentColor"
                                                                                            >
                                                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                                            </svg>
                                                                                        </span>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Aceptar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 ">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-800 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Event.nombreEvento}</h1>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{Event.descripcion}</p>
                            </div>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-end-2 lg:border-r lg:border-gray-800 lg:pb-16 lg:pr-8 lg:pt-6">


                            <div className="mt-0">


                                <div className="mt-4">
                                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                        <img
                                            src={Event.image}
                                            alt={Event.image}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="">Selecion de secciones y asientos</h2>
                            <div className='py-8'>

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


                                            <option key={indexe} value={seccion.idSecciones} className='px-[8rem]'>




                                                {seccion.nombreSeccion}   ${seccion.precio}




                                            </option>

                                        ))}


                                    </Select>
                                </div>
                            </div>
                            {Seccion != null && <p className="text-3xl tracking-tight text-gray-900">${precio.toLocaleString()}</p>}

                            <form className="mt-10">

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <button onClick={handleOpen} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                            Mapa de asientos
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>
                        <div className="lg:border-l lg:border-gray-800 lg:px-8 pt-6">



                            <div>

                                <div className="">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Event.nombreEvento}</h1>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{Event.descripcion}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Boletos Agregados</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">



                                        
                                        {/* {selectedSeats.map((asiento, index) => (
                                            <div key={index}>
                                                <li className="text-gray-400">
                                                    <div className="flex justify-between ...">
                                                        <span className="text-gray-600 px-8">{asiento.numero}</span>
                                                    </div>

                                                </li>

                                            </div>


                                        ))} */}
                                           {SaveChangeTickets.map((tiickets, index) => (
                                            <div key={index}>
                                                {tiickets.map((subti, indext) =>(
                                                     <li className="text-gray-400">
                                                    <div className="flex justify-between ...">
                                                        <span className="text-gray-600 px-8">{subti.numero}</span>
                                                        <span className="text-gray-600 px-8">{subti.nombreSeccion}</span>
                                                    </div>

                                                </li>
                                                ))}
                                               

                                            </div>


                                        ))}
                                        {/* 
                                        {SaveChangeTickets.map((tickets, index) => (
                                            <div key={index}>

                                                {tickets.map((sub, ind) => {
                                                   <li className='text-gray-400'>
                                                     <div className="flex justify-between ...">
                                                        <span className="text-gray-600 px-8">Hola</span>
                                                    </div>
                                                    <h3>{sub.nombreSeccion}</h3>
                                                   </li>
                                                })}


                                            </div>
                                        ))} */}

                                        {/* {SaveChangeTickets.map((tickets, index) => {
                                          

                                            tickets.map((sub, ind) => (
                                                <div key={ind}>
                                                <li className="text-gray-400">
                                                    <div className="flex justify-between ...">
                                                        <span className="text-gray-600 px-8">{sub.nombreSeccion}</span>
                                                    </div>

                                                </li>

                                            </div>
                                            ))

                                        })} */}


                                    </ul>
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={handleOpeFactura}
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Comprar
                            </button>
                        </div>


                        <div>

                            <Transition.Root show={OpenFactura} as={Fragment}>
                                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRefFactura} onClose={setOpenFactura}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 z-10 overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            >
                                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                <DocumentCheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                    Factura
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <RadioGroup className="mt-4">
                                                                        <RadioGroup.Label className="sr-only">Choose a asiento</RadioGroup.Label>

                                                                        <div className="grid grid-cols-1 bg-gray-100 p-8 rounded-lg shadow-md">
                                                                            <span className="text-lg font-semibold mb-4">Nº de Factura: 123456</span>
                                                                            <span>Fecha: 27 de agosto de 2023</span>
                                                                            <span className="text-xl font-bold mt-4">TicketsProx</span>
                                                                            <span>Dirección: Calle Principal #123</span>
                                                                            <span>NIF: ABC123456</span>
                                                                            <span className="mb-4">Cliente: Nombre del cliente</span>

                                                                            <div className="mb-4">
                                                                                <table className="w-full border-collapse border border-gray-300">
                                                                                    <thead>
                                                                                        <tr className="bg-gray-200">
                                                                                            <th className="border border-gray-300 py-2 px-4">Descripción</th>
                                                                                            <th className="border border-gray-300 py-2 px-4">Cantidad</th>
                                                                                            <th className="border border-gray-300 py-2 px-4">Precio</th>
                                                                                            <th className="border border-gray-300 py-2 px-4">Total</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="border border-gray-300 py-2 px-4">Entrada General</td>
                                                                                            <td className="border border-gray-300 py-2 px-4">2</td>
                                                                                            <td className="border border-gray-300 py-2 px-4">$2,000</td>
                                                                                            <td className="border border-gray-300 py-2 px-4">$4,000</td>
                                                                                        </tr>

                                                                                    </tbody>
                                                                                </table>
                                                                            </div>

                                                                            <span className="font-semibold">SUBTOTAL: $16,000</span>
                                                                            <span>Impuesto (%): $288</span>
                                                                            <span>Descuento: 0</span>
                                                                            <span className="font-semibold">Total a pagar: 16,288</span>
                                                                            <span className="my-4">-------------------------------------------</span>

                                                                            <span className="font-semibold">Método de pago: Tarjeta de Crédito</span>
                                                                            <span>Número de Tarjeta: **** **** **** 1234</span>
                                                                            <span>Fecha de Vencimiento: 09/25</span>

                                                                            <div className="mb-4">
                                                                                <article>
                                                                                    <h2 className="font-semibold mt-4">Condiciones de Compra:</h2>
                                                                                    <p className="text-gray-700">
                                                                                        - Los boletos son válidos solo para la fecha y hora especificadas.
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        - No se admiten cambios ni devoluciones.
                                                                                    </p>
                                                                                </article>
                                                                            </div>

                                                                            <div className="mb-4">
                                                                                <article>
                                                                                    <p className="text-gray-700">
                                                                                        Para cualquier consulta, por favor contactar a:
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        Correo electrónico: info@empresa.com
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        Teléfono: (123) 456-7890
                                                                                    </p>
                                                                                </article>
                                                                            </div>
                                                                        </div>




                                                                    </RadioGroup>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                            onClick={() => setOpenFactura(false)}
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenFactura(false)}
                                                            ref={cancelButtonRefFactura}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                        </div>




                    </div>
                </div>

            </div>
        )
}


