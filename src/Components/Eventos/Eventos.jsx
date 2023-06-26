import { Button, Card } from "flowbite-react"
import Eventos1 from "../../Eventos_1.jpg"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { useEffect } from "react"

import CompraTickets from "../CompraTickets/Tickets"

import { Link } from "react-router-dom";



const Eventos = ({ eventList }) => {


    useEffect(() => {
        console.log("Aqui evento");
        console.log(eventList);
        eventList.forEach((event) => {
            console.log("Image de evento");
            console.log(event.image);
        })
    }, [eventList]);

    const handleCompra = (evento) => {

        return (
            <CompraTickets evento={evento}></CompraTickets>
        )
    };

    return (
        <div className="grid grid-cols-3 gap-4 mt-10">
            {eventList.map((evento, indexe) =>
                <div key={indexe} className="w-[20rem] pl-8 ">
                    <Card
                        // imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={evento.image}
                        className="max-w-[20rem] max-h-[30rem]"
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

                        <Link to={"/compra?search=" + evento.idEventos}>
                            <Button >
                                Comprar
                            </Button>
                        </Link>
                        {/* <Link to={{ pathname: "/compra", state: { evento: evento } }}>
                            Comprar tickets
                        </Link> */}


                        {/* <Button><a href="/compra">Comprar tickets</a></Button> */}
                    </Card>
                </div>
            )}

        </div>
    )
}

export default Eventos

