import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core";
import { format } from "prettier/standalone";
import * as parserTypescript from "prettier/parser-typescript";
import loadSandbox, { TypescriptSandbox } from "./typescriptSandbox";
import { Application } from "pixi.js";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useResizeListener } from "./useResizeListener";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    flexGrow: 1,
    flexBasis: 0,
  },
  app: {
    display: "flex",
    alignItems: "stretch",
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    backgroundColor: "gray",
  },
  header: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#282c34",
  },
  editorContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {},
    backgroundColor: "pink",
  },
  editor: {
    height: "100%",
  },
  toolbar: {},
  pixi: {
    display: "flex",
    flex: 1,
    [theme.breakpoints.down("md")]: {},
    background: "lightblue",
  },
}));

const resizePixi = (pixi: Application, isVerticallyStacked: boolean) => {
  const size = {
    width: isVerticallyStacked ? window.innerWidth : window.innerWidth / 2,
    height: isVerticallyStacked ? window.innerHeight / 2 : window.innerHeight,
  };
  console.log(
    `Window: ${window.innerWidth}x${window.innerHeight}, pixi: ${size.width}x${size.height}, `
  );
  pixi.renderer.resize(size.width, size.height);
};

function App() {
  const classes = useStyles();
  const [sandbox, setSandbox] = useState<TypescriptSandbox>();
  const [pixi, setPixi] = useState<Application>();
  const pixiElement = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  useResizeListener(() => {
    pixi && resizePixi(pixi, isMd);
  }, [isMd]);

  useEffect(() => {
    const load = async () => {
      const result = await loadSandbox();
      setSandbox(result);
    };
    load();
  }, []);

  useEffect(() => {
    const pixi = new Application({
      backgroundColor: 0xff0000,
    });

    setPixi(pixi);
    const element = pixiElement.current;
    if (element && pixi) {
      element.appendChild(pixi.view);
    }
    resizePixi(pixi, isMd);
    return () => {
      element?.removeChild(pixi.view);
    };
  }, [pixiElement.current]);

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
    <div className={classes.container}>
      <div className={classes.app}>
        <div className={classes.editorContainer}>
          <div className={classes.toolbar}>
            <button type="button" onClick={formatAndRun}>
              Run
            </button>
          </div>
          <div id="monaco-editor-embed" className={classes.editor}></div>
        </div>
        <div className={classes.pixi} ref={pixiElement} />
      </div>
    </div>
  );
}

export default App;
