from backend import dbs
from flask import request, Response
import json
import random

def getNumberOfTestsService():

    numberOfTest = dbs.Test.query.count()
    return numberOfTest
    
def addTestService():
    req = request.get_json()

    newTest = dbs.Test(req['Q1'], req['Q2'], req['Q3'], req['Q4'], req['Q5'], req['Q6'], req['Q7'], req['Q8'], req['Q9'], req['Q10'],
                       req['Q1A'], req['Q2A'], req['Q3A'], req['Q4A'], req['Q5A'], req['Q6A'], req['Q7A'], req['Q8A'], req['Q9A'], req['Q10A'])

    dbs.db.session.add(newTest)
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": "New test added"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def removeTestService(id):
    testToDelete = dbs.Test.query.filter_by(id=id).first()

    if (testToDelete == None):
        r = Response(response=json.dumps({"message": "Test not found"}), status=404, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

    dbs.db.session.delete(testToDelete)
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Test deleted"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getRandomTestService():
    numberOfTest = getNumberOfTestsService()
    randomTestNumber = random.randint(1, numberOfTest)

    randomTest = dbs.Test.query.offset(randomTestNumber - 1).first()

    print(randomTest.id)

    data = {
        "id": randomTest.id,
        "Q1": randomTest.Q1,
        "Q2": randomTest.Q2,
        "Q3": randomTest.Q3,
        "Q4": randomTest.Q4,
        "Q5": randomTest.Q5,
        "Q6": randomTest.Q6,
        "Q7": randomTest.Q7,
        "Q8": randomTest.Q8,
        "Q9": randomTest.Q9,
        "Q10": randomTest.Q10
    }

    r = Response(response=json.dumps({"data": data}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def checkTestAnswerService():
    req = request.get_json()

    testNumber = req['id']
    testToCheck = dbs.Test.query.filter_by(id=testNumber).first()

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