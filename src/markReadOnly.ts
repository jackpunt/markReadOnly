import * as vscode from 'vscode';

/**
 * build using: 'Tasks: run build task'
 * test using: Run and Debug |> Run Extension
 * set VERSION in package.json!
 * compile to vsix: vsce package
 * install extension from vsix [in files-readonly branch]
 */
type ReadonlyPath = [path: string, value: boolean | null];
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let setCmd = vscode.commands.registerCommand('markreadonly.setReadonly', (...args) => {
    let arg = args[0] as string;
    let value: boolean | 'toggle' = arg === 'toggle' ? arg : arg === 'false' ? false : true;
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, value);
	});
	let clrCmd = vscode.commands.registerCommand('markreadonly.clearReadonly', () => {
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, null);
	});
	let toggleCmd = vscode.commands.registerCommand('markreadonly.toggleReadonly', () => {
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, 'toggle');
	});
	context.subscriptions.push(setCmd, clrCmd, toggleCmd);

  function setReadOnly(doc: vscode.TextDocument, value: boolean | null | 'toggle') {
    console.log(`setReadOnly: doc.fsPath=${doc.fileName}`);
    const inGlobs = ["/settings/folder", "**/settings.json"];
    if (inGlobs.find(glob => matchGlob(doc, glob))) { return; } // IGNORE WHEN EDITING settings.json
    const path = doc.fileName;
    const key = 'files.readonlyPath'
    const keys = key.split('.', 2);
    const config = vscode.workspace.getConfiguration(keys[0], null);
    const oldAry = config.get<ReadonlyPath>(keys[1]);
    const oldValue = oldAry && oldAry[1];
    const newValue = (value === 'toggle') ? !oldValue : value;
    const keyValue: ReadonlyPath = [ path, newValue ];
    vscode.workspace.getConfiguration().update(key, keyValue, false); // false: WORKSPACE, true: GLOBAL
    vscode.window.showInformationMessage(`setReadOnly: ${value} [${oldValue} -> ${newValue}]`);
  }

   function matchGlob(document: vscode.TextDocument, glob: string) {
    return vscode.languages.match({ pattern: glob }, document) !== 0;
  }

}

// this method is called when your extension is deactivated
export function deactivate() {}
