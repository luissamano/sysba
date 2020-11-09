import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DepartamentosContext = createContext();

const DepartamentosProvider = (props) => {

    const [departamentos, guardarDepartamentos] = useState([]);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            const response = await axios.get(`https://localhost:5001/api/departamento`);
            guardarDepartamentos(response?.data);
        };

        fetchDepartamentos();
    }, []);


    return (
        <DepartamentosContext.Provider
            value={{
                departamentos
            }}
        >
            {props.children}
        </DepartamentosContext.Provider>
    )
};

export default DepartamentosProvider;
