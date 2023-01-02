from backend import dbs

from flask import request, Response
import json

def registerHelperService():
    req = request.get_json()

    newHelper = dbs.Helper(req['firstName'], req['lastName'], req['email'], req['password'], req['college'], req['faculty'] ,req['workGoogle'], req['workMeta'], req['workBloomberg'], req['workAmazon'], req['workMicrosoft'], req['workApple'], req['workHedgeFund'], req['workingCompanies'], req['GPA'], req['contestsScore'])

    dbs.db.session.add(newHelper)
    dbs.db.session.commit()

    data = {
        'id': newHelper.id,
        'firstName': newHelper.firstName,
        'lastName': newHelper.lastName,
        'email': newHelper.email,
        'password': newHelper.password,
        'college': newHelper.college,
        'faculty': newHelper.faculty,
        'workGoogle': newHelper.workGoogle,
        'workMeta': newHelper.workMeta,
        'workBloomberg': newHelper.workBloomberg,
        'workAmazon': newHelper.workAmazon,
        'workMicrosoft': newHelper.workMicrosoft,
        'workApple': newHelper.workApple,
        'workHedgeFund': newHelper.workHedgeFund,
        'workingCompanies': newHelper.workingCompanies,
        'GPA': newHelper.GPA,
        'contestsScore': newHelper.contestsScore
    }

    r = Response(response=json.dumps({"message": "created", "data": data}), status=201, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getAllHelpersService(): 
    helpers = dbs.Helper.query.all()
    output = []

    for helper in helpers:
        helper_data = {}
        helper_data['id'] = helper.id
        helper_data['firstName'] = helper.firstName
        helper_data['lastName'] = helper.lastName
        helper_data['email'] = helper.email
        helper_data['password'] = helper.password
        helper_data['college'] = helper.college
        helper_data['faculty'] = helper.faculty
        helper_data['workGoogle'] = helper.workGoogle
        helper_data['workMeta'] = helper.workMeta
        helper_data['workBloomberg'] = helper.workBloomberg
        helper_data['workAmazon'] = helper.workAmazon
        helper_data['workMicrosoft'] = helper.workMicrosoft
        helper_data['workApple'] = helper.workApple
        helper_data['workHedgeFund'] = helper.workHedgeFund
        helper_data['workingCompanies'] = helper.workingCompanies
        helper_data['GPA'] = helper.GPA
        helper_data['contestsScore'] = helper.contestsScore
        output.append(helper_data)

    r = Response(response=json.dumps({"message": "succes", "data": output}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getHelperService(email):
    helper = dbs.Helper.query.filter_by(email=email).first()
    helper_data = {}
    helper_data['id'] = helper.id
    helper_data['firstName'] = helper.firstName
    helper_data['lastName'] = helper.lastName
    helper_data['email'] = helper.email
    helper_data['password'] = helper.password
    helper_data['college'] = helper.college
    helper_data['faculty'] = helper.faculty
    helper_data['workGoogle'] = helper.workGoogle
    helper_data['workMeta'] = helper.workMeta
    helper_data['workBloomberg'] = helper.workBloomberg
    helper_data['workAmazon'] = helper.workAmazon
    helper_data['workMicrosoft'] = helper.workMicrosoft
    helper_data['workApple'] = helper.workApple
    helper_data['workHedgeFund'] = helper.workHedgeFund
    helper_data['workingCompanies'] = helper.workingCompanies
    helper_data['GPA'] = helper.GPA
    helper_data['contestsScore'] = helper.contestsScore

    r = Response(response=json.dumps({"message": "succes", "data": helper_data}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def deleteHelperService(id):
    helper = dbs.Helper.query.filter_by(id=id).first()

    if (helper):
        dbs.db.session.delete(helper)
        dbs.db.session.commit()
        r = Response(response=json.dumps({"message": f"Helper {helper} had been deleted from the database"}), status=200, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r
    else:
        r = Response(response=json.dumps({"message": f"Helper does not exist in the database"}), status=404, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

def updateHelperService(id):
    helper = dbs.Helper.query.filter_by(id=id).first()
    helper.firstName = request.json['firstName']
    helper.lastName = request.json['lastName']
    helper.email = request.json['email']
    helper.password = request.json['password']
    helper.college = request.json['college']
    helper.workGoogle = request.json['workGoogle']
    helper.workMeta = request.json['workMeta']
    helper.workBloomberg = request.json['workBloomberg']
    helper.workAmazon = request.json['workAmazon']
    helper.workMicrosoft = request.json['workMicrosoft']
    helper.workApple = request.json['workApple']
    helper.workHedgeFund = request.json['workHedgeFund']
    helper.workingCompanies = request.json['workingCompanies']
    helper.GPA = request.json['GPA']
    helper.contestsScore = request.json['contestsScore']
    
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Helper {helper} had been updated"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

