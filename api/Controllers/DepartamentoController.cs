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
    public class DepartamentoController : ControllerBase
    {

        string connectionString = ConnString.ServerName;

        [HttpGet]
        public async Task<List<Departamento>> GetDepartamentos()
        {
            List<Departamento> lsProductos = new List<Departamento>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDepartamentos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {

                            Departamento departamento = new Departamento
                            {
                                id = reader.GetInt32(0),
                                departamento = reader.GetString(1)
                            };

                            lsProductos.Add(departamento);
                        }
                    }
                    conn.Close();
                }
            }

            return lsProductos;
        }
    }
}
