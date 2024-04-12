using Autodesk.Revit.UI;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using System;
using TheBoringApp.Bridges;

namespace TheBoringApp.Browser
{
    internal class BrowserManager
    {
        private readonly WebView2 webView;
        private readonly UIApplication uiApplication;
        private readonly ChatoEvent chatoExternalEvent;

        public BrowserManager(WebView2 webView, UIApplication uiApplication, ChatoEvent chatoExternalEvent)
        {
            this.webView = webView;
            this.uiApplication = uiApplication;
            this.chatoExternalEvent = chatoExternalEvent;
            InitializeAsync();
        }

        async void InitializeAsync()
        {
            string userFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + "\\.the-boring-app";

            var environment = await CoreWebView2Environment.CreateAsync(null, userFolderPath, null);

            await webView.EnsureCoreWebView2Async(environment);

#if DEBUG
            this.webView.Source = new Uri("http://localhost:3000");

#else
            this.webView.Source = new Uri("https://main.daoavje9flk95.amplifyapp.com");
#endif

            InitializeBridges();
        }

        async void InitializeBridges()
        {
            await webView.EnsureCoreWebView2Async();
            var appBridge = new AppBridge(uiApplication, chatoExternalEvent);
            this.webView.CoreWebView2.AddHostObjectToScript("appBridge", appBridge);
        }
    }
}
