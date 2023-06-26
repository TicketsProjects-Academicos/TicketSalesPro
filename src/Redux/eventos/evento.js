
import { fetchEventosList } from "./slice";

export function fetchListEvent() {
    console.log("Funcion fuera");
    return dispatch => {
        try {
        fetch('http://www.ticketsproxapia.somee.com/api/Eventos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
         
            dispatch(fetchEventosList(data));
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch {
        // Manejar cualquier error
      }
    }
      
    };
  
  