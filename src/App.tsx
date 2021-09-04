import React, { useState, useEffect } from "react";
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

  const formatAndRun = async () => {
    if (sandbox) {
      const source = sandbox.getText();
      const formatted = format(source, {
        parser: "typescript",
        plugins: [parserTypescript],
      });
      sandbox.setText(formatted);
      eval(await sandbox.getRunnableJS());
    }
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <p>
          <button type="button" onClick={formatAndRun}>
            Run
          </button>
        </p>
      </header>
      <div id="monaco-editor-embed" className={classes.editor}></div>
    </div>
  );
}

export default App;
