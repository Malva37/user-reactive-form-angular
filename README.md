#Users manager

This is a simple web application for managing a list of users.
The project consists of two pages:

1. User Creation Page: Allows creating new users. The form should contain fields for entering the name, last name, email, and birth date, framework, framework version (dependent on the framework), and several hobbies (with information about the name and duration of each of them). On the event of 'blur' on the email field, you can see a fake call to the server (async validation) to check if the email value is 'test@test.test'. User data is stored on the fake server.

2. User List Page: Displays a list of users. You can also delete a user from this page.

##Steps to run the project:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the application by running `ng serve`.
4. Open your web browser and navigate to http://localhost:4200/ to access the application.
5. On another terminal run data base `json-server db.json -p 4000 -w`

Technologies:
 - Angular
 - Angular Material UI Library
 - Moment library
 - RxJS
 - TypeScript
