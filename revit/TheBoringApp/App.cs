using System.Reflection;
using Autodesk.Revit.UI;

namespace TheBoringApp
{
  public class App : IExternalApplication
  {
    public Result OnStartup(UIControlledApplication application)
    {
      // Create button
      PushButtonData buttonData = new PushButtonData(
        "TheBoringApp",
        "The Boring App",
        Assembly.GetExecutingAssembly().Location,
        typeof(Command).FullName
      );

      PushButton button = application.CreateRibbonPanel("The Boring App").AddItem(buttonData) as PushButton;

      return Result.Succeeded;
    }
    public Result OnShutdown(UIControlledApplication application)
    {
      return Result.Succeeded;
    }

  }
}

