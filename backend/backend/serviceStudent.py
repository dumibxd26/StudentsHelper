from backend import dbs

from flask import request, Response
from werkzeug.security import generate_password_hash, check_password_hash
import json

import jwt
from datetime import datetime, timedelta

def loginStudentService():
    req = request.get_json()

    student = dbs.Student.query.filter_by(email=req['email']).first()

    if not student:
        return Response(response=json.dumps({"message": "Wrong credentials"}), status=403, mimetype="application/json")

    if check_password_hash(student.password, req['password']):
        token = jwt.encode({'id': student.id, 'userType': 'student',  'exp' : datetime.utcnow() + timedelta(days=7)}, 'SECRET_KEY')

        data = {
            "id": student.id,
            "firstName": student.firstName,
            "lastName": student.lastName,
            "email": student.email,
            "password": student.password,
            "school": student.school,
            "GPA": student.GPA,
            "contestsScore": student.contestsScore,
            "testsScore": student.testsScore,
            "testsSolved": student.testsSolved
        }

        r = Response(response=json.dumps({"message": "logged in", "data": data, "token": token}), status=200, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

    return Response(response=json.dumps({"message": "Wrong credentials"}), status=403, mimetype="application/json")



def registerStudentService():
    req = request.get_json()

    if dbs.Student.query.filter_by(email=req['email']).first():
        return Response(response=json.dumps({"message": "User already exists"}), status=400, mimetype="application/json")
    
    password = generate_password_hash(req['password'], method='sha256')

    newStudent = dbs.Student(req['firstName'], req['lastName'], req['email'], password, req['school'], req['GPA'], req['contestsScore'], req['testsScore'], req['testsSolved'])

    dbs.db.session.add(newStudent)
    dbs.db.session.commit()

    data = {
        "id": newStudent.id,
        "firstName": newStudent.firstName,
        "lastName": newStudent.lastName,
        "email": newStudent.email,
        "password": newStudent.password,
        "school": newStudent.school,
        "GPA": newStudent.GPA,
        "contestsScore": newStudent.contestsScore,
        "testsScore": newStudent.testsScore,
        "testsSolved": newStudent.testsSolved
    }
     
    token = jwt.encode({'id': newStudent.id, 'userType': 'student', 'exp' : datetime.utcnow() + timedelta(days=7)}, 'SECRET_KEY')


    r = Response(response=json.dumps({"message": "created", "data": data, "token": token}), status=201, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getAllStudentsService():
    students = dbs.Student.query.all()
    output = []

    for student in students:
        student_data = {}
        # student_data['id'] = student.id
        student_data['firstName'] = student.firstName
        student_data['lastName'] = student.lastName
        student_data['email'] = student.email
        # student_data['password'] = student.password
        student_data['school'] = student.school
        student_data['GPA'] = student.GPA
        student_data['contestsScore'] = student.contestsScore
        student_data['testsScore'] = student.testsScore
        student_data['testsSolved'] = student.testsSolved
        output.append(student_data)

    r = Response(response=json.dumps({"message": "success", "data": output}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getStudentService(email):
    student = dbs.Student.query.filter_by(email=email).first()

    if not student:
        return Response(response=json.dumps({"message": "User does not exist"}), status=400, mimetype="application/json")

    student_data = {}
    student_data['id'] = student.id
    student_data['firstName'] = student.firstName
    student_data['lastName'] = student.lastName
    student_data['email'] = student.email
    # student_data['password'] = student.password
    student_data['school'] = student.school
    student_data['GPA'] = student.GPA
    student_data['contestsScore'] = student.contestsScore
    student_data['testsScore'] = student.testsScore
    student_data['testsSolved'] = student.testsSolved

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

        studentQuery = dbs.Student.query\
            .filter_by(id = data['id'])\
            .first()
        

        if (int(studentQuery.id) == int(student_data['id'])):
            modify = True
    except:
            return json.dumps({
            'message' : 'Server failure !!'
            }), 500

    r = Response(response=json.dumps({"message": "success", "data": student_data, "modify" : modify}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def deleteStudentService(id): #merge

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

        student = dbs.Student.query\
            .filter_by(id = data['id'])\
            .first()

        if (not student or int(student.id) != int(id)):
            return json.dumps({
            'message' : 'Forbidden !!'
            }), 403
    except:
            return json.dumps({
            'message' : 'Token is invalid !!'
            }), 401    

    # student = dbs.Student.query.filter_by(id=id).first()

    if (student):
        dbs.db.session.delete(student)
        dbs.db.session.commit()
        r = Response(response=json.dumps({"message": f"Student {student} had been deleted from the database"}), status=200, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r
    else:
        r = Response(response=json.dumps({"message": f"Student does not exist in the database"}), status=404, mimetype="application/json")
        r.headers["Content-Type"] = "application/json; charset=utf-8"
        return r

def updateStudentService(id): #merge
    req = request.get_json()

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
        
        student = dbs.Student.query\
            .filter_by(id = data['id'])\
            .first()

        if (not student or int(student.id) != int(id)):
            return json.dumps({
            'message' : 'Forbidden !!'
            }), 403
    except:
        return json.dumps({
        'message' : 'Token is invalid !!'
        }), 401

            
    # student = dbs.Student.query.filter_by(id=id).first()

    if 'addTest' in req:
        student.testsScore += int(req['addTest'])
        student.testsSolved += 1
    
    print(req)

    if 'firstName' in req:  
        student.firstName = req['firstName']
    if 'lastName' in req:
        student.lastName = req['lastName']
    if 'password' in req:
        student.password = req['password']
    if 'school' in req:
        student.school = req['school']
    if 'GPA' in req:
        student.GPA = req['GPA']
    if 'contestsScore' in req:
        student.contestsScore = req['contestsScore']
    if 'testsScore' in req:
        student.testsScore = req['testsScore']
    
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Student {student} had been updated in the database"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r