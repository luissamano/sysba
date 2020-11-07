import React from 'react';
import PropTypes from 'prop-types';

const Empleado = ({ empleado, eliminarEmpleado }) => (
  <div className='empleado'>
    <p>
      Nombre: <span>{empleado.mascota}</span>{' '}
    </p>
    <p>
      Edad: <span>{empleado.edad}</span>{' '}
    </p>
    <p>
      Sexo: <span>{empleado.sexo}</span>{' '}
    </p>
    <p>
      Departamento: <span>{empleado.departamento}</span>{' '}
    </p>
    <button
      className='button eliminar u-full-width'
      onClick={() => eliminarEmpleado(empleado.id)}
    >
      Eliminar &times;
    </button>
  </div>
);

Empleado.propTypes = {
  empleado: PropTypes.object.isRequired,
  eliminarEmpleado: PropTypes.func.isRequired,
};

export default Empleado;
