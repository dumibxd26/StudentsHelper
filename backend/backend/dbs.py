from flask_sqlalchemy import SQLAlchemy
from backend import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:dumi-199-secure@localhost/users'
db = SQLAlchemy()
db.init_app(app)

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
    description = db.Column(db.String(120), unique=True, nullable=True)
    # chatName = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f"{self.firstName} - {self.lastName} - {self.email}"

    def __init__(self, firstName, lastName, email, password, school, GPA, contestsScore, testsScore, testsSolved, description):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
        self.school = school
        self.GPA = GPA
        self.contestsScore = contestsScore
        self.testsScore = testsScore
        self.testsSolved = testsSolved
        self.description = description
        # self.chatName = chatName

class Helper(db.Model):
    __tablename__ = 'helper'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), unique=True, nullable=False)
    lastName = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    college = db.Column(db.String(120), unique=True, nullable=False)
    faculty = db.Column(db.String(120), unique=True, nullable=False)
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
    description = db.Column(db.String(120), unique=True, nullable=True)
    chatName = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f"{self.firstName} - {self.lastName} - {self.email}"

    def __init__(self, firstName, lastName, email, password, college, faculty,
     workGoogle, workMeta, workBloomberg, workAmazon, workMicrosoft, workApple, workHedgeFund, workingCompanies,
      GPA, contestsScore, description, chatName):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
        self.college = college
        self.faculty = faculty
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
        self.description = description
        self.chatName = chatName

class Test(db.Model):
    __tablename__ = 'test'

    id = db.Column(db.Integer, primary_key=True)
    Q1 = db.Column(db.String(120), nullable=False)
    Q2 = db.Column(db.String(120), nullable=False)
    Q3 = db.Column(db.String(120), nullable=False)
    Q4 = db.Column(db.String(120), nullable=False)
    Q5 = db.Column(db.String(120), nullable=False)
    Q6 = db.Column(db.String(120), nullable=False)
    Q7 = db.Column(db.String(120), nullable=False)
    Q8 = db.Column(db.String(120), nullable=False)
    Q9 = db.Column(db.String(120), nullable=False)
    Q10 = db.Column(db.String(120), nullable=False)
    Q1A = db.Column(db.String(120), nullable=False)
    Q2A = db.Column(db.String(120), nullable=False)
    Q3A = db.Column(db.String(120), nullable=False)
    Q4A = db.Column(db.String(120), nullable=False)
    Q5A = db.Column(db.String(120), nullable=False)
    Q6A = db.Column(db.String(120), nullable=False)
    Q7A = db.Column(db.String(120), nullable=False)
    Q8A = db.Column(db.String(120), nullable=False)
    Q9A = db.Column(db.String(120), nullable=False)
    Q10A = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f"Test {self.id}"
    
    def __init__(self, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q1A, Q2A, Q3A, Q4A, Q5A, Q6A, Q7A, Q8A, Q9A, Q10A):
        self.Q1 = Q1
        self.Q2 = Q2
        self.Q3 = Q3
        self.Q4 = Q4
        self.Q5 = Q5
        self.Q6 = Q6
        self.Q7 = Q7
        self.Q8 = Q8
        self.Q9 = Q9
        self.Q10 = Q10
        self.Q1A = Q1A
        self.Q2A = Q2A
        self.Q3A = Q3A
        self.Q4A = Q4A
        self.Q5A = Q5A
        self.Q6A = Q6A
        self.Q7A = Q7A
        self.Q8A = Q8A
        self.Q9A = Q9A
        self.Q10A = Q10A