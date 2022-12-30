from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dumi-199-secure@localhost/users'
db = SQLAlchemy(app)

class Student(db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), unique=True, nullable=False)
    lastName = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    school = db.Column(db.String(120), unique=True, nullable=False)
    GPA = db.Column(db.Float, unique=True, nullable=False)
    contestsScore = db.Column(db.Integer, unique=True, nullable=False)
    testsScore = db.Column(db.Integer, unique=True, nullable=False)
    testsSolved = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return f"{self.name} - {self.email}"

    def __init__(self, firstName, lastName, email, password, school, GPA, contestsScore, testsScore, testsSolved):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
        self.school = school
        self.GPA = GPA
        self.contestsScore = contestsScore
        self.testsScore = testsScore
        self.testsSolved = testsSolved

class Helper(db.Model):
    __tablename__ = 'helper'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), unique=True, nullable=False)
    lastName = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    college = db.Column(db.String(120), unique=True, nullable=False)
    workGoogle = db.Column(db.Boolean, unique=True, nullable=False)
    workMeta = db.Column(db.Boolean, unique=True, nullable=False)
    workBloomberg = db.Column(db.Boolean, unique=True, nullable=False)
    workAmazon = db.Column(db.Boolean, unique=True, nullable=False)
    workMicrosoft = db.Column(db.Boolean, unique=True, nullable=False)
    workApple = db.Column(db.Boolean, unique=True, nullable=False)
    workHedgeFund = db.Column(db.Boolean, unique=True, nullable=False)
    workingCompanies = db.Column(db.String(120), unique=True, nullable=False)
    GPA = db.Column(db.Float, unique=True, nullable=False)
    contestsScore = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return f"{self.name} - {self.email}"
    
    def __init__(self, firstName, lastName, email, password, college, workGoogle, workMeta, workBloomberg, workAmazon, workMicrosoft, workApple, workHedgeFund, workingCompanies, GPA, contestsScore):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
        self.college = college
        self.workGoogle = workGoogle
        self.workMeta = workMeta
        self.workBloomberg = workBloomberg
        self.workAmazon = workAmazon
        self.workMicrosoft = workMicrosoft
        self.workApple = workApple
        self.workHedgeFund = workHedgeFund
        self.workingCompanies = workingCompanies
        self.GPA = GPA
        self.contestsScore = contestsScore

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/registerStudent", methods=['POST'])
def registerStudent():
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    email = request.json['email']
    password = request.json['password']
    school = request.json['school']
    GPA = request.json['GPA']
    contestsScore = request.json['contestsScore']
    testsScore = request.json['testsScore']
    testsSolved = request.json['testsSolved']

    newStudent = Student(firstName, lastName, email, password, school, GPA, contestsScore, testsScore, testsSolved)
    db.session.add(newStudent)
    db.session.commit()

    return f"Student {firstName} {lastName} has been added to the database!"

@app.route("/getAllStudents" , methods=['GET'])
def getStudents():
    students = Student.query.all()
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

    return {"students": output}

@app.route("/getStudent/<email>" , methods=['GET'])
def getStudent(email):
    student = Student.query.filter_by(email=email).first()
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

    return {"student": student_data}

# delete student
@app.route("/deleteStudent/<id>" , methods=['DELETE'])
def deleteStudent(id):
    student = Student.query.filter_by(id=id).first()
    db.session.delete(student)
    db.session.commit()

    return f"Student {student.firstName} {student.lastName} has been deleted from the database!"

# update student
@app.route("/updateStudent/<id>" , methods=['PUT'])
def updateStudent(id):
    student = Student.query.filter_by(id=id).first()
    student.firstName = request.json['firstName']
    student.lastName = request.json['lastName']
    student.email = request.json['email']
    student.password = request.json['password']
    student.school = request.json['school']
    student.GPA = request.json['GPA']
    student.contestsScore = request.json['contestsScore']
    student.testsScore = request.json['testsScore']
    student.testsSolved = request.json['testsSolved']
    
    db.session.commit()

    return f"Student {student.firstName} {student.lastName} has been updated!"

# register helper
@app.route("/registerHelper", methods=['POST'])
def registerHelper():
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    email = request.json['email']
    password = request.json['password']
    college = request.json['college']
    workGoogle = request.json['workGoogle']
    workMeta = request.json['workMeta']
    workBloomberg = request.json['workBloomberg']
    workAmazon = request.json['workAmazon']
    workMicrosoft = request.json['workMicrosoft']
    workApple = request.json['workApple']
    workHedgeFund = request.json['workHedgeFund']
    workingCompanies = request.json['workingCompanies']
    GPA = request.json['GPA']
    contestsScore = request.json['contestsScore']
   
    newHelper = Helper(firstName, lastName, email, password, college, workGoogle, workMeta, workBloomberg, workAmazon, workMicrosoft, workApple, workHedgeFund, workingCompanies, GPA, contestsScore)
    db.session.add(newHelper)
    db.session.commit()

    return f"Helper {firstName} {lastName} has been added to the database!"

@app.route("/getAllHelpers" , methods=['GET'])
def getHelpers():
    helpers = Helper.query.all()
    output = []

    for helper in helpers:
        helper_data = {}
        helper_data['id'] = helper.id
        helper_data['firstName'] = helper.firstName
        helper_data['lastName'] = helper.lastName
        helper_data['email'] = helper.email
        helper_data['password'] = helper.password
        helper_data['college'] = helper.college
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

    return {"helpers": output}

@app.route("/getHelper/<email>" , methods=['GET'])
def getHelper(email):
    helper = Helper.query.filter_by(email=email).first()
    helper_data = {}
    helper_data['id'] = helper.id
    helper_data['firstName'] = helper.firstName
    helper_data['lastName'] = helper.lastName
    helper_data['email'] = helper.email
    helper_data['password'] = helper.password
    helper_data['college'] = helper.college
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

    return {"helper": helper_data}

# delete helper
@app.route("/deleteHelper/<id>" , methods=['DELETE'])
def deleteHelper(id):
    helper = Helper.query.filter_by(id=id).first()
    db.session.delete(helper)
    db.session.commit()

    return f"Helper {helper.firstName} {helper.lastName} has been deleted from the database!"

# update helper
@app.route("/updateHelper/<id>" , methods=['PUT'])
def updateHelper(id):
    helper = Helper.query.filter_by(id=id).first()
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
    
    db.session.commit()

    return f"Helper {helper.firstName} {helper.lastName} has been updated!"


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3000)


