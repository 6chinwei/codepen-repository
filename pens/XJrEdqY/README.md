
# Deferred CSS Loading 
[https://codepen.io/6chinwei/pen/XJrEdqY](https://codepen.io/6chinwei/pen/XJrEdqY)


A demo for deferred CSS loading. It can help reduce initial rendering time by deferring "non-critical" CSS, allowing the browser to prioritize more critical resources first.

There is a utility function, `afterDOMContentLoaded`, designed to ensure that the subsequent JS executes only when the DOM is ready. This function prevents missing the `DOMContentLoaded` event even if the JS file is executed too late.

After the DOM is ready, the script replaces `rel="prefetch"` with `rel="stylesheet"` for each `<link>` element. This instructs the browser to start applying the preloaded CSS.