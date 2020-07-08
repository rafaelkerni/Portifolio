using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Curso
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Forms : ContentPage
    {
        public Forms()
        {
            InitializeComponent();
        }

       /*private void slider_ValueChanged(object sender, ValueChangedEventArgs e)
       {
        e.OldValue
       }

       private void Switch_Toggled(object sender, ToggledEventArgs e)
        {
            label.IsVisible = e.Value;
        }*/
    }
}