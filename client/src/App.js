import React, { Fragment } from 'react';

import Grid from "./components/Grid";
import Combo from "./components/Combo";
import Formulario from './components/Formulario'

import EmpleadosProvider from "./Context/EmpleadosContext";
import DepartamentosProvider from "./Context/DepartamentosContext";


import './bootstrap.min.css';
import axios from 'axios';

function App() {

  const crearEmpleado = async empleado => {
    try {
      await axios.post('https://localhost:5001/api/empleados',
        {
          nombre: empleado.nombre,
          edad: parseInt(empleado.edad),
          sexo: empleado.sexo,
          id_departamento: parseInt(empleado.id_departamento)
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1>Administrador de Empleados</h1>
      <div className='container'>
        <div className=''>
          <DepartamentosProvider>
            <Combo />
            <div className='row'>
              <div className='one-half column'>
                <EmpleadosProvider>
                  <Grid />
                </EmpleadosProvider>
              </div>

              <div className='one-half column'>
                <Formulario crearEmpleado={crearEmpleado} />
              </div>
            </div>
          </DepartamentosProvider>

        </div>
      </div>
    </Fragment>
  );
}

export default App;
