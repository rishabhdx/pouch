export default defineContentScript({
  matches: ["<all_urls>"],
  // matches: ['*://*.google.com/*'],
  main() {
    console.log("Hello content.");
  }
});
