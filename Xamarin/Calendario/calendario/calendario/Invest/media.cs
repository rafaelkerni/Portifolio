using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace calendario.Invest
{
    class media
    {
        public ObservableCollection<Investimento> Invest { get; set; }

        public media()
        {

            Invest = new ObservableCollection<Investimento>
            {
                new Investimento("Impressa", 20),
                new Investimento("Eletrônica", 5),
                new Investimento("Externa", 6),
                new Investimento("Digital", 9)
            };
        }
    }
}
