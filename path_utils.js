
const vscode = require('vscode');
const utils = require("./utils")

exports.PathObject = () => {
    const pathObject = {}
    pathObject['workspace'] = vscode.workspace.workspaceFolders[0].uri.path;
    pathObject['relativePath'] = getRelativePath()
    pathObject['file'] = getCurrentFile(pathObject.relativePath)
    pathObject['app'] = getApp(pathObject.relativePath)
    pathObject['pathToFile'] = pathObject['relativePath'].replace(pathObject.file, "").replace(pathObject.app, "") + "/"
    pathObject['tests'] = 'tests/'

    return pathObject
}
exports.getFullTestPath = (settings, pathObject) => {
    const testPath = generateTestPath(settings, pathObject);
    if (!settings.CreateFromFileName && !(createMigrationTest(pathObject, settings))) {
        let highlight = utils.getSelectedText();
        if (highlight) {
            let filename = generateTestFileName(highlight);
            return `${pathObject.workspace}/${utils.removePyFromFileName(testPath)}/${filename}`;
        }
    }
    else {
        let filename = generateTestFileName(pathObject.file);
        return `${pathObject.workspace}/tests/${pathObject.pathToFile}/${utils.removePyFromFileName(filename)}`;
    }

    return ''
}
const createMigrationTest = (pathObject, settings) => {
    // If MigrationsCreateFromFileName is True and it is a migration create test file from file name.
    return pathObject.relativePath.includes("migrations") && settings.MigrationsCreateFromFileName
}
const generateTestPath = (settings, pathObject) => {
    let pathSlices = settings.TestFileStructure.split("/")
    var path = ""
    pathSlices.forEach(element => {
        path += `${pathObject[element.replace(".py", "")]}`

    });
    return path
}
const getRelativePath = () => {
    let ws = vscode.workspace.workspaceFolders[0].uri.path;
    let path = vscode.window.activeTextEditor.document.fileName
    path = path.replace(ws + "/", "")
    return path
}

const getApp = (path) => {
    let slashIndex = path.indexOf('/') + 1
    let appFolder = path.substring(0, slashIndex)
    return appFolder
}
const getCurrentFile = (path) => {
    let lastSlash = path.lastIndexOf("/")
    let file = path.substring(lastSlash + 1, path.length)
    return file
}


const generateTestFileName = (name) => {
    const camelToSnakeCase = str => str.replace(/(((?<=[a-z])[A-Z])|([A-Z](?=[a-z])))/g, (letter, index) => { return index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase(); });
    let file = camelToSnakeCase(name)
    file = file.toLowerCase()
    if (file.startsWith("_")) {
        let i = file.indexOf("_")
        file = file.substring(i + 1, file.length)
    }
    file = file + ".py"
    if (!file.startsWith("test")) {
        return "test_" + file
    }

}