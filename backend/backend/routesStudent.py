from backend import app
from backend import dbs
from backend import serviceStudent

@app.route("/loginStudent", methods=['POST'])
def loginStudent():
    return serviceStudent.loginStudentService()

@app.route('/registerStudent' , methods=['POST'])
def registerStudent():
    return serviceStudent.registerStudentService()

@app.route("/getAllStudents" , methods=['GET'])
def getStudents():
    return serviceStudent.getAllStudentsService()

@app.route("/getStudent/<finder>" , methods=['GET'])
def getStudent(finder):
    return serviceStudent.getStudentService(finder)

@app.route("/deleteStudent/<id>" , methods=['DELETE'])
def deleteStudent(id):
    return serviceStudent.deleteStudentService(id)

@app.route("/updateStudent/<id>" , methods=['PUT'])
def updateStudent(id):
    return serviceStudent.updateStudentService(id)