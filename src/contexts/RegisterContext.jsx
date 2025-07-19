import { createContext, useState } from "react";

export const RegisterContext = createContext();

export function RegisterProvider( { children } ) {
    const [data, setData] = useState({});

    return (
        <RegisterContext.Provider value={ {data, setData} }>
            {children}
        </RegisterContext.Provider>
    );
}