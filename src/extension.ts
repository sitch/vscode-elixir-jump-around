'use strict';
import * as vscode from 'vscode';
import fs from "fs"

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.jump', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const filePath = editor.document.uri.fsPath;
        if (isTestFilePath(filePath)) {
            const path = getModulePath(filePath);
            createAndOpen(path);
        } else {
            const path = getTestPath(filePath);
            createAndOpen(path);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}

function createAndOpen(path: string) {
    const uri = vscode.Uri.file(path);
    const edit = new vscode.WorkspaceEdit();
    edit.createFile(uri, { ignoreIfExists: true, overwrite: false });
    return vscode.workspace.applyEdit(edit).then(() => {
        vscode.workspace.openTextDocument(uri).then((doc) => {
             const contents = template(path)
             vscode.window.showTextDocument(doc)
                // TODO: IMPLEMENT
                // .then(textEditor => {
                //     // TODO: write file here
                // })
        }, () => {
            vscode.window.showInformationMessage('Error switching files!');
        });
    });
}

function getModuleName(filePath: string) {
    const contents = fs.readFileSync(filePath, 'utf8');
    const matches = contents.match(/defmodule\s+(.+)\s+do\s/)
    return matches[0]
  }

  function template(filePath: string) {
    const moduleFilePath = getModulePath(filePath);
    const module = getModuleName(moduleFilePath)
    return `defmodule ${module}Test do\n  describe ".method/0" do\n    test "with valid params" do\n      raise "Not Implemented"\n    end\n  end\nend\n`
  }

function getModulePath(filePath: string) {
    return filePath.replace("test/lib", "lib").replace(/_test\.exs$/, ".ex");
}

function getTestPath(filePath: string) {
    return filePath.replace("lib", "test/lib").replace(/\.ex$/, "_test.exs");
}

function isTestFilePath(filePath: string) {
    return filePath.match(/test\/.+_test\.exs$/);
}
