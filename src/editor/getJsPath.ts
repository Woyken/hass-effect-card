function getCssSelector(el: HTMLElement) {
  const path: string[] = [];
  let iteratingEl: ParentNode = el;
  let parent = iteratingEl.parentNode;
  while (parent) {
    path.unshift(
      `${"tagName" in iteratingEl && typeof iteratingEl.tagName === "string" ? iteratingEl.tagName : ""}:nth-child(${
        Array.from(parent.children).indexOf(iteratingEl as HTMLElement) + 1
      })`
    );
    iteratingEl = parent;
    parent = iteratingEl.parentNode;
  }
  return { parent: iteratingEl, selector: `${path.join(" > ")}`.toLowerCase() };
}

function getShadowRootOrSelector(el: HTMLElement) {
  let cssSelector = getCssSelector(el);
  let shadowParent =
    "host" in cssSelector.parent
      ? (cssSelector.parent.host as HTMLElement)
      : undefined;
  const path: Array<
    { type: "shadow" } | { type: "selector"; selector: string }
  > = [{ type: "selector", selector: cssSelector.selector }];
  if (shadowParent) path.unshift({ type: "shadow" });
  while (shadowParent) {
    cssSelector = getCssSelector(shadowParent);
    shadowParent =
      "host" in cssSelector.parent
        ? (cssSelector.parent.host as HTMLElement)
        : undefined;
    path.unshift({ type: "selector", selector: cssSelector.selector });
    if (shadowParent) path.unshift({ type: "shadow" });
  }

  return path;
}

// TODO returns some variation of selector
// need result something like: document.querySelector('html:nth-child(1) > body:nth-child(2) > home-assistant:nth-child(1)').shadowRoot.querySelector('home-assistant-main:nth-child(1)').shadowRoot.querySelector('ha-drawer:nth-child(1) > partial-panel-resolver:nth-child(2) > ha-panel-lovelace:nth-child(1)').shadowRoot.querySelector('hui-root:nth-child(1)').shadowRoot.querySelector('div:nth-child(1) > div:nth-child(2) > hui-view:nth-child(1) > hui-masonry-view:nth-child(1)').shadowRoot.querySelector('div:nth-child(1) > div:nth-child(2) > hui-vertical-stack-card:nth-child(1)').shadowRoot.querySelector('div:nth-child(1) > mini-graph-card:nth-child(5)')
// could do: html:nth-child(1) > body:nth-child(2) > home-assistant:nth-child(1) $ home-assistant-main:nth-child(1) & ha-drawer:nth-child(1) > partial-panel-resolver:nth-child(2) > ha-panel-lovelace:nth-child(1) & hui-root:nth-child(1) $ div:nth-child(1) > div:nth-child(2) > hui-view:nth-child(1) > hui-masonry-view:nth-child(1) $ div:nth-child(1) > div:nth-child(2) > hui-vertical-stack-card:nth-child(1) $ div:nth-child(1) > mini-graph-card:nth-child(5)
// split by $
// rest are regular selectors
// iterate, execute to find target element
// TODO how to find the target? Need selector mode of some sort.
// Maybe select element by clicking on it
// then up/down arrow to select parent/child

export function getJsPath(el: HTMLElement) {
  // document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#view > hui-view > hui-masonry-view").shadowRoot.querySelector("#columns > div:nth-child(2) > hui-vertical-stack-card").shadowRoot.querySelector("#root > mini-graph-card:nth-child(5)").shadowRoot.querySelector("ha-card > div.header.flex > div.name.flex > span")
  const path = getShadowRootOrSelector(el);
  return (
    "document" +
    path
      .map((x) =>
        x.type === "selector"
          ? `.querySelector('${x.selector}')`
          : `.shadowRoot`
      )
      .join("")
  );
}
