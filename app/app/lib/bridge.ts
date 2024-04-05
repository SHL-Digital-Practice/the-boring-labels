interface Bridge {
  GetCategories(): Promise<string>;
  GetParameterKeysForCategory(category: string): Promise<string>;
}

class WebBridge implements Bridge {
  async GetCategories() {
    return JSON.stringify({
      "Category 1": 1,
      "Category 2": 2,
      "Category 3": 3,
    });
  }

  async GetParameterKeysForCategory(category: string) {
    return JSON.stringify(["Parameter 1", "Parameter 2", "Parameter 3"]);
  }
}

export const createBridge = (): Bridge => {
  if (window.chrome.webview) {
    return window.chrome.webview.hostObjects.appBridge;
  } else {
    return new WebBridge();
  }
};
