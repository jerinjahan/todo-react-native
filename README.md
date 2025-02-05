# Todo App

A todo application using React, React-Native, Typescript, and Firestore.

![](assets/screenshots/welcome.png)
![](assets/screenshots/todoApp.png)

## Setup

### Install dependencies

Install the dependencies for the client and server.

```bash
# in one terminal window
cd todo-react-native && npm i
# then write command terminal window
# npx expo start
```

<!-- ### Start server

An Express server is maintaining a Socket.io connection, persisting data short-term in memory, and exposes an API for accessing persistent data.

```bash
# in /server
npm start
```

> Server is running on `localhost:5000`.

### Start client

A React server with Redux for the front end.

```bash
# in /client
npm start
```

> Client dev server is running on `localhost:3000`.

You can view the app at `localhost:3000`. Log in with any valid email and username, and you'll enter into the chatroom, which will display all users (noting which are currently online) and all messages. -->

### How to build apk for android device

- eas login

- eas build -p android --profile preview

- eas build:run -p android

- eas build:run -p android --latest

<!-- ## Todos

- [ ] Duplicate users should be checked and not allowed
- [x] Add user is typing
- [ ] Allow tagging
- [ ] Add settings
- [ ] Add error handling
- [ ] Add tests
  - [ ] Jest Unit tests
  - [ ] React Testing Library component tests
  - [ ] Cypress end-to-end tests
- [ ] Add ESLint
- [x] Add Docker support -->
