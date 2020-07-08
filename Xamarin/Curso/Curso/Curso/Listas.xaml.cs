using Curso.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Listas : ContentPage
    {
        private ObservableCollection<Contact> _contacts;

        IEnumerable<Contact> GetContacts(string searchText = null)
        {
            var contacts = new List<Contact> {

                new Contact { Name = "Rafael", ImageUrl = "http://lorempixel.com/100/100/people/1" },
                new Contact { Name = "Luan", ImageUrl = "http://lorempixel.com/100/100/people/2", Status = "Hey, Vamos Conversar!" }
            };

            if (String.IsNullOrWhiteSpace(searchText))
                return contacts;

            return contacts.Where(c => c.Name.StartsWith(searchText));

        }

        public Listas()
        {
            InitializeComponent();

            /*var names = new List<string>
            {
                "Rafael",
                "Luan",
                "Carolina"
            };

            listview.ItemsSource = names; 

            listview.ItemsSource = new List<ContactGroup>
            {
                new ContactGroup("R", "R")
                {
                    new Contact { Name = "Rafael", ImageUrl = "http://lorempixel.com/100/100/people/1"}
                },

                new ContactGroup("L", "L")
                {
                    new Contact { Name = "Luan", ImageUrl = "http://lorempixel.com/100/100/people/2", Status="Hey, Vamos Conversar!"}
                }          
            };

            


            _contacts = new ObservableCollection<Contact>
            {

                    new Contact { Name = "Rafael", ImageUrl = "http://lorempixel.com/100/100/people/1"},
                    new Contact { Name = "Luan", ImageUrl = "http://lorempixel.com/100/100/people/2", Status="Hey, Vamos Conversar!"}
            };

            listview.ItemsSource = _contacts;*/

            listview.ItemsSource = GetContacts();

        }

        private void listview_ItemTapped(object sender, ItemTappedEventArgs e)
        {
            var contact = e.Item as Contact;
            DisplayAlert("Tapped", contact.Name, "OK");
        }

        private void listview_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            /*var contact = e.SelectedItem as Contact;
            DisplayAlert("Selected", contact.Name, "OK");*/
            listview.SelectedItem = null;
        }

        private void Call_Clicked(object sender, EventArgs e)
        {
            var menuitem = sender as MenuItem;
            var contact = menuitem.CommandParameter as Contact;
            DisplayAlert("Chamar", contact.Name, "OK");

        }

        private void Delete_Clicked(object sender, EventArgs e)
        {
            var contact = (sender as MenuItem).CommandParameter as Contact;
            _contacts.Remove(contact);
        }

        private void listview_Refreshing(object sender, EventArgs e)
        {
            listview.ItemsSource = GetContacts();

            //listview.IsRefreshing = false;
            listview.EndRefresh();
        }

        private void SearchBar_TextChanged(object sender, TextChangedEventArgs e)
        {
            listview.ItemsSource = GetContacts(e.NewTextValue);
        }
    }

    
}