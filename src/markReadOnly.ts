// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// TODO: watch for ConfigurationChangeEvent(evt) with evt.affectsConfiguration(ext)

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const ext = "markReadOnly";
  // let allconfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
  // allconfig.update('markReadOnly.exclude', ["foo1", "foo2"]).then(() => {
  // let inspect = allconfig.inspect(ext);
  // console.log("inspect=", inspect, "has.markReadOnly=", allconfig.has(ext));
  // let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(ext);
  // });

  // The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable0 = vscode.commands.registerCommand('markreadonly.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code!');
	});
	let disposable1 = vscode.commands.registerCommand('markreadonly.setReadonly', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
    let config = vscode.workspace.getConfiguration(ext);
    const inGlobs: string[] | undefined = config.get("include");
    console.log("markReadOnly.include:", inGlobs);
    const exGlobs: string[] | undefined = config.get("exclude");
    console.log("markReadOnly.exclude:", exGlobs);
    vscode.window.showInformationMessage('setReadOnly!');
	});
	let disposable2 = vscode.commands.registerCommand('markreadonly.setWriteable', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('setWriteable!');
	});

	context.subscriptions.push(disposable2, disposable1, disposable0);

  vscode.workspace.onDidOpenTextDocument(maybeSetReadOnly);

  function maybeSetReadOnly(doc: vscode.TextDocument) {
    let config = vscode.workspace.getConfiguration(ext);
    console.log("didOpenTextDocument:", doc.fileName);
    const inGlobs: string[] | undefined = config.get("include");
    console.log("markReadOnly.include:", inGlobs);
    const exGlobs: string[] | undefined = config.get("exclude");
    console.log("markReadOnly.exclude:", exGlobs);
    if (!inGlobs) { return; }
    //const path = doc.fileName;
    inGlobs.forEach(inGlob => setReadOnlyIfDocInGlob(doc, inGlob, exGlobs));
  }

  function setReadOnlyIfDocInGlob(doc: vscode.TextDocument, glob: string, exGlobs: string[] | undefined) {
    if (!matchGlob(doc, glob)) { return; }
    let ex = exGlobs?.find(exGlob => matchGlob(doc, exGlob));
    if (ex) { return; }
  }
  function setReadOnly() {
    const config = vscode.workspace.getConfiguration();
    var foo = config.get('readOnly');
    let editor = vscode.window.activeTextEditor;
		// editor?.
    // this._diffEditor.updateOptions({ readOnly: true });

  }
  function matchGlob(document: vscode.TextDocument, glob: string) {
    return vscode.languages.match({ pattern: glob }, document) !== 0;
  }
}

// let folders = vscode.workspace.workspaceFolders;
// if (folders) {
//     let watcher = vscode.workspace.createFileSystemWatcher(
//         new vscode.RelativePattern(folders[0], "*.txt"));
//     watcher.onDidCreate(uri => console.log(`created ${uri}`));
// }
//  QQQQ: watcher.onDidOpenFile(uri => maybeReadOnly(uri)) ??

// onDidOpenTextDocument
// 		const options = super.getConfigurationOverrides();
// 		const readOnly = this.input?.hasCapability(EditorInputCapabilities.Readonly);

// const documentFilter: vscode.DocumentFilter = {
//   pattern: '**/*.md',
// };
// const matches = vscode.languages.match(documentFilter, document) !== 0;

// this method is called when your extension is deactivated
export function deactivate() {}


// connection.onDidOpenTextDocument((params) => {
//   // A text document was opened in VS Code.
//   // params.uri uniquely identifies the document. For documents stored on disk, this is a file URI.
//   // params.text the initial full content of the document.
// });