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
            buscarClientePorId(formData.email, formData.password);
          } else {
            console.log("Por favor, complete todos los campos.");
          }
      
        // console.log(formData);
    };

    async function buscarClientePorId(email, password) {

        const data = {
            email,
            password
        }
      
        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                rejectUnauthorized: false,
              };
              
              fetch('http://www.ticketsproxapia.somee.com/api/ClientesControllers', fetchOptions)
                .then(response => response.json())
                .then(data => {
                    const token = data.result
                    localStorage.setItem("token", token);
                    localStorage.setItem("succes", data.succes);
                    localStorage.setItem("name", data.nombre);
                    localStorage.setItem("email", data.email);
                    const auth = localStorage.getItem("succes")
                    const Token = localStorage.getItem("token")
                    if (auth) {
                        console.log(Token);
                        console.log(auth);
                        window.location.reload();
                    }
                    
                   
                })
                .catch(error => {
                  console.log(error);
                });
              
          
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
                          autoComplete="email"
                          
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
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex items-center gap-2">

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