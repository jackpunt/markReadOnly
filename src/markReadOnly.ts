import * as vscode from 'vscode';

/*
 * build using: 'Tasks: run build task'
 * test using: Run and Debug |> Run Extension
 * set VERSION in package.json!
 * compile to vsix: vsce package
 * install extension from vsix [in files-readonly branch]
 */

type ReadonlyPath = { [path: string]: boolean | null | 'toggle' } | undefined;
const key = 'files.readonlyPath';

export function activate(context: vscode.ExtensionContext) {
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
  context.subscriptions.push(setCmdTrue, setCmdFalse, clrCmd, toggleCmd);

  function setReadOnly(doc: vscode.TextDocument, value: boolean | null | 'toggle' = 'toggle') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const noGlobs = { '/settings/folder': true, '**/settings.json': true };
    if (anyGlobMatches(noGlobs, doc)) { return; } // IGNORE WHEN EDITING settings.json
    const path = doc.fileName;
    const pathValue: ReadonlyPath = {}; 
    pathValue[path] = value;
    vscode.workspace.getConfiguration().update(key, pathValue, true); // false: WORKSPACE, true: GLOBAL
    const basename = path.split(/\/|\\/).reverse()[0];
    vscode.window.showInformationMessage(`readonlyPath: { "${basename}": ${value} }`);
  }

  function anyGlobMatches(globs: ReadonlyPath, document: vscode.TextDocument) {
    return !!(globs && Object.keys(globs).find(glob => (globs[glob] === true) && (vscode.languages.match({ pattern: glob }, document) !== 0)));
  }
}

// this method is called when extension is deactivated
export function deactivate() {}
