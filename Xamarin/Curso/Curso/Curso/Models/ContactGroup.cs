using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curso.Models
{
    class ContactGroup: List<Contact>
    {
        public string Title { get; set; }
        public string ShortTitle { get; set; }

        public ContactGroup( String title, string shortTitle)
        {
            Title = title;
            ShortTitle = shortTitle;
        }

    }
}
