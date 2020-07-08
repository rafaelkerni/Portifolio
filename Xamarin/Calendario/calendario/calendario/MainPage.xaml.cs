using Syncfusion.SfCalendar.XForms;
using Syncfusion.SfChart.XForms;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using calendario.Invest;

namespace calendario
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();

            /*calendar.Locale = new System.Globalization.CultureInfo("pt-BR");
            calendar.ShowInlineEvents = true;
            
            CalendarInlineEvent events = new CalendarInlineEvent();
            events.StartTime = new DateTime(2017, 5, 1, 5, 0, 0);
            events.EndTime = new DateTime(2017, 5, 1, 7, 0, 0);
            events.Subject = "Go to Meeting";
            events.Color = Color.Fuchsia;

            CalendarEventCollection collection = new CalendarEventCollection();
            collection.Add(events);

            calendar.DataSource = collection;*/

            this.BindingContext = new ViewModel();

            SfChart chart = new SfChart();

            //Initializing primary axis
            CategoryAxis primaryAxis = new CategoryAxis();

            primaryAxis.Title.Text = "Name";

            chart.PrimaryAxis = primaryAxis;

            //Initializing secondary Axis
            NumericalAxis secondaryAxis = new NumericalAxis();

            secondaryAxis.Title.Text = "Height (in cm)";

            chart.SecondaryAxis = secondaryAxis;

            //Initializing column series
            ColumnSeries series = new ColumnSeries();

            series.SetBinding(ChartSeries.ItemsSourceProperty, "Data");

            series.XBindingPath = "Name";

            series.YBindingPath = "Height";

            //chart.Series.Add(series);

             public ObservableCollection<Investimento> Investi { get; set; }

            public void Investido()
            {

            Investi = new ObservableCollection<Investimento>
                {
                    new Investimento("Impressa", 14),
                    new Investimento("Eletrônica", 7),
                    new Investimento("Externa", 9),
                    new Investimento("Digital", 14)
                };
            }


        ColumnSeries columnSeries = new ColumnSeries()
            {

                ItemsSource = Investi,
                XBindingPath = "Tipo",
                YBindingPath = "valor"

            };


            series.EnableTooltip = true;

            this.Content = chart;
        }

    
    }
}
