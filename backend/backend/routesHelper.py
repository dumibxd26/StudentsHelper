from backend import app
from backend import dbs
from backend import serviceHelper

@app.route("/loginHelper", methods=['POST'])
def loginHelper():
    return serviceHelper.loginHelperService()

@app.route("/registerHelper", methods=['POST'])
def registerHelper():
    return serviceHelper.registerHelperService()

@app.route("/getAllHelpers" , methods=['GET'])
def getHelpers():
    return serviceHelper.getAllHelpersService()

@app.route("/getHelper/<finder>" , methods=['GET'])
def getHelper(finder):
    return serviceHelper.getHelperService(finder)

@app.route("/deleteHelper/<id>" , methods=['DELETE'])
def deleteHelper(id):
    return serviceHelper.deleteHelperService(id)

@app.route("/updateHelper/<id>" , methods=['PUT'])
def updateHelper(id):
    return serviceHelper.updateHelperService(id)

# extra
@app.route("/checkTokenForFrontend/<token>" , methods=['GET'])
def checkTokenForFrontend(token):
    return serviceHelper.checkTokenForFrontendService(token)
