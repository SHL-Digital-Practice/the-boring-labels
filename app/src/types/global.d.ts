declare global {
    interface Window {
      chrome: {
        webview: {
          postMessage: any;
          hostObjects: {
            boringBridge: {
                GetAllRoomsNames(): Promise<string>;
            };
            roomsBridge: {
              ChangeParameterValue(elementId: string, parameterName: string, newValue: string): Promise<string>;
            }
          };
        };
      };
    }
  }
  
  export {};
  