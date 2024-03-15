using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace TheBoringApp.Bridges
{
    [ClassInterface(ClassInterfaceType.AutoDual)]
    [ComVisible(true)]
    public class AppBridge
    {
        private readonly UIApplication uiApplication;

        public AppBridge(UIApplication uiApplication)
        {
            this.uiApplication = uiApplication;
        }

        public string getCategories()
        {
            var supportedCategoriesDictionary = new Dictionary<string, BuiltInCategory>()
            {
                { "Rooms", BuiltInCategory.OST_Rooms },
                { "Areas", BuiltInCategory.OST_Areas },
                { "Furniture", BuiltInCategory.OST_Furniture },
                { "Mechanical Equipment", BuiltInCategory.OST_MechanicalEquipment },
                { "Specialty Equipment", BuiltInCategory.OST_SpecialityEquipment },
                { "Plumbing Equipment", BuiltInCategory.OST_PlumbingEquipment },
                { "Electrical Equipment", BuiltInCategory.OST_ElectricalEquipment }
            };

            return JsonConvert.SerializeObject(supportedCategoriesDictionary);
        }
    }
}
