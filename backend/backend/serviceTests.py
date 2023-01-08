from backend import dbs
from flask import request, Response
import json
import random

def getNumberOfTestsService():

    numberOfTest = dbs.Test.query.count()

    r = Response(response=json.dumps({"message": "Number of tests", "data": numberOfTest}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def addTestService():
    req = request.get_json()

    nextTestNumber = dbs.Test.query.count() + 1

    newTest = dbs.Test(nextTestNumber, req['Q1'], req['Q2'], req['Q3'], req['Q4'], req['Q5'], req['Q6'], req['Q7'], req['Q8'], req['Q9'], req['Q10'],
                       req['Q1A'], req['Q2A'], req['Q3A'], req['Q4A'], req['Q5A'], req['Q6A'], req['Q7A'], req['Q8A'], req['Q9A'], req['Q10A'])

    dbs.db.session.add(newTest)
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Test {nextTestNumber} added"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def removeTestService(testNumberDelete):
    testToDelete = dbs.Test.query.filter_by(testNumber=testNumberDelete).first()

    if (testToDelete == None):
        r = Response(response=json.dumps({"message": "Test not found"}), status=404, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

    dbs.db.session.delete(testToDelete)
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Test {testNumberDelete} deleted"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getRandomTestService():
    numberOfTest = dbs.Test.query.count()
    randomTestNumber = random.randint(1, numberOfTest)
    randomTest = dbs.Test.query.filter_by(testNumber=randomTestNumber).first()

    data = {
        "testNumber": randomTest.testNumber,
        "Q1": randomTest.Q1,
        "Q2": randomTest.Q2,
        "Q3": randomTest.Q3,
        "Q4": randomTest.Q4,
        "Q5": randomTest.Q5,
        "Q6": randomTest.Q6,
        "Q7": randomTest.Q7,
        "Q8": randomTest.Q8,
        "Q9": randomTest.Q9,
        "Q10": randomTest.Q10,
        "Q1A": randomTest.Q1A,
        "Q2A": randomTest.Q2A,
        "Q3A": randomTest.Q3A,
        "Q4A": randomTest.Q4A,
        "Q5A": randomTest.Q5A,
        "Q6A": randomTest.Q6A,
        "Q7A": randomTest.Q7A,
        "Q8A": randomTest.Q8A,
        "Q9A": randomTest.Q9A,
        "Q10A": randomTest.Q10A
    }

    r = Response(response=json.dumps({"message": f"Test {randomTestNumber}", "data": data}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def checkTestAnswerService():
    req = request.get_json()

    testNumber = req['testNumber']
    testToCheck = dbs.Test.query.filter_by(testNumber=testNumber).first()

    if (testToCheck == None):
        r = Response(response=json.dumps({"message": "Test not found"}), status=404, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

    correctAnswers = 0

    if (testToCheck.Q1A == req['Q1A']):
        correctAnswers += 1
    if (testToCheck.Q2A == req['Q2A']):
        correctAnswers += 1
    if (testToCheck.Q3A == req['Q3A']):
        correctAnswers += 1
    if (testToCheck.Q4A == req['Q4A']):
        correctAnswers += 1
    if (testToCheck.Q5A == req['Q5A']):
        correctAnswers += 1
    if (testToCheck.Q6A == req['Q6A']):
        correctAnswers += 1
    if (testToCheck.Q7A == req['Q7A']):
        correctAnswers += 1
    if (testToCheck.Q8A == req['Q8A']):
        correctAnswers += 1
    if (testToCheck.Q9A == req['Q9A']):
        correctAnswers += 1
    if (testToCheck.Q10A == req['Q10A']):
        correctAnswers += 1

    answers = {
        "Q1A": testToCheck.Q1A,
        "Q2A": testToCheck.Q2A,
        "Q3A": testToCheck.Q3A,
        "Q4A": testToCheck.Q4A,
        "Q5A": testToCheck.Q5A,
        "Q6A": testToCheck.Q6A,
        "Q7A": testToCheck.Q7A,
        "Q8A": testToCheck.Q8A,
        "Q9A": testToCheck.Q9A,
        "Q10A": testToCheck.Q10A
    }

    r = Response(response=json.dumps({"correctAnswersNumber": correctAnswers, "data": answers}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r