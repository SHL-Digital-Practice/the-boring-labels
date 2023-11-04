using System;
using System.IO;
using System.Reflection;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;

namespace Boring.Revit._2023
{
    public class Initialize
    {
        public async static void Run(WebView2 webView)
        {
            try
            {
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                var userDataFolder = "C:\\Temp\\webview2";
                
                CoreWebView2Environment environment;
                
                environment = await CoreWebView2Environment.CreateAsync(null, userDataFolder , null);
                
                await webView.EnsureCoreWebView2Async(environment);
                
                webView.CoreWebView2.Settings.IsStatusBarEnabled = false;
                webView.CoreWebView2.SetVirtualHostNameToFolderMapping("areasync.app", path,
                    CoreWebView2HostResourceAccessKind.Allow);
                
                 webView.Source = new Uri("http://localhost:5173");
                 webView.CoreWebView2.OpenDevToolsWindow();
            }
            catch (Exception e)
            {
                MessageBox.Show("somehting bad happened", e.Message);
            }
        }
    }
}
