const injectScript = () => {
  var script = document.createElement("script");
  script.src = chrome.runtime.getURL("injected.js");
  (document.head || document.documentElement).appendChild(script);
  script.remove();
};
injectScript();