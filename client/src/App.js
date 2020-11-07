import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Empleado from './components/Empleado/index';
import Combo from "./components/Combo";
import axios from "axios";

import './bootstrap.min.css';

function App() {

  let [empleados, guardarEmpleado] = useState('');
  let [options, setOptions] = useState('')

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let mounted = true;
    empleados = axios.get('https://localhost:44359/api/empleados');

    return () => {
      mounted = false;
    };

  }, [empleados]);

  const crearEmpleado = empleado => {
    guardarEmpleado([...empleados, empleado]);
  };


  // Mensaje condicional
  const titulo = empleados.length === 0 ? 'No hay Nombres' : 'Administra tus Empleaados';

  return (
    <Fragment>
      <h1>Administrador de Empleados</h1>



      <div className='container'>
        <div className='row'>


          <div className='one-half column'>
            <Formulario />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {empleados.map(empleado => (
              <Empleado key={empleado.id} empleado={empleado} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
