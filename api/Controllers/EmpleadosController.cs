using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        string connectionString = ConnString.ServerName;

        [HttpGet]
        public async Task<List<Empleados>> GetProductos()
        {
            List<Empleados> lsEmpleados = new List<Empleados>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spEmpleados", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();

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
                                id_departamento = reader.GetInt32(4)
                            };

                            lsEmpleados.Add(empleado);
                        }
                    }
                    conn.Close();
                }
            }

            return lsEmpleados;
        }


        [HttpPost]
        public async Task<int> InsertProductos([FromBody] Empleados json)
        {
            int res = 0;

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                    using (SqlCommand cmd = new SqlCommand("spInsertarEmpleados", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@nombre", SqlDbType.NVarChar).Value = json.nombre;
                        cmd.Parameters.Add("@edad", SqlDbType.Int).Value = json.edad;
                        cmd.Parameters.Add("@sexo", SqlDbType.Char).Value = json.sexo;
                        cmd.Parameters.Add("@departmento", SqlDbType.Int).Value = json.id_departamento;

                        conn.Open();

                        var r = await cmd.ExecuteNonQueryAsync();

                        try
                        {
                            if (r != 0)
                                res = 1;
                            else
                                res = 0;
                        }
                        catch (SqlException e)
                        {
                            Console.Out.WriteLine("ErrorSQL: " + e);
                            conn.Close();
                        }
                    conn.Close();
                }
            }

            return res;
        }


    }
}
