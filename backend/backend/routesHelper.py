from backend import app
from backend import dbs
from backend import serviceHelper

@app.route("/registerHelper", methods=['POST'])
def registerHelper():
    return serviceHelper.registerHelperService()

@app.route("/getAllHelpers" , methods=['GET'])
def getHelpers():
    return serviceHelper.getAllHelpersService()

@app.route("/getHelper/<email>" , methods=['GET'])
def getHelper(email):
    return serviceHelper.getHelperService(email)

@app.route("/deleteHelper/<id>" , methods=['DELETE'])
def deleteHelper(id):
    return serviceHelper.deleteHelperService(id)

@app.route("/updateHelper/<id>" , methods=['PUT'])
def updateHelper(id):
    return serviceHelper.updateHelperService(id)
