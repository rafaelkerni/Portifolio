using SQLite;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Curso
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MainSQL : ContentPage
	{
        public class Recipe
        {
            [PrimaryKey, AutoIncrement]
            public int Id { get; set; }

            [MaxLength(255)]
            public string Name { get; set; }
        }

        private SQLiteAsyncConnection _connection;
        private ObservableCollection<Recipe> _recipes;
        public MainSQL ()
		{
			InitializeComponent ();

            _connection = DependencyService.Get<ISQLiteDb>().GetConnection();

		}

        protected override async void OnAppearing()
        {
            await _connection.CreateTableAsync<Recipe>();

            var recipes = await _connection.Table<Recipe>().ToListAsync();
            _recipes = new ObservableCollection<Recipe>(recipes);
            recipesListView.ItemsSource = _recipes;

            base.OnAppearing();
        }

        async Task OnAdd(object sender, System.EventArgs e)
        {
            var recipe = new Recipe { Name = "Recipe " + DateTime.Now.Ticks };

            await _connection.InsertAsync(recipe);

            _recipes.Add(recipe);
        }

        void OnUpdate(object sender, System.EventArgs e)
        {
        }

        void OnDelete(object sender, System.EventArgs e)
        {
        }
    }
}