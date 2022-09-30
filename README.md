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

Rename commnads: Set Readonly True, set Readonly False, Clear Readonly & Toggle Readonly for easier keybinding (without supplying the true|false|null|'toggle' arg)

internal functions: readonlyTrue, readonlyFalse, readonlyNull, readonlyToggle

Include keybinding for Toggle Readonly (ctrl-x ctrl-q) and Clear Readonly (ctrl-u ctrl-q)

### 0.0.9

Works with branch [vscode-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active)


