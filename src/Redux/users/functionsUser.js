
import { authSucced, autoLogout, UploadName, UploadLastName, UploadSucces, UploadEmail, deleteInfoUser, fechaexpiratio, fechaActual } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {format} from "date-fns";


export function fetchAuthUser(email, password) {
  return async dispatch => {
    try {

      const data = {
        email,
        password
    }
    //http://www.ticketsproxapia.somee.com/api/ClientesControllers
    //https://localhost:7124/api/ClientesControllers

      const resplogin = await fetch('https://localhost:7124/api/ClientesControllers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        rejectUnauthorized: false,
      });

      const login = await resplogin.json();
      console.log("funcion")
      console.log(login);

      const token = login.result

      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const expirationDate = new Date(payload.exp * 1000);

      const actual = new Date()
      const DateActual= format(actual, 'dd/MM/yyyy HH:mm:ss');
      const DateExpiratio = format(expirationDate, 'dd/MM/yy HH:mm:ss')

    


      console.log("Fecha de expiracion")
      console.log(expirationDate)
      console.log("Fecha actual")
      console.log(actual)

      localStorage.setItem("token", login.result)
      localStorage.setItem("name", login.nombre)
      localStorage.setItem("DateExpiration", DateExpiratio)
      localStorage.setItem("DateActual", DateActual)


      dispatch(authSucced(login.result))
      dispatch(UploadSucces(login.succes))
      dispatch(UploadEmail(login.correo))
      dispatch(UploadName(login.nombre));
      dispatch(fechaexpiratio(DateExpiratio))
      dispatch(fechaActual(DateActual))
      
    } catch (error) {
      //  dispatch(fetchFailed(error))
    }
  };
}


export function autoLogin() {
  return async dispatch => {
      
      const token = localStorage.getItem("token")
      const displayName = localStorage.getItem('name')

      const actual = localStorage.getItem('DateActual')
      const expiration = localStorage.getItem('DateExpiration')
      console.log("Auto Login")
      

      if (!token || expiration <= actual) {
          // dispatch(logout())
      } else {
          dispatch(authSucced(token))
          // dispatch(autologout((expirationDate.getTime() - new Date().getTime()) / 1000))
          dispatch(UploadName(displayName))
      }
  }

}


