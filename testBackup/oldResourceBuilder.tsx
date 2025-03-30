"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
// import webpagePlugin from "grapesjs-preset-webpage";
import baseBlocksPlugin from "grapesjs-blocks-basic";

export default function HomePage() {
  const editorRef = useRef<Editor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs-editor",
      plugins: [baseBlocksPlugin],
      pluginsOpts: {
        "gjs-preset-webpage": {},
      },
      height: "600px",
      fromElement: false,
      storageManager: false,
      autorender: true,
      noticeOnUnload: false,
      canvas: {
        styles: [
          'https://unpkg.com/grapesjs/dist/css/grapes.min.css',
        ],
        scripts: [],
      },
    });

    // Set initial content
    const initialHtml = `
<body>
  <div class="welcome">
    <h1>Hello, GrapesJS!</h1>
    <p>This is a simple starter template.</p>
  </div>
  <div id="i3i6y" class="gjs-row">
    <div class="gjs-cell">
      <div zone-name="zone-header" id="i5jwf">[ZONE CONTENT]</div>
    </div>
    <div class="gjs-cell">
      <div zone-name="zone-2" id="ivgif">[ZONE CONTENT]</div>
    </div>
    <div class="gjs-cell">
      <div zone-name="zone-3" id="iebrm">[ZONE CONTENT]</div>
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
  font-family: Arial, sans-serif;
}
h1 {
  color: darkblue;
}
.gjs-row {
  display: table;
  padding: 10px;
  width: 100%;
}
.gjs-cell {
  width: 8%;
  display: table-cell;
  height: 75px;
}
[zone-name] {
  min-height: 80px;
  padding: 4px;
  text-align: center;
  border: 1px dashed #ccc;
  margin: 5px;
}
@media (max-width: 768px) {
  .gjs-cell {
    width: 100%;
    display: block;
  }
}
    `;

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
            border: "1px dashed #ccc",
            margin: "5px",
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
    });

    const bm = editor.BlockManager;
    bm.add("zone-block", {
      label: "Zone",
      category: "Basic",
      content: { type: "zone" },
      attributes: { class: "fa fa-square-o" },
    });

    ["video", "map"].forEach(block => bm.remove(block));

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

    return () => {
      editor.destroy();
    };
  }, []);

  const handleExport = async () => {
    if (!editorRef.current) return;
    
    setIsLoading(true);
    setSaveStatus("idle");

    try {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      const components = editorRef.current.getComponents();
      const styles = editorRef.current.getStyle();

      const response = await fetch("/api/save-template", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          html, 
          css,
          components,
          styles,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save template");
      }

      const data = await response.json();
      console.log("Template saved:", data);
      setSaveStatus("success");
      
      // Add message with information
    } catch (err) {
      console.error("Error saving template:", err);
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Smart CMS Builder</h1>
      
      <div className="border rounded-lg overflow-hidden">
        <div id="gjs-editor" className="min-h-[600px]"></div>
      </div>
      
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleExport}
          disabled={isLoading}
          className={`px-4 py-2 rounded text-white ${
            isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {isLoading ? "Saving..." : "Export & Save"}
        </button>
        
        {saveStatus === "success" && (
          <span className="text-green-600">Template saved successfully!</span>
        )}
        {saveStatus === "error" && (
          <span className="text-red-600">Error saving template. Please try again.</span>
        )}
      </div>
    </div>
  );
}