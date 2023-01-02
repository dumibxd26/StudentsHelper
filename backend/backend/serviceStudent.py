from backend import dbs

from flask import request, Response
import json

def registerStudentService():
    req = request.get_json()

    newStudent = dbs.Student(req['firstName'], req['lastName'], req['email'], req['password'], req['school'], req['GPA'], req['contestsScore'], req['testsScore'], req['testsSolved'])

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

    r = Response(response=json.dumps({"message": "created", "data": data}), status=201, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def getAllStudentsService():
    students = dbs.Student.query.all()
    output = []

    for student in students:
        student_data = {}
        student_data['id'] = student.id
        student_data['firstName'] = student.firstName
        student_data['lastName'] = student.lastName
        student_data['email'] = student.email
        student_data['password'] = student.password
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
    student_data = {}
    student_data['id'] = student.id
    student_data['firstName'] = student.firstName
    student_data['lastName'] = student.lastName
    student_data['email'] = student.email
    student_data['password'] = student.password
    student_data['school'] = student.school
    student_data['GPA'] = student.GPA
    student_data['contestsScore'] = student.contestsScore
    student_data['testsScore'] = student.testsScore
    student_data['testsSolved'] = student.testsSolved

    r = Response(response=json.dumps({"message": "success", "data": student_data}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

def deleteStudentService(id):
    student = dbs.Student.query.filter_by(id=id).first()

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

def updateStudentService(id):
    student = dbs.Student.query.filter_by(id=id).first()
    student.firstName = request.json['firstName']
    student.lastName = request.json['lastName']
    student.email = request.json['email']
    student.password = request.json['password']
    student.school = request.json['school']
    student.GPA = request.json['GPA']
    student.contestsScore = request.json['contestsScore']
    student.testsScore = request.json['testsScore']
    student.testsSolved = request.json['testsSolved']
    
    dbs.db.session.commit()

    r = Response(response=json.dumps({"message": f"Student {student} had been updated in the database"}), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r