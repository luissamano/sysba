import React, { Fragment, useState } from 'react';


const Formulario = ({ crearEmpleado }) => {

  const [empleado, actualizarEmpleado] = useState({
    nombre: '',
    edad: null,
    sexo: '',
    id_departamento: null,
  });

  const [error, actualizarError] = useState(false);


  const actualizarState = e => {
    actualizarEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { nombre, edad, sexo, id_departamento } = empleado;

  const submitEmpleado = e => {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      edad.trim() === '' ||
      sexo.trim() === '' ||
      id_departamento.trim() === ''
    ) {
      actualizarError(true);
      return;
    }

    crearEmpleado(empleado);

    actualizarError(false);

    actualizarEmpleado({
      nombre: '',
      edad: '',
      sexo: '',
      id_departamento: '',
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
          placeholder='M(masculino) / F(Femenino)'
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
          placeholder='1(Finanzas) - 2(RH) - 3(Sistemas)'
        />

        <button type='submit' className='u-full-width button-primary'>
          Agregar Empleado
        </button>

      </form>
    </Fragment>
  );
};

export default Formulario;
