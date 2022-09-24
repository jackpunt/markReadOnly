// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import * as editorBrowser from 'vs/editor/browser/editorBrowser';

// TODO: watch for ConfigurationChangeEvent(evt) with evt.affectsConfiguration(ext)

// https://github.com/microsoft/vscode/issues/33823

// const myProvider = new (class implements vscode.TextDocumentContentProvider {
//   provideTextDocumentContent(uri: vscode.Uri): string {
//     // invoke cowsay, use uri-path as text
//     return cowsay.say({ text: uri.path });
//   }
// })();


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
  // vscode.workspace.registerTextDocumentContentProvider(ext, myProvider);

  //Create output channel
  let orange = vscode.window.createOutputChannel("Orange");
  orange.show();

  // The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable1 = vscode.commands.registerCommand('markreadonly.setReadonly', (...args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
    let arg = args[0] as string;
    let value: boolean | 'toggle' = arg == 'toggle' ? arg : arg == 'false' ? false : true;
    let config = vscode.workspace.getConfiguration(ext);
    const inGlobs: string[] | undefined = config.get("include");
    console.log("markReadOnly.include:", inGlobs);
    const exGlobs: string[] | undefined = config.get("exclude");
    console.log("markReadOnly.exclude:", exGlobs);
    vscode.window.showInformationMessage('setReadOnly!');
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, value);
	});
	let disposable2 = vscode.commands.registerCommand('markreadonly.setWriteable', () => {
		vscode.window.showInformationMessage('setWriteable!');
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, false);
	});
	let disposable3 = vscode.commands.registerCommand('markreadonly.toggleReadonly', () => {
		vscode.window.showInformationMessage('toggleReadonly!');
    vscode.window.activeTextEditor && setReadOnly(vscode.window.activeTextEditor.document, 'toggle');
	});
	context.subscriptions.push(disposable2, disposable1);

  vscode.workspace.onDidOpenTextDocument(maybeSetReadOnly);

  function maybeSetReadOnly(doc: vscode.TextDocument) {
    let config = vscode.workspace.getConfiguration(ext);
    console.log("didOpenTextDocument:", doc.fileName);
    orange.appendLine("didOpen: "+doc.fileName);
    const inGlobs: string[] | undefined = config.get("include");
    //const inGlobs = [ "**/*.txt", "/settings/folder", "**/settings.json"];
    console.log("markReadOnly.include:", inGlobs);
    const exGlobs: string[] | undefined = config.get("exclude");
    console.log("markReadOnly.exclude:", exGlobs);
    if (inGlobs?.find(glob => matchGlob(doc, glob))) { 
      if (!exGlobs?.find(glob => matchGlob(doc, glob))) {
        setReadOnly(doc);
      }
     }
  }

  function setReadOnly(doc: vscode.TextDocument, value: boolean | 'toggle' = true) {
    const config = vscode.workspace.getConfiguration();
    var foo = config.get('readOnly');
    //let editor0 = vscode.window.activeTextEditor;
    let editor1: vscode.TextEditor;
    orange.appendLine("setReadOnly: "+doc.fileName);
    const editor = editorForDocument(doc);
    console.log("doc.fileName=", doc.fileName, "editor=", editor);
    if (!editor) {
      vscode.window.showTextDocument(doc).then( editor => setEditorReadOnly(editor, value) );
    } else {
      setEditorReadOnly(editor, value);
    }
  }

  function setEditorReadOnly(editor: vscode.TextEditor, value: boolean | 'toggle' = true) {
    editor.options.readOnly = (value == 'toggle') ? !editor.options.readOnly : value;
    console.log(editor.document.fileName +": readOnly="+editor.options.readOnly);
    vscode.CodeAction
    //let model = (editor as editorBrowser.ICodeEditor).getModel();
    //model.updateOptions({ readOnly: value });

    // editorControl.getModel() => ITextModel
		// editor?.options;
    // this._diffEditor.updateOptions({ readOnly: true });

    // EditorConfiguration.options.updateOptions({ readOnly: value });

  }
  function matchGlob(document: vscode.TextDocument, glob: string) {
    return vscode.languages.match({ pattern: glob }, document) !== 0;
  }

  function editorForDocument(doc: vscode.TextDocument) {
    return vscode.window.visibleTextEditors.find((editor) => editor.document === doc);
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