import { useEffect, useState, useLayoutEffect } from "react";
import "./loaders.css";

export function Loader() {
    const [loaded, setLoaded] = useState(false);

    // useLayoutEffect(() => {
    //     const loader = document.getElementById("loader");
    //     loader.classList.add("loaded");

    //     setTimeout(() => {
    //         setLoaded(false);
    //     }, 100000);

    // }, []);

    useEffect(() => {
        const loader = document.getElementById("loader");
        // loader.classList.add("loaded");
    })

    // useEffect(() => {
    //     if (loaded) {
    //         const loader = document.getElementById("loader");
    //         document.body.removeChild(loader);
    //     }
    // }, [loaded]);

    return (
        <>
            <div id="root"></div>
            <div id="loader" className="loading">
                <span className="loader"></span>
            </div>
        </>
    );
}
