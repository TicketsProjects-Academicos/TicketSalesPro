import { Button, Card } from "flowbite-react"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { useEffect } from "react"
import { Link } from "react-router-dom";




const Eventos = ({ eventList }) => {


    useEffect(() => {
    }, [eventList]);


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Eventos Actuales</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {eventList.map((evento, indexe) => (
                    <div key={indexe} className=" bg-gray-100 flex items-center justify-center gap-10">

                        <div className="card">
                            <img
                                className="w-full h-full object-cover"
                                src={evento.image}>

                            </img>
                            <div className="p-5 flex flex-col gap-3">


                                <h2 className="event-title">
                                    {evento.nombreEvento}
                                </h2>
                                <span className="text-gray-500">{evento.descripcion}</span>

                                <div className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <span>
                                        <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                                    </span>
                                    <span className="pl-2">
                                        {evento.fechaEvento instanceof Date
                                            ? `${evento.fechaEvento.getDate()}/${evento.fechaEvento.getMonth() + 1}/${evento.fechaEvento.getFullYear()}`
                                            : new Date(evento.fechaEvento).toLocaleDateString("es-ES")}

                                    </span>
                                </div>

                                <span className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                    <span>
                                        <MdLocationOn size={16} style={{ verticalAlign: "middle" }} />
                                    </span>
                                    <span className="pl-2">
                                        {evento.lugarEvento}
                                    </span>
                                </span>

                                <div className="mt-5 flex gap-2">
                                    <Link to={"/compra?search=" + evento.idEventos}>
                                        <button className="button-primary">
                                            Comprar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Eventos