import Alpine from "@alpinejs/csp";

document.addEventListener("alpine:init", () => {
  Alpine.data("counter", () => {
    return {
      count: 0,
      increment() {
        this.count++;
      },
    };
  });
});

// Start Alpine
// @ts-expect-error
window.Alpine = Alpine;
Alpine.start();
