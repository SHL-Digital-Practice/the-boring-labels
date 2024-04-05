declare global {
  interface Window {
    chrome: {
      webview: {
        hostObjects: {
          appBridge: any;
        };
      };
    };
  }
}

export {};
