import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const Formulario = ({ crearEmpleado }) => {
  // Crear State de Citas
  const [empleado, actualizarEmpleado] = useState({
    nombre: '',
    edad: null,
    sexo: '',
    id_departamento: null,
  });
  const [error, actualizarError] = useState(false);

  // Funci�n que se ejecuta cada que el usuario escribe en un input
  const actualizarState = e => {
    actualizarEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { nombre, edad, sexo, id_departamento} = empleado;

  // Cuando el usuario presiona agregar cita
  const submitEmpleado = e => {
    e.preventDefault();

    // Validar
    if (
      nombre.trim() === '' ||
      edad.trim() === '' ||
      sexo.trim() === '' ||
      id_departamento.trim() === ''
    ) {
      actualizarError(true);
      return;
    }
    
    actualizarError(false);

    // Crear la cita
    crearEmpleado(empleado);

    // Reiniciar el form
    actualizarEmpleado({
      nombre: '',
      edad: null,
      sexo: '',
      id_departamento: null,
    });
  };

  return (
    <Fragment>
      <h2>Crear Empleado</h2>

      {error ? (
        <p className='alerta-error'>Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitEmpleado}>
        <label>Nombre</label>
        <input
          type='text'
          name='nombre'
          className='u-full-width'
          placeholder='Nombre'
          onChange={actualizarState}
          value={nombre}
        />

        <label>Edad</label>
        <input
          type='number'
          name='edad'
          className='u-full-width'
          placeholder='Edad'
          onChange={actualizarState}
          value={edad}
        />

        <label>Sexo</label>
        <input
          type="text"
          name='sexo'
          className='u-full-width'
          onChange={actualizarState}
          value={sexo}
        />

        <label>Departamento</label>
        <input
          type='number'
          name='id_departamento'
          className='u-full-width'
          onChange={actualizarState}
          value={id_departamento}
        />


        <button type='submit' className='u-full-width button-primary'>
          Agregar Empleado
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearEmpleado: PropTypes.func.isRequired,
};

export default Formulario;
