import React, { useContext, useState } from "react";
import { DepartamentosContext } from '../../Context/DepartamentosContext';

const Combo = () => {

    const { departamentos } = useContext(DepartamentosContext);
    const [buscar, setBuscar] = useState({
        selectDepartamento: 0
    });

    const obtenerDatos = e => {
        setBuscar({
            ...buscar,
            "selectDepartamento": e.target.value,
            
        });
        localStorage.setItem("selectDepartamento", e.target.value)
    }


    return (
        <select className="form-control" name="selectDepartamento" onChange={obtenerDatos}>
            <option value="0">-- Seleciona un departamento --</option>
            {departamentos.map(departamento => (
                <option key={departamento.id} value={departamento.id}>
                    {departamento.departamento}
                </option>
            ))}
        </select>

    )
};

export default Combo;