declare global {
    interface Window {
      chrome: {
        webview: {
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
  