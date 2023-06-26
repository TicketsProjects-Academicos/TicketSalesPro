import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
const Login = ({clientelist}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormDataValid = Object.values(formData).every((value) => value.trim() !== "");
        if (isFormDataValid) {
            clientelist.forEach((cliente) => {
                if(cliente.correo === formData.email && cliente.password === formData.password) {
                    localStorage.setItem('Nombre', cliente.nombre);
                    localStorage.setItem("Apellido", cliente.apellido)
                    localStorage.setItem("Email", cliente.correo)
                    let token = true;
                    localStorage.setItem("Token", token)
                    console.log(localStorage.getItem("Token"));
                    window.location.reload();
                }

                
            })
          } else {
            console.log("Por favor, complete todos los campos.");
          }
      
        // console.log(formData);
    };

    async function buscarClientePorId(id) {
        const url = `http://www.ticketsproxapia.somee.com/api/ClientesControllers/${id}`;
      
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Error al buscar el cliente por ID');
          }
        } catch (error) {
          console.error(error);
        }
      }
      


    return (
        <div className="flex justify-center items-center p-20  ">
            <div>
                <form className="flex max-w-xl flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                          id="email"
                          placeholder="name@flowbite.com"
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password"
                            required
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">

                        {/* <Checkbox id="remember" /> */}
                        <Label htmlFor="remember">
                            No tiene una cuenta?
                        </Label>
                        
                        <a href="/signin">Sign In</a>
                        {/*  */}
                    </div>
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>

            </div>
        </div>
        
    )
}

export default Login