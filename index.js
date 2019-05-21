const js = import("./rust/pkg/syntax_highlighter");
const axios = require("axios");

js.then(js => {
  const code = document.getElementById("code");
  const input = document.getElementById("hidden-input");

  let embed = document.getElementById("embed");
  embed.onclick = upload;

  input.value = "";

  input.onkeydown = tab;
  input.oninput = highlight;

  function highlight() {
    const words = input.value.split(" ");

    code.innerHTML = input.value;
    for (let i = 0; i < words.length; i++) {
      let match = getRegexString(words[i]);

      if (js.detect(words[i]) || match.keyword) {
        if (words[i] === "" || words[i] === " ") return;

        code.innerHTML = code.innerHTML.replace(
          match.regex,
          `<span style="color: ${color(words[i])}">${
            match.partialHighlight ? match.substring : words[i]
          }</span>`
        );
        console.log(match.substring === ";" && code.innerHTML);
      }
    }
  }

  /**
   * @param {String} keyword - each word entered in the text area
   * @returns {RegExp} - the regex that will find the word to be highlighted in the textarea
   */
  function getRegexString(keyword) {
    //true
    if (keyword.indexOf("()") !== -1) {
      return {
        keyword: true,
        partialHighlight: true,
        substring: keyword.substring(0, keyword.indexOf("()")),
        regex: new RegExp(`${keyword.substring(0, keyword.indexOf("()"))}`, "g")
      };
    }

    /**
     * @description - currently cancels out highlighting for function invocations
     */
    if (keyword.indexOf(";") !== -1) {
      return {
        keyword: true,
        partialHighlight: true,
        substring: keyword.substring(keyword.indexOf(";"), keyword.length),
        regex: new RegExp(`${keyword}`, "g")
      };
    }

    if (color(keyword) == "#f2f24c") {
      return {
        keyword: false,
        partialHighlight: false,
        regex: null
      };
    }

    switch (keyword) {
      case "=":
        return {
          keyword: true,
          partialHighlight: false,
          regex: /=(?!")/g
        };
      case '"':
        return {};
      default:
        return {
          keyword: true,
          partialHighlight: false,
          regex: new RegExp(`${keyword}`, "g")
        };
    }
  }

  /**
   * @param {Object} e - onkeydown event
   * @description - indents the cursor a couple of spaces in both the textarea and the div to emulate a tab indent
   */
  function tab(e) {
    if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      this.value =
        this.value.substring(0, this.selectionStart) +
        "\t" +
        this.value.substring(this.selectionEnd);

      code.innerHTML =
        this.value.substring(0, this.selectionStart) +
        "\t" +
        this.value.substring(this.selectionEnd);
    }
  }

  function upload() {
    axios.post("http://localhost:3003/api/upload", {
      html: code.innerHTML,
      text: input.value
    });
  }
});

/**
 * @param {String} keyword - the keyword that returns true from the detect function
 * @returns {String} - the color for the highlighted word
 */
function color(keyword) {
  switch (keyword) {
    case "let":
    case "var":
    case "const":
    case "this":
    case "for":
    case "in":
    case "await":
    case "break":
    case "case":
    case "try":
    case "catch":
    case "continue":
    case "default":
    case "do":
    case "if":
    case "else":
    case "switch":
    case "while":
    case "function":
    case "debugger":
    case "delete":
    case "extends":
    case "static":
    case "false":
    case "true":
    case "new":
    case "null":
    case "super":
    case "typeof":
      return "#0068bd";
    case "return":
    case "()":
    case ";":
    case "=":
      return "#fff";
    case "class":
      return "#0068bd";
    case '"':
      return "orange";
    default:
      return "#f2f24c";
  }
}

// (function() {
//   myWindow = window.open("http://youtube.com", "", "width=100, height=100");

//   myWindow.resizeTo(250, 250); // Resizes the new window
//   myWindow.focus();
// })();

// function embedIframe() {
//   const frame = document.querySelector("iframe");
//   const doc = document.implementation.createHTMLDocument("Code Snippet");

//   const codeClone = code.cloneNode(true);
//   const textareaClone = input.cloneNode(true);

//   try {
//     doc.body.appendChild(codeClone);
//     doc.body.appendChild(textareaClone);
//   } catch (e) {
//     console.log(e);
//   }

//   const destDocument = frame.contentDocument;
//   const srcNode = doc.documentElement;
//   const newNode = destDocument.importNode(srcNode, true);

//   destDocument.replaceChild(newNode, destDocument.documentElement);

//   const newStyleSheet = createStylesheet(destDocument);

//   newStyleSheet.insertRule(
//     "#code {width: 100%; height: 100%; color: #b6e6fe; font-family: Menlo; background: #1f1e1e; border: none; position: absolute; opacity: 0.5; pointer-events: none; cursor: auto; z-index: 4; white-space: pre-wrap; margin-left: 1px}"
//   );

//   newStyleSheet.insertRule(
//     "#hidden-input {width: 100%; min-height: 300px; font-family: Menlo; position: absolute; margin: 0; color: #b6e6fe; caret-color: #fff; outline: none; resize: none; background: #1f1e1e; z-index: 3; white-space: pre-wrap; border-style: none;}"
//   );

//   newStyleSheet.insertRule("iframe {margin: 0; padding: 0; border: none;}");
// }

/**
 * @param {Object} iframeDocument - the html document of the iframe to add a stylesheet to
 * @returns {Stylesheet}
 */
// function createStylesheet(iframeDocument) {
//   const style = document.createElement("style");

//   style.appendChild(iframeDocument.createTextNode(""));

//   iframeDocument.head.appendChild(style);

//   return style.sheet;
// }
