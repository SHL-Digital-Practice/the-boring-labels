using System;
using System.Reflection;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace Boring.Revit._2023
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    [Journaling(JournalingMode.NoCommandData)]
    public class BoringCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            var window = new BoringWindow(commandData.Application);
            window.Show();
            return Result.Succeeded;
        }

        public static PushButtonData CreateButtonData(RibbonPanel ribbonPanel) {
            var data = new PushButtonData(
                MethodBase.GetCurrentMethod().DeclaringType?.Name, 
                "Boring",
                Assembly.GetExecutingAssembly().Location,
                MethodBase.GetCurrentMethod().DeclaringType?.FullName);
            return data;
        }
    }
}
