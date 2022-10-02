# markReadOnly README

This is the README for extension "markReadOnly". 

## Features

Defines 4 Commands: Set Readonly True, set Readonly False, Clear Readonly & Toggle Readonly.

Uses `files.readonlyPath` to override [the soon to arrive] `files.readonlyInclude/Exclude` settings.

* Toggle Readonly is bound to ^X^Q (like emacs 'read-only-mode')
* Clear Readonly is bound to ^U^Q sets `readonlyPath` value to 'null'; defering to `files.readonlyInclude/Exclude` & filesystem.

## Requirements

Works with my [vscode branch file-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active) 
Hopefully coming soon to official vscode: upvote at [#161715](https://github.com/microsoft/vscode/issues/161715)

## Extension Settings

## Known Issues

The extension uses the workspace settings.json; so you must have a workspace open

Does not modify the filesystem permissions; only enables/disables the Editor from modifying the buffer.

## Release Notes

0.0.11: New version of vscode implements 'toggle' in onDidChangeConfiguration()
Works with https://github.com/jackpunt/vscode/releases/tag/v0.0.11

Restore Command: **Set Readonly** which takes an argument (value: boolean | null | 'toggle' = true)

Remove implicit keybindings; please define your own.

Rename Commands: **Set Readonly True**, **Set Readonly False**, **Clear Readonly** & **Toggle Readonly** for easier keybinding (without supplying the true|false|null|'toggle' arg)

all the Commands invoke internal function: `setReadOnly(value: boolean | null | 'toggle')`

### 0.0.11

Works with branch [vscode-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active)


