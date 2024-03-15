using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public string GetCategories()
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

        public string GetElementsByCategory(string category, int page = 1)
        {
            // The number of elements per page
            int pageSize = 10;

            // Calculate the number of elements to skip
            int toSkip = pageSize * (page - 1);

            // Convert the string to a BuiltInCategory enum
            BuiltInCategory parsedCategory;
            try
            {
                parsedCategory = (BuiltInCategory)Enum.Parse(typeof(BuiltInCategory), category, true);
            }
            catch (ArgumentException)
            {
                // Handle the case where the categoryString does not match any BuiltInCategory value
                return "[]"; // Return an empty list or handle the error as appropriate
            }

            // Use LINQ to query elements of the given category
            var elements = new FilteredElementCollector(uiApplication.ActiveUIDocument.Document)
                            .OfCategory(parsedCategory)
                            .WhereElementIsNotElementType()
                            .Cast<Element>()
                            .Skip(toSkip) // Skip the elements from previous pages
                            .Take(pageSize) // Take the next 10 elements
                            .Select(e => new { id = e.Id })
                            .ToList();

            return JsonConvert.SerializeObject(elements);
        }

        public string GetParameterKeysForCategory(string categoryString)
        {
            var doc = uiApplication.ActiveUIDocument.Document;

            var category = ParseCategoryString(categoryString);

            if (category == null) { return "[]"; }
            // Initialize a hash set to store unique parameter names
            HashSet<string> parameterKeys = new HashSet<string>();

            // Collect a set of elements from the specified category
            IList<Element> elements = new FilteredElementCollector(doc)
                                      .OfCategory(category.Value)
                                      .WhereElementIsNotElementType()
                                      .Take(10) // Take a sample to improve performance, adjust as necessary
                                      .ToList();

            // Iterate through the collected elements to find instance parameters
            foreach (Element elem in elements)
            {
                foreach (Parameter param in elem.Parameters)
                {
                    if (param.IsReadOnly || param.StorageType != StorageType.String) { continue; }
                    parameterKeys.Add(param.Definition.Name);
                }

                // Attempt to get type parameters if the element has a valid type id
                ElementId typeId = elem.GetTypeId();
                if (typeId != ElementId.InvalidElementId)
                {
                    Element typeElem = doc.GetElement(typeId);
                    foreach (Parameter param in typeElem.Parameters)
                    {
                        if (!param.IsReadOnly || param.StorageType != StorageType.String) { continue; }
                        parameterKeys.Add(param.Definition.Name);
                    }
                }
            }

            // Optionally, include type (category) parameters by inspecting a few element types as well
            IList<Element> types = new FilteredElementCollector(doc)
                                   .OfCategory(category.Value)
                                   .WhereElementIsElementType()
                                   .Take(10) // Similarly, take a sample
                                   .ToList();

            foreach (Element type in types)
            {
                foreach (Parameter param in type.Parameters)
                {
                    if (!param.IsReadOnly || param.StorageType != StorageType.String) { continue; }
                    parameterKeys.Add(param.Definition.Name);
                }
            }

            return JsonConvert.SerializeObject(parameterKeys);


        }

        private Nullable<BuiltInCategory> ParseCategoryString(string category)
        {
            BuiltInCategory parsedCategory;
            try
            {
                parsedCategory = (BuiltInCategory)Enum.Parse(typeof(BuiltInCategory), category, true);
                return parsedCategory;
            }
            catch (ArgumentException)
            {
                // Handle the case where the categoryString does not match any BuiltInCategory value
                return null;
            }
        }
    }
}
