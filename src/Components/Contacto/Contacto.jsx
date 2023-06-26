import React, { useState } from 'react';

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleMensajeChange = (event) => {
        setMensaje(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes agregar la lógica para enviar los datos del formulario a tu backend o cualquier acción adicional que desees realizar

        // Luego de enviar el formulario, puedes limpiar los campos
        setNombre('');
        setCorreo('');
        setMensaje('');
    };

    return (
        <div className=''>
            {/*Contacto */}
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                    <h1 className="text-2xl font-bold mb-4">Contacto</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block mb-2 font-medium">Nombre:</label>
                            <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} className="border border-gray-300 rounded px-4 py-2 w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="correo" className="block mb-2 font-medium">Correo electrónico:</label>
                            <input type="email" id="correo" value={correo} onChange={handleCorreoChange} className="border border-gray-300 rounded px-4 py-2 w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mensaje" className="block mb-2 font-medium">Mensaje:</label>
                            <textarea id="mensaje" value={mensaje} onChange={handleMensajeChange} className="border border-gray-300 rounded px-4 py-2 w-full" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
