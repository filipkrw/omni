import Alpine from "@alpinejs/csp";
import { type serializedNodeWithId } from "rrweb-snapshot";

document.addEventListener("alpine:init", () => {
  Alpine.data("counter", () => {
    return {
      count: 0,
      snapshot: "",
      async increment() {
        this.count++;

        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        const tabId = tabs[0]?.id;

        if (tabId === undefined) {
          console.error("No active tab found");
          return;
        }

        const snapshot = await takeSnapshot(tabId);

        this.snapshot = JSON.stringify(snapshot, null, 2);
      },
    };
  });
});

async function takeSnapshot(tabId: number) {
  if (browser.scripting && browser.scripting.executeScript) {
    // MV3
    const result = await browser.scripting.executeScript({
      target: { tabId },
      files: ["content-scripts/content.js"],
    });
    return result[0].result as serializedNodeWithId | null;
  } else {
    // MV2
    const result = await browser.tabs.executeScript(tabId, {
      file: "content-scripts/content.js",
    });
    return result[0] as serializedNodeWithId | null;
  }
}

// Start Alpine
// @ts-expect-error
window.Alpine = Alpine;
Alpine.start();
