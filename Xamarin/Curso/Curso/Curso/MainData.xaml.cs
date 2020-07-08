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
	public partial class MainData : ContentPage
	{

        public MainData ()
		{
			InitializeComponent ();

            BindingContext = Application.Current;

        }

    }
}