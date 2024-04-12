using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;

namespace TheBoringApp.Bridges
{
    [ClassInterface(ClassInterfaceType.AutoDual)]
    [ComVisible(true)]
    public class AppBridge
    {
        private readonly UIApplication uiApplication;
        private readonly ChatoEvent chatoEvent;

        public AppBridge(UIApplication uiApplication, ChatoEvent chatoEvent)
        {
            this.uiApplication = uiApplication;
            this.chatoEvent = chatoEvent;
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
                            //.Skip(toSkip) // Skip the elements from previous pages
                            //.Take(pageSize) // Take the next 10 elements
                            .ToList();

            // create a dictionary for the elements and their parameters
            var parsedElements = new List<Dictionary<string, string>>();

            foreach (var element in elements)
            {
                var elementDict = new Dictionary<string, string>
                {
                    { "Id", element.Id.ToString() }
                };


                var parameters = GetAllElementParameters(element);

                foreach (var param in parameters)
                {
                    if (param.Value.StorageType == StorageType.String)
                    {
                        if (param.Value.HasValue)
                        {
                            elementDict.Add(param.Key, param.Value.AsString());
                        }
                    }
                }

                parsedElements.Add(elementDict);

            }


            return JsonConvert.SerializeObject(parsedElements);
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

        private static Dictionary<string, Parameter> GetAllElementParameters(Element element)
        {
            // dictionary for all params
            var allParams = new Dictionary<string, Parameter>();

            // instance params
            var instanceParams = GetInstanceParameters(element);

            // type params
            var typeParams = GetTypeParams(element);

            if (instanceParams != null)
                instanceParams.ToList().ForEach(p => { if (!allParams.ContainsKey(p.Key)) allParams.Add(p.Key, p.Value); });

            if (typeParams != null)
                typeParams.ToList().ForEach(p => { if (!allParams.ContainsKey(p.Key)) allParams.Add(p.Key, p.Value); });

            allParams = allParams.OrderBy(p => p.Key).ToDictionary(p => p.Key, p => p.Value);

            return allParams;
        }

        private static Dictionary<string, Parameter> GetInstanceParameters(Element element)
        {
            return GetElementParameters(element);
        }

        private static Dictionary<string, Parameter> GetElementParameters(Element element, bool isTypeParameter = false)
        {
            var parameters = element.Parameters.Cast<Parameter>().Where(x => x.HasValue).ToList();

            var elementParameters = new Dictionary<string, Parameter>();

            parameters.ForEach(p => { if (!elementParameters.ContainsKey(p.Definition.Name)) elementParameters.Add(p.Definition.Name, p); });

            return elementParameters;
        }

        private static Dictionary<string, Parameter> GetTypeParams(Element element)
        {
            var elementType = element.Document.GetElement(element.GetTypeId());

            if (elementType == null || elementType.Parameters == null)
            {
                return new Dictionary<string, Parameter>();
            }
            else
            {
                return GetElementParameters(elementType, true);
            }
        }

        public void UpdateParameters(string data)
        {
            var updateRequest = JsonConvert.DeserializeObject<ParameterUpdateInput>(data);
            chatoEvent.Run(uiApplication => RevitParameterEditor.UpdateElementParameters(updateRequest, uiApplication));
        }
    }

    public class RevitParameterEditor
    {
        public static void UpdateElementParameters(ParameterUpdateInput request, UIApplication uiApplication)
        {
            var document = uiApplication.ActiveUIDocument.Document;

            using (Transaction trans = new Transaction(document, "Update Parameters"))
            {
                trans.Start();

                for (int i = 0; i < request.elementIds.Count; i++)
                {
                    var elementId = request.elementIds[i];
                    var parameterKey = request.parameterKeys[i];
                    var parameterValue = request.parameterValues[i];
                    var categoryId = request.categoryId;

                    Element element = document.GetElement(new ElementId(elementId));

                    Parameter parameter = element.LookupParameter(parameterKey);

                    if (parameter != null && !parameter.IsReadOnly)
                    {
                        parameter.Set(parameterValue);
                    }
                    else if (parameter == null)
                    {
                        CreateNewParameter(document, element, parameterKey);
                        Parameter newParameter = element.LookupParameter(parameterKey);


                        if (newParameter != null)
                        {
                            newParameter.Set(parameterValue);
                        }
                        else
                        {
                            Debug.WriteLine($"Failed to create parameter {parameterKey} for element {elementId}");
                        }
                    }
                }

                trans.Commit();
            }
        }

        private static void CreateNewParameter(Document doc, Element element, string parameterName)
        {
            var categorySet = new CategorySet();
            categorySet.Insert(element.Category);
            RawCreateProjectParameter(doc.Application, parameterName, ParameterTypeId.TextText, true, categorySet, BuiltInParameterGroup.PG_DATA, true);
        }

        public static void RawCreateProjectParameter(Application app, string name, ForgeTypeId type, bool visible, CategorySet cats, BuiltInParameterGroup group, bool inst)
        {
            string oriFile = app.SharedParametersFilename;
            string tempFile = Path.GetTempFileName() + ".txt";
            using (File.Create(tempFile)) { }
            app.SharedParametersFilename = tempFile;

            var defOptions = new ExternalDefinitionCreationOptions(name, type)
            {
                Visible = visible
            };
            ExternalDefinition def = app.OpenSharedParameterFile().Groups.Create("TemporaryDefintionGroup").Definitions.Create(defOptions) as ExternalDefinition;

            app.SharedParametersFilename = oriFile;
            File.Delete(tempFile);

            Binding binding = app.Create.NewTypeBinding(cats);
            if (inst) binding = app.Create.NewInstanceBinding(cats);

            BindingMap map = (new UIApplication(app)).ActiveUIDocument.Document.ParameterBindings;
            if (!map.Insert(def, binding, group))
            {
                Trace.WriteLine($"Failed to create Project parameter '{name}' :(");
            }
        }
    }

    public class ParameterUpdateInput
    {
        public List<int> elementIds;
        public List<string> parameterKeys;
        public List<string> parameterValues;
        public int categoryId;
    }

}