export default defineContentScript({
  matches: ["<all_urls>"],
  registration: "runtime",
  async main() {
    const rrweb = await import("rrweb-snapshot");

    const snapshot = rrweb.snapshot(document, {
      inlineStylesheet: true,
      inlineImages: true,
    });

    // if (snapshot) {
    //   const iframe = document.createElement("iframe");
    //   iframe.style.width = "100%";
    //   iframe.style.height = "800px";
    //   document.body.appendChild(iframe);

    //   rrwebs.rebuild(snapshot, {
    //     // @ts-expect-error Not sure what's wrong here, but it works
    //     doc: iframe.contentDocument,
    //   });
    // }

    return snapshot;
  },
});
