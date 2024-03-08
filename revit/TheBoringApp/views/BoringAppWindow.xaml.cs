using Microsoft.Web.WebView2.Core;
using System;
using System.Reflection;
using System.Windows;

namespace TheBoringApp.views
{
    /// <summary>
    /// Interaction logic for BoringAppWindow.xaml
    /// </summary>
    public partial class BoringAppWindow : Window
    {
        public BoringAppWindow()
        {
            InitializeComponent();
            string version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            this.Title = $"Boring App v{version}";
            this.Closing += BoringAppWindow_Closing;

            InitializeAsync();
        }

        async void InitializeAsync()
        {
            string userFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + "\\.the-boring-app";

            var environment = await CoreWebView2Environment.CreateAsync(null, userFolderPath, null);

            await webView.EnsureCoreWebView2Async(environment);
            
            this.webView.Source = new Uri("http://localhost:3000");
        }

        private void BoringAppWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            TheBoringApp.Command.window = null;
        }
    }
}
