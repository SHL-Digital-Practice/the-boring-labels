using Autodesk.Revit.UI;
using System;
using System.Diagnostics;

namespace TheBoringApp
{
    public class ChatoEvent : IExternalEventHandler
    {
        private readonly ExternalEvent _externalEvent;
        private Action<UIApplication> _action;

        public ChatoEvent()
        {
            _externalEvent = ExternalEvent.Create(this);
        }

        public void Run(Action<UIApplication> action)
        {
            _action = action;
            var request = _externalEvent.Raise();

            if (request != ExternalEventRequest.Accepted)
            {
                // do nothing
            }
        }

        public void Execute(UIApplication app)
        {
            try
            {
                _action?.Invoke(app);
            }
            catch (System.Exception e)
            {

                Debug.WriteLine("Failed to execute event action.");
            }
        }

        public string GetName()
        {
            return nameof(ChatoEvent);
        }
    }
}
