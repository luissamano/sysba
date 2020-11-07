using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api
{
    public static class ConnString
    {
        private static readonly string cName =
            @"Data Source=.;Initial Catalog=db_examen;Trusted_Connection=True;";

        public static string ServerName
        {
            get => cName;
        }
    }
}
