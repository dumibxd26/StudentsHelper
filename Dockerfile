FROM ubuntu:22.04

#backend
RUN apt install python3-pip
RUN pip3 install --upgrade pip
COPY requirements.txt /usr/src/app
RUN pip3 install --no-cache-dir -r requirements.txt

#front
RUN apt install nodejs npm
COPY ./frontend/package.json /usr/src/app

#database
RUN npm i postgres

COPY . /usr/src/app

RUN npm install

EXPOSE 5000 5001 3000

CMD ["cd" , "frontend", "npm", "start", "cd", "..", "cd", "backend", "flask", "run", "cd", "..", "cd", "SocketIO", "flask", "run", "-p", "5001"]
