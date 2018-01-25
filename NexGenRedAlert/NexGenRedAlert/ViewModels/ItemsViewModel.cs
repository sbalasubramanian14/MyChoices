using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;

using Xamarin.Forms;

using NexGenRedAlert.Models;
using NexGenRedAlert.Views;
using System.Collections.Generic;
using System.Windows.Input;

namespace NexGenRedAlert.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        public ObservableCollection<Item> Items { get; set; }
        public Command LoadItemsCommand { get; set; }

        public ItemsViewModel()
        {
            Title = "Browse";
            Items = new ObservableCollection<Item>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());

            MessagingCenter.Subscribe<NewItemPage, Item>(this, "AddItem", async (obj, item) =>
            {
                var _item = item as Item;
                Items.Add(_item);
                await DataStore.AddItemAsync(_item);
            });

            AddCharCommand = new Command(() =>
            {
                // Add the key to the input string.
                Console.WriteLine("key");
            });
        }

        public ICommand AddCharCommand { protected set; get; }

        private ObservableCollection<string> _abcd = new ObservableCollection<string>();

        public ObservableCollection<string> Abcd
        {
            get
            {
                return _abcd;
            }
            set { SetProperty(ref _abcd, value); }
        }

        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;

            IsBusy = true;

            try
            {
                Items.Clear();
                var items = await DataStore.GetItemsAsync(true);
                foreach (var item in items)
                {
                    Items.Add(item);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}