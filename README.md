# Mark Readonly

This extension provide keybindable Commands to mark the current editor/buffer as Readonly (or NOT Readonly). The Commands override the Readonly status that is otherwise determined by the GlobPatterns in settings files.readonlyInclude/Exclude or the filesystem (chmod) or the Document Provider.

## Features

Defines 4 Commands: Set Readonly True, set Readonly False, Clear Readonly & Toggle Readonly.

Uses `files.readonlyPath` (in USER/settings.json) to override [the soon to arrive] `files.readonlyInclude` and `files.readonlyExclude` GlobPatterns and filesystem (chmod) and Document Provider, to make the current TextEditor/Buffer either _Readonly_ or _Editable_ on demand.

## Requirements

Works with [vscode branch file-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active) 

Coming soon to official vscode: upvote the PR [#161716](https://github.com/microsoft/vscode/issues/161716). 
The related issues [#161715](https://github.com/microsoft/vscode/issues/161715)
and [#4873](https://github.com/microsoft/vscode/issues/4873) 

## Extension Settings

## Known Issues

Does not modify the filesystem permissions; only marks the Editor/buffer as _Readonly_ or _Editable_.

Requires new/updated vscode which supports `files.readonly` settings. 

Clone and compile from https://github.com/jackpunt/vscode/tree/files-readonly-active.

## Release Notes

### 0.0.14
Remove superfluous 'Set Readonly' Command.

### 0.0.13 
Write files.readonlyPath (esp for 'toggle') to USER settings.json (works on files without a workspace)
You need to remove files.readonlyPath from any workspace/settings.json avoid interference.
Works with branch [vscode-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active)
### 0.0.11: New version of vscode implements 'toggle' in onDidChangeConfiguration()
Works with https://github.com/jackpunt/vscode/releases/tag/v0.0.11 (or later)

No implicit keybindings; please define your own.

Provide Commands: **Set Readonly True**, **Set Readonly False**, **Clear Readonly** and **Toggle Readonly** for keybinding.


