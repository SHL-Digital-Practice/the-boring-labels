using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using TheBoringApp.views;

namespace TheBoringApp
{
    [Transaction(TransactionMode.Manual)]
    public class Command : IExternalCommand
    {
        static BoringAppWindow window = null;

        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            if (window == null)
            {
                window = new BoringAppWindow();
                window.Show();
            }

            window.Activate();
            return Result.Succeeded;
        }
    }
}