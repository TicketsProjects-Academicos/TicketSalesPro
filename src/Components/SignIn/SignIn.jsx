import { useState } from "react";
import { Label, Checkbox, TextInput, Button } from "flowbite-react"

const SignIn = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        identificacion: "",
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

    const postData = async () => {
        const url = 'http://www.ticketsproxapia.somee.com/api/ClientesControllers';

        const data =  {
            "idCliente": 0,
            "nombre": formData.name,
            "apellido": formData.lastName,
            "identificacion": formData.identificacion,
            "correo": formData.email,
            "password": formData.password,
          }
        console.log("Datos de clientes")
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
              
                console.log('Post exitoso');
               
            } else {
           
                console.log('Error en el post');
            }
        } catch (error) {
         
            console.error('Error durante la solicitud:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormDataValid = Object.values(formData).every((value) => value.trim() !== "");
        if (isFormDataValid) {
            // console.log(formData);
              postData()
          } else {
            console.log("Por favor, complete todos los campos.");
          }
      
        // console.log(formData);
    };

    return (
        <div className="flex justify-center p-20">
            <div>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Your Name</Label>
                        </div>
                        <TextInput
                            id="name"
                            required
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName">Your Last Name</Label>
                        </div>
                        <TextInput
                            id="lastName"
                            required
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Identificacion">Your Identificacion</Label>
                        </div>
                        <TextInput
                            id="identificacion"
                            required
                            type="text"
                            value={formData.identificacion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[25rem]">
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
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
                            <Label htmlFor="password">Your password</Label>
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
                        <Label htmlFor="agree">
                            <p>Ya tiene una cuenta?</p>
                        </Label>
                        <a href="/">Login</a>
                        

                        {/* <Checkbox id="agree" type="checkbox" />
                        <Label htmlFor="agree">
                            <p>I agree with the terms and conditions</p>
                        </Label> */}
                    </div>
                    <Button type="submit">Register new account</Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;



// import { Label, Checkbox, TextInput, Button } from "flowbite-react"

// const SignIn = () => {


//     // {
//     //     "idCliente": 0,
//     //     "nombre": "string",
//     //     "apellido": "string",
//     //     "identificacion": "string",
//     //     "correo": "string",
//     //     "password": "string"
//     //   }

//     return (
//         <div className="flex justify-center p-20">
//             <div>
//                 <form className="flex max-w-md flex-col gap-4">
//                     <div>
//                         <div className="mb-2 block">
//                             <Label

//                                 value="Your Name"
//                             />
//                         </div>
//                         <TextInput
//                             id="name"
//                             required
//                             shadow
//                             type="name"
//                         />
//                     </div>
//                     <div>
//                         <div className="mb-2 block">
//                             <Label

//                                 value="Your Last Name"
//                             />
//                         </div>
//                         <TextInput
//                             id="LastName"
//                             required
//                             shadow
//                             type="name"
//                         />
//                     </div>

//                     <div className="w-[25rem]">
//                         <div className="mb-2 block">
//                             <Label

//                                 value="Your email"
//                             />
//                         </div>
//                         <TextInput
//                             id="email2"
//                             placeholder="name@flowbite.com"
//                             required
//                             shadow
//                             type="email"
//                         />
//                     </div>
//                     <div>
//                         <div className="mb-2 block">
//                             <Label
//                                 htmlFor="password2"
//                                 value="Your password"
//                             />
//                         </div>
//                         <TextInput
//                             id="password2"
//                             required
//                             shadow
//                             type="password"
//                         />
//                     </div>
//                     <div>
//                         <div className="mb-2 block">
//                             <Label
//                                 htmlFor="repeat-password"
//                                 value="Repeat password"
//                             />
//                         </div>
//                         <TextInput
//                             id="repeat-password"
//                             required
//                             shadow
//                             type="password"
//                         />
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Checkbox id="agree" />
//                         <Label
//                             className="flex"
//                             htmlFor="agree"
//                         >
//                             <p>
//                                 I agree with the
//                             </p>
//                             {/* <No Display Name
//         className="text-cyan-600 hover:underline dark:text-cyan-500"
//         href="/forms"
//       >
//         <p>
//           terms and conditions
//         </p>
//       </No Display Name> */}
//                         </Label>
//                     </div>
//                     <Button type="submit">
//                         Register new account
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignIn