import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core";
import { format } from "prettier/standalone";
import * as parserTypescript from "prettier/parser-typescript";
import loadSandbox, { TypescriptSandbox } from "./typescriptSandbox";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "50vh",
  },
  header: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#282c34",
  },
  editor: {
    height: "50vh",
  },
}));

function App() {
  const classes = useStyles();
  const [sandbox, setSandbox] = useState<TypescriptSandbox>();
  useEffect(() => {
    const load = async () => {
      const result = await loadSandbox();
      setSandbox(result);
    };
    load();
  }, []);
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={async () => {
              if (sandbox) {
                const source = sandbox.getText();
                const formatted = format(source, {
                  parser: "typescript",
                  plugins: [parserTypescript],
                });
                sandbox.setText(formatted);
                eval(await sandbox.getRunnableJS());
              }
            }}
          >
            Run
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates/.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <div id="monaco-editor-embed" className={classes.editor}></div>
    </div>
  );
}

export default App;
