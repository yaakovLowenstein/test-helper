// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const { TextEncoder } = require('util');
const Path = require("./path_utils")
const utils = require("./utils")

function activate(context) {

	const settings = utils.getSettings();

	let createTestFile = vscode.commands.registerCommand('test-creator.createTestFile', function () {
		const pathObject = Path.PathObject()

		if (!pathObject.relativePath.endsWith('py')) {
			vscode.window.showErrorMessage(`Can only create test files for python files`);
			return false
		}

		var fullTestPath = Path.getFullTestPath(settings, pathObject)

		// Only execute if good test path
		if (fullTestPath) {
			let uri = vscode.Uri.file(fullTestPath);

			// If test file exists open it
			if (fs.existsSync(fullTestPath)) {
				vscode.workspace.openTextDocument(uri).then(document => {
					vscode.window.showTextDocument(uri)
				})
			}
			// If test file does not exist create it and open it
			else {
				vscode.workspace.fs.writeFile(uri, new TextEncoder().encode()).then(data => {
					vscode.window.showTextDocument(uri);

				});
			}
		}
		else {
			vscode.window.showErrorMessage("Nothing selected. To create a test you either need to select a function/class name to make the test from, or you need to change the setting to create tests from file name. See readMe for more info.")




		}
	});

	let runSelectedTest =
		vscode.commands.registerCommand('test-creator.runTest', function () {
			const pathObject = Path.PathObject()
			let path = pathObject.relativePath

			// Only run tests if in test file and python file
			if (!pathObject.file.startsWith("test") || !path.endsWith(".py")) {
				vscode.window.showErrorMessage(`File is either not a test file or not a python file.`);
				return false
			}
			let highlight = utils.getSelectedText()
			let terminal = vscode.window.createTerminal()
			let runInWatchMode = settings.RunTestInWatchMode ? " -w" : ""


			// If there is a selected test run that test
			if (highlight.startsWith("test")) {
				terminal.sendText(`${settings.RunTestCommand} ${path}::${highlight}${runInWatchMode}`)
			}
			// If no selected text, run all tests in file 
			else {
				terminal.sendText(`${settings.RunTestCommand} ${path}${runInWatchMode}`)
			}


		})
	context.subscriptions.push(createTestFile, runSelectedTest);


}


function deactivate() { }

module.exports = {
	activate,
	deactivate
}






