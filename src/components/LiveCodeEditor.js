// src/components/LiveCodeEditor.js
"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export default function LiveCodeEditor() {
  const [code, setCode] = useState(`function greet(name) {\n  return "Hello, " + name + "!";\n}`);

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Live Code Editor</h2>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => highlight(code, languages.javascript, 'javascript')}
        padding={10}
        className="text-sm font-mono bg-gray-100 dark:bg-gray-900 text-black dark:text-white border rounded-md"
        style={{
          minHeight: "200px",
          whiteSpace: "pre",
          outline: "none",
        }}
      />
    </section>
  );
}
