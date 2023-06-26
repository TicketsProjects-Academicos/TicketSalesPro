

const Home = () => {

    return (
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <div className="text-white text-center">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra página de boletería</h1>
                <p className="text-lg">Aquí podrás encontrar una amplia selección de eventos y comprar tus boletos de manera fácil y segura.</p>
                <button className="bg-white text-blue-500 hover:bg-blue-100 text-lg font-semibold px-6 py-3 mt-6 rounded-md shadow-md">
                  <a href="/eventos"> Explorar eventos
                </a> 
                </button>
            </div>
        </div>
    )
}

export default Home