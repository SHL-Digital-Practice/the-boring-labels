using Autodesk.Revit.UI;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Windows.Media.Imaging;

namespace TheBoringApp
{
    public class App : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            try
            {
                application.CreateRibbonTab("PW");
            }
            catch (Exception)
            {
                // Tab already exists
            }

            try
            {
                application.CreateRibbonPanel("PW", "PW Tools");
            }
            catch (Exception)
            {
                // Panel already exists
            }

            var assembly = Assembly.GetExecutingAssembly();
            var assemblyDirectory = Path.GetDirectoryName(assembly.Location);

            // Create button
            PushButtonData buttonData = new PushButtonData(
                "Chato",
                "Chato",
                Assembly.GetExecutingAssembly().Location,
                typeof(Command).FullName
            )
            {
                LargeImage = new BitmapImage(new Uri($"{assemblyDirectory}\\Resources\\icon_32x32.png")),
            };

            PushButton button = application.GetRibbonPanels("PW").FirstOrDefault(p => p.Name == "PW Tools").AddItem(buttonData) as PushButton;

            return Result.Succeeded;
        }
        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }

    }
}

