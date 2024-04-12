using Autodesk.Revit.UI;
using System.Reflection;
using System.Windows;
using TheBoringApp.Browser;

namespace TheBoringApp.Views
{
    /// <summary>
    /// Interaction logic for BoringAppWindow.xaml
    /// </summary>
    public partial class BoringAppWindow : Window
    {
        public BoringAppWindow(UIApplication uiApplication, ChatoEvent chatoExternalEvent)
        {
            InitializeComponent();
            string version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            this.Title = $"Boring App v{version}";
            this.Closing += BoringAppWindow_Closing;

            new BrowserManager(webView, uiApplication, chatoExternalEvent);
        }

        private void BoringAppWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            TheBoringApp.Command.window = null;
        }
    }
}
