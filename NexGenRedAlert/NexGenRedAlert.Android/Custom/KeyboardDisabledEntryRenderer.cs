﻿using Android.Content;
using Android.Views.InputMethods;
using NexGenRedAlert.Custom;
using NexGenRedAlert.Droid.Custom;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: ExportRenderer(typeof(KeyboardDisabledEntry), typeof(KeyboardDisabledEntryRenderer))]
namespace NexGenRedAlert.Droid.Custom
{
    public class KeyboardDisabledEntryRenderer : EntryRenderer
    {
        public KeyboardDisabledEntryRenderer(Context context) : base(context) { }
        protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
        {
            base.OnElementChanged(e);

            if (e.NewElement != null)
            {
                ((KeyboardDisabledEntry)e.NewElement).PropertyChanging += OnPropertyChanging;
            }

            if (e.OldElement != null)
            {
                ((KeyboardDisabledEntry)e.OldElement).PropertyChanging -= OnPropertyChanging;
            }

            // Disable the Keyboard on Focus
            this.Control.ShowSoftInputOnFocus = false;
        }

        private void OnPropertyChanging(object sender, PropertyChangingEventArgs propertyChangingEventArgs)
        {
            // Check if the view is about to get Focus
            if (propertyChangingEventArgs.PropertyName == VisualElement.IsFocusedProperty.PropertyName)
            {
                // incase if the focus was moved from another Entry
                // Forcefully dismiss the Keyboard 
                InputMethodManager inputMethodManager = (InputMethodManager)this.Context.GetSystemService(Context.InputMethodService);
                inputMethodManager.HideSoftInputFromWindow(this.Control.WindowToken, 0);
            }
        }
    }
}