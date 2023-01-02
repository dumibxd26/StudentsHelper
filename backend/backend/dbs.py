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

    def __repr__(self):
        return f"{self.firstName} - {self.lastName} - {self.email}"

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

    def __repr__(self):
        return f"{self.firstName} - {self.lastName} - {self.email}"

    def __init__(self, firstName, lastName, email, password, college, faculty, workGoogle, workMeta, workBloomberg, workAmazon, workMicrosoft, workApple, workHedgeFund, workingCompanies, GPA, contestsScore):
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
