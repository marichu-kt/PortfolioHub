"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export default function LiveCodeEditor() {
  const [code, setCode] = useState(`// DEFINE AN OBJECT FOR MESSAGES IN MULTIPLE LANGUAGES
const greetings = {
    en: "Hello",
    es: "Hola",
    fr: "Bonjour",
    de: "Hallo",
    it: "Ciao"
};

// FUNCTION TO GENERATE A CUSTOM GREETING
function greet(name, options = {}) {
    const { language = 'en', excited = false, formal = false } = options;

    if (typeof name !== 'string' || name.trim() === '') {
        return 'ERROR: PLEASE PROVIDE A VALID NAME.';
    }
    if (!greetings[language]) {
        return \`ERROR: UNSUPPORTED LANGUAGE CODE '\${language}'.\`;
    }

    let greeting = greetings[language];
    let message = \`\${greeting}, \${formal ? 'Mr./Ms. ' : ''}\${name.trim()}\`;

    if (excited) {
        message += '!!!';
    } else {
        message += '.';
    }

    return message;
}

// EXAMPLES OF USAGE
console.log(greet("Mario"));
console.log(greet("Mario", { language: 'es' }));
console.log(greet("Mario", { language: 'fr', excited: true }));
console.log(greet("Mario", { language: 'de', formal: true }));
`);

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runCode = () => {
    let logs = [];
    const originalConsoleLog = console.log;

    try {
      // INTERCEPT console.log
      console.log = (...args) => {
        logs.push(args.join(" "));
        originalConsoleLog(...args);
      };

      // eslint-disable-next-line no-eval
      const result = eval(code);

      if (logs.length > 0) {
        setOutput(logs.join("\n"));
      } else if (result !== undefined) {
        setOutput(String(result));
      } else {
        setOutput("(No output)");
      }

      setError("");
    } catch (err) {
      setOutput("");
      const errorType = err.name || "Error";
      const errorMessage = err.message;
      setError(`${errorType}: ${errorMessage}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Live Code Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-sm rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            title="Copy code"
          >
            Copy
          </button>
          <button
            onClick={runCode}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
          >
            Run Code
          </button>
        </div>
      </div>

      <label htmlFor="live-editor" className="sr-only">
        Live code editor
      </label>
      <Editor
        id="live-editor"
        value={code}
        onValueChange={setCode}
        highlight={(code) =>
          highlight(code, languages.javascript, "javascript")
        }
        padding={10}
        className="text-sm font-mono bg-gray-100 dark:bg-gray-900 text-black dark:text-white border rounded-md"
        style={{
          minHeight: "200px",
          whiteSpace: "pre",
          outline: "none",
        }}
      />

      {/* OUTPUT */}
      {output && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded whitespace-pre-wrap">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </section>
  );
}
