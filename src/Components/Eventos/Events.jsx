import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../Redux/eventos/functions";
import { Loader } from "../Loaders/loaders";
const Events = () => {

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch()

    const eventlist = useSelector(state => state.Eventos.eventosList)

    useEffect(() => {
        dispatch(fetchList())
    }, [eventlist]);

    useEffect(() => {
      if(eventlist.length > 0) {
        setIsLoading(false)
      }
    
      
    }, [eventlist])
    


    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Eventos Actuales</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gapx-8 ">
                    {isLoading ? (
                        <Loader/>
                    ): (
                        eventlist.map((event, index) => (
                            <div key={index} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={event.image}
                                        alt={event.image}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between ml-4">
                                    <div className="">
                                        <h3 className="text-xl font-bold text-gray-900 ">
                                            <Link to={"/compra?search=" + event.idEventos}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {event.nombreEvento}
                                            </Link>
                                        </h3>
    
                                        <div className="text-base text-black dark:text-gray-400 flex items-center mb-2">
                                        <div>
                                            <MdDateRange size={16} style={{ verticalAlign: "middle" }} />
                                        </div>
                                        <span className="pl-2">
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
                                            {event.lugarEvento}
                                        </span>
                                    </p>
    
    
                                    </div>
    
                                </div>
                            </div>
                        ))
                    )}
                  
                </div>

            </div>

        </div>
    )
}

export default Events