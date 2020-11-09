import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const EmpleadosContext = createContext();

const EmpleadosProvider = (props) => {

    const [empleados, guardarEmpleados] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("selectDepartamento") === undefined ? 0 : localStorage.getItem("selectDepartamento");
        const fetchEmpleados = async () => {
            const response = await axios.get(`https://localhost:5001/api/empleados/departamento/${id}`);
            guardarEmpleados(response?.data);
        };

        fetchEmpleados();
    }, [empleados]);


    
    return (
        <EmpleadosContext.Provider
            value={{
                empleados
            }}
        >
            {props.children}
        </EmpleadosContext.Provider>
    )
}

export default EmpleadosProvider;