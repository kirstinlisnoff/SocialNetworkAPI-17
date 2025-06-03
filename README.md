# Social Network API

This back-end API web application allows users to share thoughts, manage a friends list, and react to thoughts as well. Built using Express.js, MongoDB, and Mongoose, this social network API app demonstrates how NoSQL databases can be utilized when handling large volumes of data. 

---

## 🧠 Table of Contents

- [Description](#-description)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Walkthrough Video](#-walkthrough-video)
- [Technologies Used](#-technologies-used)
- [License](#-license)

---

## 📝 Description

This API performs CRUD operations for:

- Users
- Thoughts
- Reactions (subdocuments of Thoughts)
- Friend relationships (users adding/removing other users as friends)

The app does **not** include a front-end interface. Testing is done using **Insomnia** or similar API clients.

---

## 💾 Installation

1. Clone the repo:

    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and update your `.env` file (if used):

    ```env
    MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
    ```

4. Start the server:

    ```bash
    npm start
    ```

---

## 🚀 Usage

Test the API using **Insomnia** or other API Clients.

Since no seed data is provided, you'll create your own data through API POST routes.

Example steps in Insomnia:

- Create a user
- Create a thought and associate it with that user
- Add a reaction to that thought
- Add a friend to the user
- Update and delete entities as needed

---

## 📬 API Routes

### Users (`/api/users`)
- `GET /` – Get all users  
- `GET /:id` – Get a single user by ID (with populated thoughts and friends)  
- `POST /` – Create a new user  
- `PUT /:id` – Update a user by ID  
- `DELETE /:id` – Delete a user (also deletes their thoughts)  

### Friends (`/api/users/:userId/friends/:friendId`)
- `POST` – Add a friend  
- `DELETE` – Remove a friend  

### Thoughts (`/api/thoughts`)
- `GET /` – Get all thoughts  
- `GET /:id` – Get a single thought  
- `POST /` – Create a thought  
- `PUT /:id` – Update a thought  
- `DELETE /:id` – Delete a thought  

### Reactions (`/api/thoughts/:thoughtId/reactions`)
- `POST` – Add a reaction to a thought  
- `DELETE /:reactionId` – Remove a reaction from a thought  

---

## 🎥 Walkthrough Video



https://github.com/user-attachments/assets/0d9db7ce-7482-415b-9dd6-e3a20e9a6cd6



---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JavaScript (ES6)
- Insomnia (for testing)

---

## 📄 License

MIT License
