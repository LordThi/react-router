// Polyfill jsdom SubmitEvent.submitter, until https://github.com/jsdom/jsdom/pull/3481 is merged
if (
  typeof SubmitEvent === "undefined" ||
  !SubmitEvent.prototype.hasOwnProperty("submitter")
) {
  let maybeSubmitter;
  window.addEventListener(
    "click",
    (event) => {
      if ((event.target as any)?.form) maybeSubmitter = event.target;
      setImmediate(() => {
        // if this click doesn't imminently trigger a submit event, then forget it
        maybeSubmitter = undefined;
      });
    },
    { capture: true }
  );
  window.addEventListener(
    "submit",
    (event: any) => {
      if (maybeSubmitter?.form === event.target)
        event.submitter = maybeSubmitter;
    },
    { capture: true }
  );
}
