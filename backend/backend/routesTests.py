from backend import app
from backend import dbs
from backend import serviceTests

@app.route("/addTest", methods=['POST'])
def addTest():
    return serviceTests.addTestService()

@app.route("/removeTest/<testNumberDelete>", methods=['DELETE'])
def removeTest(testNumberDelete):
    return serviceTests.removeTestService(testNumberDelete)

@app.route("/getRandomTest", methods=['GET'])
def getRandomTest():
    return serviceTests.getRandomTestService()

@app.route("/checkTestAnswer", methods=['POST'])
def checkTestAnswer():
    return serviceTests.checkTestAnswerService()

@app.route("/getNumberOfTests", methods=['GET'])
def getNumberOfTests():
    return serviceTests.getNumberOfTestsService()