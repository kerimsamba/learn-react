/* Shared helpers for the Learn React Hooks pages.
   Pure vanilla JS — no framework, works offline. */

/* ---- Tabs ----
   Markup:
   <div class="tabs" data-tabs>
     <button class="tab" data-tab="a" aria-selected="true">A</button>
     <button class="tab" data-tab="b">B</button>
   </div>
   <div class="panel active" data-panel="a">...</div>
   <div class="panel" data-panel="b">...</div>
*/
function initTabs(root = document) {
  root.querySelectorAll("[data-tabs]").forEach((group) => {
    const scope = group.closest("[data-tabscope]") || document;
    const tabs = group.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.getAttribute("data-tab");
        tabs.forEach((t) =>
          t.setAttribute("aria-selected", t === tab ? "true" : "false")
        );
        scope.querySelectorAll("[data-panel]").forEach((p) => {
          p.classList.toggle(
            "active",
            p.getAttribute("data-panel") === name
          );
        });
      });
    });
  });
}

/* ---- Logger ----
   Appends timestamped lines to a .log element and auto-scrolls. */
function makeLogger(el) {
  const fmt = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour12: false }) +
      "." + String(d.getMilliseconds()).padStart(3, "0");
  };
  return {
    add(msg, cls = "") {
      const line = document.createElement("div");
      line.className = "line";
      line.innerHTML =
        '<span class="t">' + fmt() + "</span> " +
        '<span class="' + cls + '">' + msg + "</span>";
      el.appendChild(line);
      el.scrollTop = el.scrollHeight;
    },
    clear() { el.innerHTML = ""; },
  };
}

/* Briefly flash an element to make a "re-render" visible. */
function flash(el) {
  el.classList.remove("flash");
  void el.offsetWidth; // restart animation
  el.classList.add("flash");
}

document.addEventListener("DOMContentLoaded", () => initTabs());
