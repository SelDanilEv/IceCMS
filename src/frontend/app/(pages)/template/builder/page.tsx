"use client";

import { useEffect, useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import webpagePlugin from "grapesjs-preset-webpage";
import baseBlocksPlugin from "grapesjs-blocks-basic";

export default function HomePage() {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs-editor",
      plugins: [baseBlocksPlugin],
      pluginsOpts: {
        "gjs-preset-webpage": {},
      },
      height: "600px",
      fromElement: false,
      storageManager: false, // Disable built-in storage if using your backend
    });

    // Set initial content
    const initialHtml = `
<body>
  <div class="welcome">
    <h1>Hello, GrapesJS!
    </h1>
    <p>This is a simple starter template.
    </p>
  </div>
  <div id="i3i6y" class="gjs-row">
    <div class="gjs-cell">
      <div zone-name="zone-header" id="i5jwf">[ZONE CONTENT]
      </div>
    </div>
    <div class="gjs-cell">
      <div zone-name="zone-2" id="ivgif">[ZONE CONTENT]
      </div>
    </div>
    <div class="gjs-cell">
      <div zone-name="zone-3" id="iebrm">[ZONE CONTENT]
      </div>
    </div>
  </div>
</body>
      `;

    const initialCss = `
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
*{
  box-sizing:border-box;
}
body{
  margin-top:0px;
  margin-right:0px;
  margin-bottom:0px;
  margin-left:0px;
}
body{
  font-family:Arial, sans-serif;
}
h1{
  color:darkblue;
}
.gjs-row{
  display:table;
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  width:100%;
}
.gjs-cell{
  width:8%;
  display:table-cell;
  height:75px;
}
#i5jwf{
  minHeight:80px;
  padding:4px;
  text-align:center;
}
#ivgif{
  minHeight:80px;
  padding:4px;
  text-align:center;
}
#iebrm{
  minHeight:80px;
  padding:4px;
  text-align:center;
}
@media (max-width: 768px){
  .gjs-cell{
    width:100%;
    display:block;
  }
}
    `;

    const bm = editor.BlockManager;
    const dc = editor.DomComponents;

    dc.addType("zone", {
      isComponent: (el) => el.tagName === "DIV" && el.hasAttribute("zone-name"),
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: true,
          attributes: { "zone-name": "" },
          style: {
            minHeight: "80px",
            padding: "4px",
            "text-align": "center",
          },
          components: "[ZONE CONTENT]",
          traits: [
            {
              type: "text",
              label: "Zone Name",
              name: "zone-name",
              placeholder: "e.g. header, sidebar",
            },
          ],
        },
      },
      view: {},
    });

    bm.add("zone-block", {
      label: "Zone",
      category: "Basic",
      content: { type: "zone" },
      attributes: { class: "fa fa-square-o" },
    });

    bm.remove("video");
    bm.remove("map");

    const allBlocks = bm.getAll();

    const zoneModel = allBlocks.get("zone-block");
    if (zoneModel) {
      const reordered = [
        zoneModel,
        ...allBlocks.models.filter((m) => m.id !== "zone-block"),
      ];

      (allBlocks as any).reset(reordered);
    }

    editor.setComponents(initialHtml);
    editor.setStyle(initialCss);

    editorRef.current = editor;
  }, []);

  const handleExport = () => {
    const html = editorRef.current?.getHtml();
    const css = editorRef.current?.getCss();

    fetch("/api/save-template", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Smart CMS builder</h1>
      <div>
        <div id="gjs-editor"></div>
        <button
          onClick={handleExport}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Export & Save
        </button>
      </div>
    </div>
  );
}
