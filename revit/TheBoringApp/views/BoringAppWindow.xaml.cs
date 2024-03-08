using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

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
        }
    }
}
