from backend import app
from backend import dbs
from backend import serviceTests

@app.route("/addTest", methods=['POST'])
def addTest():
    return serviceTests.addTestService()

@app.route("/removeTest/<id>", methods=['DELETE'])
def removeTest(id):
    return serviceTests.removeTestService(id)

@app.route("/getRandomTest", methods=['GET'])
def getRandomTest():
    return serviceTests.getRandomTestService()

@app.route("/checkTestAnswer", methods=['POST'])
def checkTestAnswer():
    return serviceTests.checkTestAnswerService()