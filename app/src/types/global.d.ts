declare global {
    interface Window {
      chrome: {
        webview: {
          hostObjects: {
            boringBridge: {
                GetAllRoomsNames(): Promise<string>;
            };
          };
        };
      };
    }
  }
  
  export {};
  