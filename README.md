# CA2 Back End Develpoment Gamified Sustainability Task Tracker With Front End.
### Author: Rejey Ezekiel Jeyakumar

### Description: I created a quiz type game where users can earn credits through the quizzes and buy items in the shop.

#### Dependencies: MYSQL2, EXPRESS, JSONWEBTOKEN, NODEMON, DOTENV, BCRYPT, multer.

#### ERD Diagram of Backend:
![ERD](./public/assets/ERD%20Diagram.png)

### Explanation of Tables:
#### 1.``User`` : This Table holds the users information like username, email, password, thier Authorization level, when thier account was created on and when it was updated on. 

#### 2.``Messages`` : This Table holds the messages written by users and stores the message based on the users id, it also holds the time when the message was sent.

#### 3.``Credit`` : This table stores the users credit when winning a game or when spending in the shop, and will return the users total credit.

#### 4.``Locker`` : This table will store the items bought in the shop as a id and when viewing the locker it will use the Shop_External_API to fetch the Items name and image, this table also stores when the user obained a specefic item. 

#### 5.``Task`` : This Table stores the wins that a user gains from playing a game in points and refrence the user_id.

#### 6.``Shop_External_API`` : This External API acts like a table too, it holds information of items from the shop and stores it in the external database and when refrenced returns the items actual name and image. 

### Folder Structure
```
.
├── public/
│   ├── assets/
│   │   ├── ERD Diagram.png
│   │   └── Logo.png
│   ├── css/
│   │   ├── chat.css
│   │   ├── game.css
│   │   ├── index.css
│   │   ├── Login.css
│   │   ├── sb-admin-2-min.css
│   │   └── shop.css
│   ├── js/
│   │   ├── admin/
│   │   │   └── admin.js
│   │   ├── game/
│   │   │   └── scipt.js
│   │   ├── HTMLChecker/
│   │   │   ├── CheckToken.js
│   │   │   ├── getCurrentURL.js
│   │   │   └── queryCmd.js
│   │   ├── messages/
│   │   │   ├── CreateMessage.js
│   │   │   └── DisplayMessage.js
│   │   ├── shop/
│   │   │   ├── showLocker.js
│   │   │   └── showShop.js
│   │   ├── index.js
│   │   ├── LoginScript.js
│   │   └── RegisterScript.js
│   ├── vendor/
│   │   ├── aos
│   │   ├── bootstrap/
│   │   │   ├── css
│   │   │   └── js
│   │   ├── bootstrap-icons/
│   │   │   └── fonts
│   │   ├── boxicons/
│   │   │   ├── css
│   │   │   └── fonts
│   │   └── glightbox/
│   │       ├── css
│   │       ├── js
│   │       ├── isotope-layout
│   │       ├── purecounter
│   │       ├── swiper
│   │       ├── typed.js
│   │       └── waypoints
│   ├── admin.html
│   ├── game.html
│   ├── index.html
│   ├── login.html
│   ├── chat.html
│   ├── Register.html
│   └── shop.html
├── src/
│   ├── config/
│   │   ├── createSchema.js
│   │   └── initTables.js
│   ├── controller/
│   │   ├── Gamecontroller.js
│   │   ├── Lockercontroller.js
│   │   ├── Messagecontroller.js
│   │   ├── ShopController.js
│   │   └── UserController.js
│   ├── middlewares/
│   │   ├── bcryptMiddleware.js
│   │   └── jwtmiddleware.js
│   ├── models/
│   │   ├── GameModel.js
│   │   ├── LockerModel.js
│   │   ├── MessageModel.js
│   │   ├── ShopModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── GameRoute.js
│   │   ├── LockerRoute.js
│   │   ├── MessageRoute.js
│   │   ├── ShopRoute.js
│   │   ├── userRoute.js
│   │   └── mainRoute.js
│   ├── services/
│   │   └── db.js
│   └── app.js
├── index.js
└── README.md
```

## Table of Contents
1. [Running The Program](#section-Program)
    - [Installing Dependencies](#installing-dependencies)
    - [Adding ENV File](#adding-env-file)
    - [Starting the program](#starting-the-program)
2. [Section A](#section-a)
    - [User Login and Registration](#user-registration-and-login-pages)
    - [Authentication Flow](#authentication-flow)
    - [Password Security](#password-security)
    - [Messaging](#messaging)
    - [Bootstrap Integration / Front End](#bootstrap-integration)
    - [Endpoint Integration](#endpoint-integration)
3. [Backend (Endpoints)](#section-b)
    - [Integrate Additional Endpoints](#integrate-additional-endpoints)
    - [User Interaction Enhancement](#user-interaction-enhancement)
    - [Backend Enhancement](#backend-enhancement)


## Running the Program
Steps to run the project:
### Installing Dependencies
Download Depen dencies
```
npm install mysql2 dotenv express jsonwebtoken nodemon bcrypt multer
```

### Adding ENV File
Create a .env file with these credentials 
```
DB_HOST=your-host
DB_USER=root-user
DB_PASSWORD=root-user-password
DB_DATABASE=project-name-mysql
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=expiary-time  
JWT_ALGORITHM=HS256 
```

### Starting the program
Start Program with these commands
```
npm run init_tables
npm run dev
```


##
# Frontend

## 1. Index.html
landing page for users to navigate to other pages.

## 2. admin.html
This admin html page allows the admin to make changes to the users data like messages and accounts, it also allows the admin to see the statistics of the website like the total users, total messages, total credits and tasks.

## 3. Chat.html
This page allows user to send message to a global chat setting where any can see and send messages, they are also able to update and delete thier messages.

## 4. login.html
This page is the starting page which the user will login through and be redirected to the landing page/login.html .


## 5. Register.html
Allows for users to register.

## 6. Shop.html
users can see the shop and purchase things using credits won through the game and once item is bought they can see it in the locker via a toggle button.

## 7. Game.html
This page allows users to play a quiz type of game where they can earn credits, the game works but using a external API to render in images and questions dynamically which the user can answer and on the when correct they earn points.



# admin.js
This script powers the admin dashboard for managing various aspects of the website. It fetches and displays key information about users, messages, credits, and tasks. Additionally, the admin can view and manage all user profiles and messages.

### User Information

1. **Total Users:**
   - Displays the total number of registered users.

2. **Total Messages:**
   - Shows the total count of messages stored in the system.

3. **Total Credits:**
   - Provides information about the total credits accumulated by users through gameplay.

4. **Total Tasks Completed:**
   - Displays the overall count of completed tasks by users.

### User Management

1. **All Users:**
   - Lists all registered users with details such as username, email, authorization level, and creation date.
   - Allows the admin to update user details or delete users.

### Message Management

1. **Message List:**
   - Presents a list of messages with details such as the message text, username, and creation date.
   - Enables the admin to update or delete individual messages.
   - Supports a modal interface for easy message updates.

### Usage

1. **Dashboard Overview:**
   - Upon successful authentication, the dashboard fetches and displays essential information.
   - The admin can navigate through different sections using the provided links.

2. **User Management:**
   - The "All Users" section provides a comprehensive view of user details.
   - Admins can update user information or delete users directly from the dashboard.

3. **Message Management:**
   - The "Message List" section allows admins to update or delete individual messages.
   - A modal interface is available for convenient message updates.

# script.js

### Overview

This script is a simple interactive quiz game focused on Fortnite cosmetics. It utilizes the Fortnite API to fetch new cosmetics and generates questions based on the retrieved data. Users are presented with questions about the type of a cosmetic item, and they must select the correct category.

### Features

- Fetches new Fortnite cosmetics from the Fortnite API.
- Generates quiz questions based on the fetched data.
- User-friendly quiz interface with a timer.
- Interactive scoring with correct and incorrect indicators.
- Credits earned based on the user's performance.
- Integration with user authentication.

### Usage

1. **API Integration:**
   - The script fetches data from the Fortnite API. Make sure the API endpoint (`https://fortnite-api.com/v2/cosmetics/br/new`) is accessible.

2. **User Authentication:**
   - The script checks for user authentication by verifying the presence of a token in the local storage. If not authenticated, users are redirected to the login page (`login.html`).

3. **Quiz Gameplay:**
   - Users start the quiz by clicking the "Start Quiz" button.
   - Each question presents an image of a Fortnite cosmetic along with multiple-choice options.
   - Users select an option, and correct/incorrect indicators are displayed.
   - A timer tracks the remaining time for each question.

4. **Scoring and Credits:**
   - Users earn credits based on their quiz performance.
   - The quiz concludes after a set number of questions, and the user's score and earned credits are displayed.


## CheckToken.js
1. This js file checks wether theres a token available and if there is no token it redirects them to login.
2. This Script also removes everything in the localstorage when the user wants to logout.

## getCurrentURL.js
1. window.location.protocol: Retrieves the protocol part of the current URL (e.g., "http:" or "https:").
2. "//": A string used to separate the protocol and the host in the URL.
3. window.location.host: Retrieves the host and port number part of the current URL.

## queryCmd.js
### Overview

The fetchMethod script is a utility function designed to simplify and streamline the process of making HTTP requests using the Fetch API. It supports common HTTP methods such as GET, POST, PUT, and DELETE, and it allows for the inclusion of request data and authorization headers.

### Function Signature
```
function fetchMethod(url, callback, method = "GET", data = null, token = null)
```
1. url: The URL to which the HTTP request is made.
2. callback: A callback function that processes the response from the server.
3. method: The HTTP method (GET, POST, PUT, DELETE). Defaults to "GET".
4. data: The data payload for POST and PUT requests. Defaults to null.
5. token: An optional authorization token. If provided, it appends an "Authorization" header with the token.
### Error Handling
The function logs errors to the console in case of a failed request.


## CreateMessage.js
### Overview
The chat message creation script is designed to handle the process of sending messages in a chat application. It listens for the "submit" event on a designated element, captures the message from a text input, and then performs an asynchronous HTTP POST request to send the message to a server endpoint.
```
document.addEventListener("DOMContentLoaded", function () {
  const Send_Message = document.getElementById("submit_message");
  Send_Message.addEventListener("click", function (event) {
    //data with message.
  });
});
```
### Error Handling
The script logs relevant information to the console during the process, including the status and response data from the server.


## DisplayMessage.js
### Overview
The Chat Message Display and Management script is designed to fetch and display chat messages, allowing users to update or delete their own messages. It utilizes a server-side API to handle operations like retrieving messages, updating text, and deleting messages.

Script Signature
```
const callback = (responseStatus, responseData) => {
  // ... Script logic here ...
};
fetchMethod(currentUrl + "/api/message/", callback, 'GET', null, localStorage.getItem("token"));
```
### Features
1. Message Display: The script fetches messages from the server and dynamically displays them on the web page, distinguishing messages sent by the current user.
2. Update Message: Users can update their own messages by clicking the "Update" button, which opens a modal for editing the message text.
3. Delete Message: Users can delete their own messages by clicking the "Delete" button.

### Error Handling
The script logs relevant information to the console during the process, including the status and response data from the server.


## showlocker.js
### Overview
The Locker Display script allows users to interact and view their locker items, and retrieve information about Fortnite cosmetics from an API. Users can buy items from the shop, view their locker contents, and access details about each cosmetic.

### Features
1. Locker Display: Users can view their own locker, showcasing their owned cosmetics.
2. Cosmetic Details: The script fetches details about each cosmetic from the Fortnite API and displays them with relevant information.
3. Toggle Functionality: Users can show/hide the shop and locker sections by clicking corresponding buttons.

### Error Handling
The script logs relevant information to the console during the process, including the status and response data from API requests.

## ShowShop.js
### Overview
The Fortnite Shop script allows users to view items from an external API and purchase them using in-game credits. Users can see their total credits, wins, and a selection of items from the shop. Purchased items are added to the user's locker.

### Features
1. Total Credits Display: Users can view their total credits and username.
2. Wins Display: The script retrieves the total wins or points and displays them.
3. Shop Display: A selection of items is randomly displayed from the Fortnite API.
4. Purchase Functionality: Users can purchase items by clicking the "Purchase" button, deducting credits from their total and adding the item to their locker.
5. Locker Display: The script fetches the user's locker and ensures that purchased items are not displayed again.

### Styles
The script dynamically generates HTML elements to display shop items. Make sure your project has suitable CSS styles or adjust the script to match your styling preferences.

### Error Handling
The script logs relevant information to the console during the process, including the status and response data from API requests. Ensure that your project includes proper error handling for scenarios such as failed API requests.

## LoginScript.js
### Overview
The Login Script is designed to handle user authentication by sending login credentials to an API endpoint. Upon successful login, it stores the user's token and relevant information in local storage, allowing for further interactions and personalized experiences.

### Features
1. User Authentication: The script allows users to log in by submitting their username and password to the server.
2. Token Storage: Upon successful login, the user's authentication token, user ID, and expiration timestamp are stored in the local storage for subsequent requests.
3. Redirects: Based on the user's role (e.g., admin), the script redirects the user to different pages (e.g., admin.html or index.html).
4. Error Handling: The script displays a warning message in case of login failures, providing feedback to users.

### Error Handling
The script logs relevant information to the console during the login process, including the status and response data from API requests. Ensure that your project includes proper error handling for scenarios such as incorrect credentials.


## RegisterScript.js
### Overview
The Signup Script is designed to handle user registration by sending user details to an API endpoint. It performs signup logic, ensuring that passwords match before sending the registration request. Upon successful signup, the user is issued a token and redirected to the login page.

### Features
1. User Registration: The script allows users to register by submitting their username, email, password, and confirming the password.
2. Password Match Validation: It checks if the entered password matches the confirmed password before proceeding with the signup.
3. Token Storage: Upon successful signup, the user's authentication token is stored in the local storage for subsequent requests.
4. Redirect: After successful signup, the script redirects the user to the login page for further authentication.

### Error Handling
The script logs relevant information to the console during the signup process, including the status and response data from API requests. Ensure that your project includes proper error handling for scenarios such as username or email already in use.


##
# Backend Endpoint

## 1. Login /api/login (POST) 
Middleware Functions
1. userController.login
The userController.login middleware is responsible for handling the initial login logic. It likely interacts with your user database to check the provided credentials.

2. bcryptMiddleware.comparePassword
The bcryptMiddleware.comparePassword middleware utilizes bcrypt or a similar library to compare the user's entered password with the hashed password stored in the database. It ensures the password correctness during the login process.

3. jwtMiddleware.generateToken
The jwtMiddleware.generateToken middleware generates a JSON Web Token (JWT) upon successful authentication. This token typically contains user information and is signed with a secret key. The generated token is then attached to the request object.

4. jwtMiddleware.sendToken
The jwtMiddleware.sendToken middleware sends the generated JWT back to the client as part of the response. This token is essential for subsequent authenticated requests made by the client.

##
# 2. Register /api/register (POST) 
Middleware Functions
1. userController.checkUsernameOrEmailExist
The userController.checkUsernameOrEmailExist middleware ensures that the provided username or email is unique in the system. It prevents registration with duplicate usernames or emails.

2. bcryptMiddleware.hashPassword
The bcryptMiddleware.hashPassword middleware hashes the user's password before storing it in the database. This is crucial for securely managing user credentials.

3. userController.register
The userController.register middleware is responsible for handling the actual registration logic. It likely interacts with your user database to store the new user's information.

4. jwtMiddleware.generateToken
The jwtMiddleware.generateToken middleware generates a JSON Web Token (JWT) upon successful registration. This token typically contains user information and is signed with a secret key. The generated token is then attached to the request object.

5. jwtMiddleware.sendToken
The jwtMiddleware.sendToken middleware sends the generated JWT back to the client as part of the response. This token is essential for subsequent authenticated requests made by the client.

##
# 3. User Routes 
### 1. Total Users /api/user/TotalUser (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves Count of total users for Admin page.</li>

### 2. Total Users /api/user (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves all users.</li>

### 3. Total Users /api/user/:userId (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves all users.</li>

### 4. Total Users /api/user/:id (PUT)
<li>Verify Users token wether they are verified.</li>
<li>Update users inforamtion from admins page.</li>

### 5. Total Users /api/user/:id (DELETE)
<li>Verify Users token wether they are verified.</li>
<li>Deletes user from admins page.</li>

##
# 4. Shop Routes 
### 1. Total Credits /api/shop/TotalCredits (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves total credits for a specefic user.</li>

### 2. Total wins /api/shop/Wins (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves total count of wins for a specefic user.</li>


##
# 5. Message Routes 
### 1. Total Credits /api/message/ (GET)
<li>Verify Users token wether they are verified.</li>
<li>Retrieves all messages from all users.</li>

### 2. Send message /api/message/ (POST)
<li>Verify Users token wether they are verified.</li>
<li>POST specefic message from the logged in user.</li>

### 3. Delete message /api/message/:id (DELETE)
<li>Verify Users token wether they are verified.</li>
<li>Delete specefic message from the logged in user only.</li>

### 4. Update message /api/message/:id (PUT)
<li>Verify Users token wether they are verified.</li>
<li>Update specefic message from the logged in user only.</li>

### 5. Delete message /api/message/TotalMessages (GET)
<li>Verify Users token wether they are verified.</li>
<li>Returns the count of messages in the database.</li>

##
# 6. Locker Routes 
### 1. Insert Item into Locker /api/locker/InsertLocker (POST)
<li>Verify Users token wether they are verified.</li>
<li>Insert item bought from shop into the users locker.</li>

### 2. Get users item from locker /api/locker/ShowLocker (GET)
<li>Verify Users token wether they are verified.</li>
<li>Gets the users item from thier locker.</li>


##
# 7. Game Routes 
### 1. Get total tasks /api/game/TotalTasks (GET)
<li>Verify Users token wether they are verified.</li>
<li>Returns the total number of task the user has completed (wins).</li>

### 2. Get total credit from specefic user /api/game/TotalCredit (GET)
<li>Verify Users token wether they are verified.</li>
<li>Returns the all users total credits.</li>

### 3. Insert credit /api/game/InsertUser (POST)
<li>Verify Users token wether they are verified.</li>
<li>POST the credits amount to the specefic user.</li>

##
# Demonstration

## 1. Login and Registration page:
 