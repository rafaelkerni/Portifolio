using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace calendario.Invest
{
    class Projecao
    {
        public ObservableCollection<Investimento> Invest { get; set; }

        public Projecao()
        {

            Invest = new ObservableCollection<Investimento>
            {
                new Investimento("Impressa", 23),
                new Investimento("Eletrônica", 8),
                new Investimento("Externa", 12),
                new Investimento("Digital", 17)
            };
        }
    }
}
