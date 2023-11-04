using Autodesk.Revit.UI;

namespace Boring.Revit._2023
{
  public class BoringRevitApplication : IExternalApplication
  {
    public Result OnStartup(UIControlledApplication application)
    {
      RevitUI.Initialize(application);
      return Result.Succeeded;
    }

    public Result OnShutdown(UIControlledApplication application)
    {
      return Result.Succeeded;
    }
  }
}
