import * as vscode from 'vscode';

/**
 * build using: 'Tasks: run build task'
 * test using: Run and Debug |> Run Extension
 * set VERSION in package.json!
 * compile to vsix: vsce package
 * install extension from vsix [in files-readonly branch]
 */
type ReadonlyPath = { [path: string]: boolean | null | 'toggle' } | undefined;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  /** can set value to any of true, false, null, 'toggle' */
  let setCmdArgs = vscode.commands.registerTextEditorCommand('markreadonly.readonlySet', (editor, edit, value: boolean | null | 'toggle') => {
    setReadOnly(editor.document, value);
  });
  let setCmdTrue = vscode.commands.registerTextEditorCommand('markreadonly.readonlyTrue', (editor) => {
    setReadOnly(editor.document, true);
  });
  let setCmdFalse = vscode.commands.registerTextEditorCommand('markreadonly.readonlyFalse', (editor) => {
    setReadOnly(editor.document, false);
  });
  let clrCmd = vscode.commands.registerTextEditorCommand('markreadonly.readonlyNull', (editor) => {
    setReadOnly(editor.document, null);
  });
  let toggleCmd = vscode.commands.registerTextEditorCommand('markreadonly.readonlyToggle', (editor) => {
    setReadOnly(editor.document, 'toggle');
  });
  context.subscriptions.push(setCmdArgs, setCmdTrue, setCmdFalse, clrCmd, toggleCmd);

  function setReadOnly(doc: vscode.TextDocument, value: boolean | null | 'toggle' = 'toggle') {
    console.log(`setReadOnly: doc.fsPath=${doc.fileName}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const noGlobs = { '/settings/folder': true, '**/settings.json': true };
    if (anyGlobMatches(noGlobs, doc)) { return; } // IGNORE WHEN EDITING settings.json
    const path = doc.fileName;
    const key = 'files.readonlyPath';
    // const [section, rest] = key.split('.', 2);
    // const config = vscode.workspace.getConfiguration(section, null);
    const pathValue: ReadonlyPath = {};
    pathValue[path] = value;
    const basename = path.split(/\/|\\/).reverse()[0];
    vscode.workspace.getConfiguration().update(key, pathValue, true); // false: WORKSPACE, true: GLOBAL
    vscode.window.showInformationMessage(`readonlyPath: { "${basename}": ${value} }`);
  }

  function editorForDocument(doc: vscode.TextDocument) {
    return vscode.window.visibleTextEditors.find((editor) => editor.document === doc);
  }

  function anyGlobMatches(globs: ReadonlyPath, document: vscode.TextDocument) {
    return !!(globs && Object.keys(globs).find(glob => (globs[glob] === true) && (vscode.languages.match({ pattern: glob }, document) !== 0)));
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
