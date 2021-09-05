const loadSandbox = () => {
  return new Promise((resolve, reject) => {
    // First set up the VSCode loader in a script tag
    const getLoaderScript = document.createElement("script");
    getLoaderScript.src = "https://www.typescriptlang.org/js/vs.loader.js";
    getLoaderScript.async = true;
    getLoaderScript.onload = () => {
      // Now the loader is ready, tell require where it can get the version of monaco, and the sandbox
      // This version uses the latest version of the sandbox, which is used on the TypeScript website

      // For the monaco version you can use unpkg or the TypeSCript web infra CDN
      // You can see the available releases for TypeScript here:
      // https://typescript.azureedge.net/indexes/releases.json
      //
      require.config({
        paths: {
          vs: "https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs",
          // vs: 'https://unpkg.com/@typescript-deploys/monaco-editor@4.0.5/min/vs',
          sandbox: "https://www.typescriptlang.org/js/sandbox",
        },
        // This is something you need for monaco to work
        ignoreDuplicateModules: ["vs/editor/editor.main"],
      });

      // Grab a copy of monaco, TypeScript and the sandbox
      require([
        "vs/editor/editor.main",
        "vs/language/typescript/tsWorker",
        "sandbox/index",
      ], (main, _tsWorker, sandboxFactory) => {
        const initialCode = `function myFunction() {
console.log('does this work')
}

myFunction();

`;

        const isOK = main && window.ts && sandboxFactory;
        if (isOK) {
          console.log("Typescript sandbox loaded successfully");
        } else {
          console.error(
            "Could not get all the dependencies of sandbox set up!"
          );
          console.error(
            "main",
            !!main,
            "ts",
            !!window.ts,
            "sandbox",
            !!sandbox
          );
          reject();
          return;
        }

        // Create a sandbox and embed it into the the div #monaco-editor-embed
        const sandboxConfig = {
          text: initialCode,
          compilerOptions: {},
          domID: "monaco-editor-embed",
        };

        const sandbox = sandboxFactory.createTypeScriptSandbox(
          sandboxConfig,
          main,
          window.ts
        );
        sandbox.editor.focus();
        resolve(sandbox);
      });
    };
    document.body.appendChild(getLoaderScript);
  });
};

export default loadSandbox;
