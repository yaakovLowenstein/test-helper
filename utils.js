const vscode = require('vscode');

exports.getSelectedText = () => {
    const editor = vscode.window.activeTextEditor;
    let selection = editor.selection;
    return editor.document.getText(selection);
}


exports.getSettings = () => {
    const settings = {};
    const config = vscode.workspace.getConfiguration("test-creator");

    settings['CreateFromFileName'] = config.get('CreateTests.CreateFromFileName');
    settings['TestFileStructure'] = config.get('CreateTests.TestFileStructure');
    settings['MigrationsCreateFromFileName'] = config.get('CreateTests.MigrationsCreateFromFileName');
    settings['RunTestCommand'] = config.get('RunTests.RunTestCommand');
    settings['RunTestInWatchMode'] = config.get('RunTests.RunTestInWatchMode');

    return settings;
}

exports.appendTestToFileName = (testPath) => {
    let lastSlash = testPath.lastIndexOf("/")
    return `${testPath.slice(0, lastSlash)}test_${testPath.slice(lastSlash + 1, testPath.length)}`
}
exports.removePyFromFileName = (testPath) => {
    return testPath.replace(".py", "");
}
