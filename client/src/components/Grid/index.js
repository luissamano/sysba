import React, { useContext } from "react";

import { EmpleadosContext } from "../../Context/EmpleadosContext";

const Grid = () => {

    const { empleados } = useContext(EmpleadosContext);

    if (empleados.length === 0) {
        return (
            <>
                <h2>Tabla de empleados</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Departamento</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="text-center">
                                No hay datos
                        </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }


    return (
        <>
            <h2>Tabla de empleados</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Departamento</th>
                    </tr>
                </thead>

                <tbody>
                    {empleados.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.nombre}</td>
                                <td>{item.edad}</td>
                                <td>{item.sexo}</td>
                                <td>{item.departamento}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Grid;