using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using TheBoringApp.Views;

namespace TheBoringApp
{
    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        public static BoringAppWindow window = null;

        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            var chatoExternalEvent = new ChatoEvent();

            if (window == null)
            {
                window = new BoringAppWindow(commandData.Application, chatoExternalEvent);
                window.Show();
            }

            window.Activate();
            return Result.Succeeded;
        }
    }
}