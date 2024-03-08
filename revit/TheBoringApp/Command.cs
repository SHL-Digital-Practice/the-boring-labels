using System.Reflection;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using TheBoringApp.views;

namespace TheBoringApp
{
    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            string version = Assembly.GetExecutingAssembly().GetName().Version.ToString();

            TaskDialog.Show($"v{version}", "Hello, Revit!");

            var window = new BoringAppWindow();
            window.Activate();
            window.Show();

            return Result.Succeeded;
        }
    }
}