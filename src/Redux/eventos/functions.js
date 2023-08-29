
import { fetchStart,fetchFailed,fetchEventListSucced, setResponse } from "./slice";

import {  useSelector } from "react-redux";


export function fetchList() {
  return async dispatch => {
    try {
      const respevent = await fetch('http://www.ticketsproxapia.somee.com/api/Eventos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const events = await respevent.json();
      // console.log("funcion")
      // console.log(events);

      
      dispatch(fetchResponse(events))
    } catch (error) {
     dispatch(fetchFailed(error))
    }
  };
}


export function fetchResponse(eventosList) {
  return dispatch => {
    dispatch(fetchEventListSucced({
      eventosList: eventosList
    }))
  }
}



