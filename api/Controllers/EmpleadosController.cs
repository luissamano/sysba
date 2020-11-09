using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using NLog.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        string connectionString = ConnString.ServerName;

        [HttpGet]
        public async Task<List<Empleados>> GetEmpleados()
        {
            List<Empleados> lsEmpleados = new List<Empleados>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spEmpleados", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    await conn.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {

                            Empleados empleado = new Empleados
                            {
                                id = reader.GetInt32(0),
                                nombre = reader.GetString(1),
                                edad = reader.GetInt32(2),
                                sexo = reader["sexo"].ToString(),
                                id_departamento = reader.GetInt32(4),
                                departamento = reader.GetString(5)
                            };

                            lsEmpleados.Add(empleado);
                        }
                    }
                    conn.Close();
                }
            }
            return lsEmpleados;
        }

        [HttpGet]
        [Route("departamento/{Id}")]
        public async Task<List<Empleados>> GetEmpleadosByDepartamento(int Id) 
        {
            List<Empleados> empleados = new List<Empleados>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spEmpleadosByDepartamento", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@id_departamento", SqlDbType.Int).Value = Id;

                    await conn.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                             Empleados empleado = new Empleados
                             {
                                id = reader.GetInt32(0),
                                nombre = reader.GetString(1),
                                edad = reader.GetInt32(2),
                                sexo = reader["sexo"].ToString(),
                                id_departamento = reader.GetInt32(4),
                                departamento = reader.GetString(5)
                             };
                             empleados.Add(empleado);
                        }
                    }
                    conn.Close();
                }
            }
            return empleados;
        }


        [HttpPost]
        public async Task<int> InsertEmpleado([FromBody] Empleados json)
        {
            var res = 0;

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                    using (SqlCommand cmd = new SqlCommand("spInsertEmpleado", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@nombre", SqlDbType.NVarChar).Value = json.nombre;
                        cmd.Parameters.Add("@edad", SqlDbType.Int).Value = json.edad;
                        cmd.Parameters.Add("@sexo", SqlDbType.Char).Value = json.sexo;
                        cmd.Parameters.Add("@id_departamento", SqlDbType.Int).Value = json.id_departamento;

                        await conn.OpenAsync();

                        res = await cmd.ExecuteNonQueryAsync();

                    }
                    conn.Close();
            }

            return res;
        }


    }
}
