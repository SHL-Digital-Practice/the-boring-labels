using System.Linq;
using Autodesk.Revit.UI;

namespace Boring.Revit._2023
{
    public class RevitUI
    {
        public static void Initialize(UIControlledApplication application) {
            try
            {
                application.CreateRibbonTab("Boring");
            }
            catch (System.Exception)
            {
                // throw;
            }

            var ribbonPanel = application.GetRibbonPanels("Boring").FirstOrDefault(panel => panel.Name == "Boring") ?? application.CreateRibbonPanel("Boring", "Boring");
            var buttonData = BoringCommand.CreateButtonData(ribbonPanel);
            ribbonPanel.AddItem(buttonData);
        }
    }
}
