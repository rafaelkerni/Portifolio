using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Curso
{
    //[XamlCompilation(XamlCompilationOptions.Skip)] //Não compila XAML
    public partial class GreetPage : ContentPage
    {
        public GreetPage()
        {
            InitializeComponent();

            slider.Value = 0.5;

            //Desenvolver para plataforma especifica

            /*if (Device.OS == TargetPlatform.iOS)
                Padding = new Thickness(0, 20, 0, 0);
            else if (Device.OS == TargetPlatform.Android)
                Padding = new Thickness(0, 20, 0, 0);

           Padding = Device.OnPlatform<Thickness>(
                iOS: new Thickness(0, 20, 0, 0),
                Android: new Thickness(0, 20, 0, 0)
            );*/

        }

    }
}