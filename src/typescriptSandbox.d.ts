declare type TypescriptSandbox = {
  /** Gets just the JavaScript for your sandbox, will transpile if in TS only */
  getRunnableJS: () => Promise<string>;
  /** Gets the DTS output of the main code in the editor */
  getText: () => string;
  /** Shortcut for setting the model's text content which would update the editor */
  setText: (text: string) => void;
};

export default function loadSandbox(
  initialCode: string
): Promise<TypescriptSandbox>;
