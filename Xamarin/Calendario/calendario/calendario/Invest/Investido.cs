using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace calendario.Invest
{
    class Investido
    {
        public ObservableCollection<Investimento> Invest { get; set; }

        public Investido()
        {

            Invest = new ObservableCollection<Investimento>
            {
                new Investimento("Impressa", 14),
                new Investimento("Eletrônica", 7),
                new Investimento("Externa", 9),
                new Investimento("Digital", 14)
            };
        }
    }
}
