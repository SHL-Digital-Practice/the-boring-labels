interface Bridge {
  GetCategories(): Promise<any>;
}

class WebBridge implements Bridge {
  async GetCategories() {
    return JSON.stringify({
      "Category 1": 1,
      "Category 2": 2,
      "Category 3": 3,
    });
  }
}
export const createBridge = (): Bridge => {
  if (window.chrome.webview) {
    return window.chrome.webview.hostObjects.appBridge;
  } else {
    return new WebBridge();
  }
};
