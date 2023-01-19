# StudentsHelper

    Applied Computer Science 2022-2023 Project

## Description

Our project consits in a fullstack app(frontend + backend server) that helps highschool students ask for advices from students that study at the 
university they wish to pursue in the future and that worked at the companies they have always dreamed of working at.

## Overview

When entering entering the app, you are prompted with two options of login/register: student or elev(student or helper on the backend). When registering, you have to provide some basic information.
<br />
    As student(elev), name, email(etc.), and some contests score that you
have participated at(OJI- olimpiada judeteana de informatica, OJM- de matematica, etc), GPA. 
 <br />
    As a helper(student), you have to tell some companies that you worked for, contests results, College.
<br />
    The total contest score is calculated with a formula on the backend(because ONI(national) is more important than OJI, and it worths more total points, oji's maximum result is 10 times more than ojm's maximum result, etc). JUST WANTED to mention that the total contest score is calculated properly :).

## Logged in as a Student(elev)

The navbar has more possible options(buttons to pres).

- Students Helper -> redirects you to homepage <br />

- Find Matches -> redirects to a page where you search for the desired student(helper), you have to provide the desired college and faculty, and companies that the user worked at.<br />
When pressing('find student'), users with the desired criterias are shown in a table with a few information about them. When pressing 'Initialise chat', a chat is requested and initialised with the desired user.<br />

- Chat -> redirects to the initialised chat<br />

- About -> Shows information about you and you can also modify data(such as firstname, lastname, GPA and description) <br />

- Solve Random Test -> redirects to a page where a random test specific to a university admission exam is shown. When you solve a test, you get extra points which help you socialise with students.<br />

- Logout -> redirects you to the Not authenticated homepage

## Logged in as a Helper(student)

The navbar only has 4 buttons
- Students Helper<br />
- Chat -> Redirects to a chat initialised by a user <br />
- About
- Logout<br />

MUST MENTION: No data is HARDCODED, all the features from the frontend are
linked to the backend and the states are saved on a database. The only things that is hardcoded are the images!

## Technical Data

### Technologies used: 
- On the backend: Flask, SQLAlchemy, SocketIO, PostgreSQL
- On the frontend: ReactJS, Bootstrap, React Router, SocketIO(client), HTML and CSS.
- Security: JWT token and rooms for chats, localStorage for non-sensitive information

The 'backend' folder consists in the implementation of the routes for two 
types of requests: student and elev based. Some of them consists in simple CRUD operations and others are for helping with the initialisation of the socket server, obtaining the jwt token for security and ease of use. <br />

Routes such as update, delete are protected by a guard based on the jwt token. The token stores the usertype, id(this isn't probably that safe) and expiration date. <br />
The token is also used when entering the site, to keep the session alive. It expires after 7 days.

Something important to note is the Chat which is a live chat implemented via websockets, used with the socketIO library.

### How the chat works:

A user requests to initialise the chat when finding a match. The room is created with the name: Student(who initialises the request) + Helper(who is supposed to accept the request). A request is sent to the backend at for the helper to also join the room. When it accesses the chat, the chat is initialised and they start their real time chat. The chat is kept alive until pressing "Leave Chat", the connection is lost until the next request from the student. The chat always initialises when logging in if the chat is not left, because the room name is kept in localhost and it initialises on react components initialisation(the chat component).

## Problems we ran into
    Oh my GOD where to begin...

Days lost on frontend because we had no experience: Countless<br />
Youtube videos followed for information about creating a fullstack app which's information was repetitive and still not working: Countless <br />
Python/Flask errors: Countless...(for example, when a route isn't working, and a request is made from the front, you get a CORS error(we know-> ????), so we studied a lot of CORS problems just to see that the problem was from the server, because every error on a server just results in a CORS error on the web).<br />
The database had to be initialised manually on pgAdmin because some command from youtube videos didn't work, and since we changed the schemas a lot of times, it as painful to recreate tables on and on.<br />

Docker is not working after hours of research.<br />

Our experience when we started: 0, but we gained a lot of useful information and it was a lot of fun!


### Running the project

On frontend: npm install, npm start<br />

On backend: pip install Flask psycopg2-binary python-socketio Flask-Cors Flask-SQLAlchemy<br />
	    run with: flask --app backend run<br />
On SocketIO: pip install Flask Flask-SocketIO Flask-Cors<br />
	    run with: flask run --p 5001 <br />

### Teamwork:
    Each member worked on a component on the frontend and on the backend,
    and a component on the backend. 

Marinescu Alexandru -> Find matches component and routes for Helper CRUD
Dragomir Andrei -> Solve Test backend and frontend
Dumitru Stefania -> About page + backend Student
Dumitrescu Bogdan -> Chat (frontend & backend), JWT implementation(Register & Login), frontend-backend linking, additional features