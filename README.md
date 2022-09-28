# markReadOnly README

This is the README for extension "markReadOnly". 

## Features

Defines 3 commands: Set Readonly, Clear Readonly & Toggle Readonly. 

Uses files.readonlyPath to override [the soon to arrive] setReadonlyFromConfig settings.

* Toggle Readonly is bound to ^X^Q (like emacs 'read-only-mode')
* Clear Readonly sets readonlyPath value to 'null'; defering to setReadonlyFromConfig & filesystem.
* Set Readonly accepts an arg: true, false, null, 'toggle'. 

## Requirements

Works with my vscode branch file-readonly-active (hopefully coming soon to official vscode)

## Extension Settings

## Known Issues

Does not modify the filesystem permissions; only enables/disables the Editor from modifying the buffer.

## Release Notes


### 0.0.7

works with [vscode-readonly-active](https://github.com/jackpunt/vscode/tree/files-readonly-active)


