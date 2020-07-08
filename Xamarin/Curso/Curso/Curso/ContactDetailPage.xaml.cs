using Curso.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Curso
{
    public partial class ContactDetailPage : ContentPage
    {
        public ContactDetailPage(Contact contact)
        {
            if (contact == null)
                throw new ArgumentNullException();

            BindingContext = contact;

            InitializeComponent();
        }
    }
}