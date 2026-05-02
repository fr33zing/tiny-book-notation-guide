const countClass = 2 ** 4;
const countState = 4;
const el = document.getElementById("combo-example");
const svgTemplateContainer = document.getElementById("combo-example-template");
let svgTemplate = svgTemplateContainer.childNodes.item(1);

for (let state = 0; state < countState; state++) {
  for (let classes = 0; classes < countClass; classes++) {
    let clone = svgTemplate.cloneNode(true);
    let svg = clone.childNodes.item(1);
    let text = clone.childNodes.item(3);

    let [flag, v, bang, query] = [
      (classes >> 0) & 0x1,
      (classes >> 1) & 0x1,
      (classes >> 2) & 0x1,
      (classes >> 3) & 0x1,
    ];

    let textAdjectives = [];
    let textType = "task";
    let textState = "";

    // Class
    if (flag) {
      svg.classList.add("show-flag");
      textType = "list";
    }
    if (v) {
      svg.classList.add("show-v");
      textAdjectives.push("void");
    }
    if (bang) {
      if (!query) {
        svg.classList.add("show-bang");
      }
      textAdjectives.push("critical");
    }
    if (query) {
      svg.classList.add("show-query");
      textAdjectives.push("unclear");
    }
    if (query && bang) {
      svg.classList.add("show-query-bang");
    }

    // State
    switch (state) {
      case 0:
        textState = "(to-do)";
        break;
      case 1:
        svg.classList.add("show-slash");
        textState = "(canceled)";
        break;
      case 2:
        svg.classList.add("show-slash");
        svg.classList.add("show-cross");
        textState = "(done)";
        break;
      case 3:
        svg.classList.add("show-circle");
        if (flag) {
          textType = "note list";
        } else {
          textType = "note";
        }
        break;
    }

    let fullText = [textAdjectives.join(" "), textType, textState]
      .join(" ")
      .trim();
    fullText = fullText.charAt(0).toUpperCase() + fullText.slice(1);
    text.innerText = fullText;
    el.appendChild(clone);
  }
}
