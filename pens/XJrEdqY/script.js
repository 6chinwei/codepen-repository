/**
This function is designed to ensure that the subsequent 
JS executes only when the DOM is ready. 

This prevents missing the DOMContentLoaded event if the 
current JS file is executed too late.
**/
function afterDOMContentLoaded() {
  return new Promise((resolve) => {
    if (document.readyState !== "loading") {
      return resolve();
    }

    document.addEventListener("DOMContentLoaded", resolve);
  });
}

afterDOMContentLoaded().then(() => {
  /** 
  Replace prefetch <link> to stylesheets <link>.
  This enables the browser to start applying the preloaded CSS.
  **/
  const styleSelector = 'link[rel="prefetch"][as="style"]';
  document.querySelectorAll(styleSelector).forEach((link) => {
    link.rel = "stylesheet";
  });
});
