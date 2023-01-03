from backend import dbs

from flask import request, Response
from werkzeug.security import generate_password_hash, check_password_hash
import json

import jwt
from datetime import datetime, timedelta

def checkTokenForFrontendService(token):
    
    try:
        data = jwt.decode(token, 'SECRET_KEY' , algorithms=["HS256"])

        # check if it is expired
        if data['exp'] < datetime.utcnow().timestamp():
            r = Response(response=json.dumps({"message": "Token expired"}), status=403, mimetype="application/json")
            r.headers["Content-Type"] = "application/json; charset=utf-8"
            return r
        
        userType = data['userType']

        r = Response(response=json.dumps({"message": "Token valid", "userType": userType}), status=200, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r
    except:
        r = Response(response=json.dumps({"message": "Token invalid"}), mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r


def loginHelperService():
    req = request.get_json()

    helper = dbs.Helper.query.filter_by(email=req['email']).first()

    if not helper:
        return Response(response=json.dumps({"message": "Wrong credentials"}), status=403, mimetype="application/json")

    if check_password_hash(helper.password, req['password']):
        token = jwt.encode({'id': helper.id, 'userType': 'helper',  'exp' : datetime.utcnow() + timedelta(days=7)}, 'SECRET_KEY')

        data = {
            'id': helper.id,
            'firstName': helper.firstName,
            'lastName': helper.lastName,
            'email': helper.email,
            'password': helper.password,
            'college': helper.college,
            'faculty': helper.faculty,
            'workGoogle': helper.workGoogle,
            'workMeta': helper.workMeta,
            'workBloomberg': helper.workBloomberg,
            'workAmazon': helper.workAmazon,
            'workMicrosoft': helper.workMicrosoft,
            'workApple': helper.workApple,
            'workHedgeFund': helper.workHedgeFund,
            'workingCompanies': helper.workingCompanies,
            'GPA': helper.GPA,
            'contestsScore': helper.contestsScore
        }

        r = Response(response=json.dumps({"message": "logged in", "data": data, "token": token}), status=200, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

    return Response(response=json.dumps({"message": "Wrong credentials"}), status=403, mimetype="application/json")

def registerHelperService():
    req = request.get_json()

    if dbs.Helper.query.filter_by(email=req['email']).first():
        return Response(response=json.dumps({"message": "User already exists"}), status=400, mimetype="application/json")

    password = generate_password_hash(req['password'], method='sha256')

    newHelper = dbs.Helper(req['firstName'], req['lastName'], req['email'], password, req['college'], req['faculty'] ,req['workGoogle'], req['workMeta'], req['workBloomberg'], req['workAmazon'], req['workMicrosoft'], req['workApple'], req['workHedgeFund'], req['workingCompanies'], req['GPA'], req['contestsScore'])

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

    token = jwt.encode({'id': newHelper.id, 'userType': 'helper', 'exp' : datetime.utcnow() + timedelta(days=7)}, 'SECRET_KEY')

    r = Response(response=json.dumps({"message": "created", "data": data, "token": token}), status=201, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getAllHelpersService(): 
    helpers = dbs.Helper.query.all()
    output = []

    for helper in helpers:
        helper_data = {}
        # helper_data['id'] = helper.id
        helper_data['firstName'] = helper.firstName
        helper_data['lastName'] = helper.lastName
        helper_data['email'] = helper.email
        # helper_data['password'] = helper.password
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

    if not helper:
        return Response(response=json.dumps({"message": "Helper not found"}), status=404, mimetype="application/json")

    helper_data = {}
    helper_data['id'] = helper.id
    helper_data['firstName'] = helper.firstName
    helper_data['lastName'] = helper.lastName
    helper_data['email'] = helper.email
    # helper_data['password'] = helper.password
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

    modify = False
    token = None

    if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
    if not token:
        return json.dumps({'error' : 'Token is missing !!', "modify": modify}), 401

    try:
        # decoding the payload to fetch the stored details
        data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])

        if (data['exp'] < datetime.utcnow().timestamp()):
            return json.dumps({
            'message' : 'Token is expired !!'
            }), 401

        helperQuery = dbs.Helper.query\
            .filter_by(id = data['id'])\
            .first()
        

        if (int(helperQuery.id) == int(helper_data['id'])):
            modify = True
    except:
            return json.dumps({
            'message' : 'Server failure !!'
            }), 500

    r = Response(response=json.dumps({"message": "succes", "data": helper_data, "modify": modify}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def deleteHelperService(id):

    token = None

    if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
    if not token:
        return json.dumps({'error' : 'Token is missing !!'}), 401

    try:
    # decoding the payload to fetch the stored details
        data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])

        if (data['exp'] < datetime.utcnow().timestamp()):
            return json.dumps({
            'message' : 'Token is expired !!'
            }), 401

        helper = dbs.Helper.query\
            .filter_by(id = data['id'])\
            .first()

        if (not helper or int(helper.id) != int(id)):
            return json.dumps({
            'message' : 'Forbidden !!'
            }), 403
    except:
            return json.dumps({
            'message' : 'Token is invalid !!'
            }), 401    

    # helper = dbs.Helper.query.filter_by(id=id).first()

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

    token = None

    if 'x-access-token' in request.headers:
        token = request.headers['x-access-token']
    # return 401 if token is not passed
    if not token:
        return json.dumps({'error' : 'Token is missing !!'}), 401

    try:
    #decoding the payload to fetch the stored details
        data = jwt.decode(token, 'SECRET_KEY', algorithms=["HS256"])

        if (data['exp'] < datetime.utcnow().timestamp()):
            return json.dumps({
            'message' : 'Token is expired !!'
            }), 401
        
        helper = dbs.Helper.query\
            .filter_by(id = data['id'])\
            .first()

        if (not helper or int(helper.id) != int(id)):
            return json.dumps({
            'message' : 'Forbidden !!'
            }), 403
    except:
        return json.dumps({
        'message' : 'Token is invalid !!'
        }), 401

    # helper = dbs.Helper.query.filter_by(id=id).first()
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

