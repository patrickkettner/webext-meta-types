/// <reference path="../dist/index.d.ts" />

async function run() {
  // Demo 1: All browsers static package
  // chrome.* is callback based in our prototype
  chrome.tabs.query({ active: true }, (tabs) => {
    console.log(tabs);
  });

  // browser.* is Promise based
  const ffTabs = await browser.tabs.query({ active: true });
  console.log(ffTabs);

  // Demo 2: Pruned (local generation)
  // For the demo to compile, we just use the ambient chrome global.
  // In a real project, you would reference chrome-only.d.ts instead of index.d.ts.
  chrome.storage.local.get(["key"], (result) => {
    console.log(result);
  });
}
