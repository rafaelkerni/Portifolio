using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Graficos
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();

            List<Microcharts.Entry> entries = new List<Microcharts.Entry>
            {
                new Microcharts.Entry(200)
                {
                    Label = "Janeiro",
                    ValueLabel = "200",
                    Color = SKColor.Parse("#266489")
                },
                new Microcharts.Entry(250)
                {
                    Label = "Fevereiro",
                    ValueLabel = "250",
                    Color = SKColor.Parse("#68B9C0")
                },
                new Microcharts.Entry(100)
                {
                    Label = "Março",
                    ValueLabel = "100",
                    Color = SKColor.Parse("#90D585")
                },
                new Microcharts.Entry(150)
                {
                    Label = "Abril",
                    ValueLabel = "150",
                    Color = SKColor.Parse("#e77e23")
                }
            };

            Grafico.Chart = new Microcharts.BarChart() { Entries = entries };

        }
    }
}
