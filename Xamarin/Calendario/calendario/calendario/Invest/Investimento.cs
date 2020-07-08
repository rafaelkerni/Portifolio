using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace calendario.Invest
{
    class Investimento
    {
        public Investimento(string Tipo, int valor)
        {

            this.Tipo = Tipo;

            this.valor = valor;

        }

        public string Tipo { get; set; }

        public int valor { get; set; }

    }
}
