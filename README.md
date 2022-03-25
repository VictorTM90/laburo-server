# LABURO

## Description

Laburo is a calendar platform for organising all kind of tasks. User can create a teamwork with other users and assing tasks.

## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start adding tasks to my calendar.
- **Login:** As a user I can login to the platform so I can see my calendar and start adding tasks or create a teamwork.
- **Logout:** As a user I can log out from the platform so no one else can use it.
- **Add, read, edit, and delete tasks:** As a user I can add a task to my calendar to organise my time and modify or delete them.
- **Create, read, edit, and delete teamworks:** As a user I can create a new teamwork adding other users with a searchbar. I can edit and delete the whole teamwork or delete just a member. If I assign a task to a specific member, they will have the task in their personal dashboard.

## Backlog:

Teamwork:

- The assigned tasks appear in the team dashboard and in the member personal dashboard.

- Drag and resize the task in the calendar.

- Validations in the members searchbar.

# Server

## Models

User model

```
name - String // unique
password - String // required
email - String // required
favorites - timestams: true
```

Teamwork model

```
name - String // required
creator - [ObjectID<"User">]
members - [ObjectID<"User">]
```

Task model

```
creator - [ObjectID<"User">]
start - Date // default
title - String
description: String
end: Date
assigned - [ObjectID<"User">]
teamwork -  [ObjectID<"Teamwork">]
isDone - String // default "To do"
```

## Middleware

isAuthenticated.js: "express-jwt"

## API Endpoints/Backend Routes

index.routes.js: 
```
- authRoutes
- tasksRoutes
- teamworkRoutes
- userRoutes
```

auth.routes.js:
```
- GET /auth/verify
  - body: (empty)
- POST /auth/signup
  -body:
  -email
  -password: hashedPassword
  -name
- POST /auth/login
  - body:
    - email
    - password
```

tasks.routes.js:
```
- GET/tasks/teamwork/:id
- find: teamwork:id
  .populate [("assigned", "teamwork", "creator")]

- GET /tasks/ - find: $or: [{ creator: _id }, { assigned: _id }]
  .populate [("assigned", "teamwork", "creator")]

- POST /tasks/
- create:
- creator: \_id,
- start,
- end,
- description,
- assigned,
- teamwork,
- taskType
- isUrgent,
- isDone,
- title,

- GET/tasks/:id
  -findById: id
  .populate [
  "assigned",
  "teamwork",
  "creator",
  ]

- PATCH/tasks/:id
  - findByIdAndUpdate: id
  - body: 
- creator:
- start,
- end,
- description,
- assigned,
- teamwork,
- taskType
- isUrgent,
- isDone,
- title,

    - findById: id 
    .populate["assigned", "teamwork", "creator",]

- DELETE/tasks/:is
    -body: (empty)
```

teamwork.routes.js:

```
- GET /teamwork/
    - find
    .populate("members")
- POST /teamwork/
    - create: 
        - name,
        - creator: _id
        - members,
- GET /teamwork/creatorteams 
    - find: {creator: _id}
    .populate("members")
- GET /teamwork/:id
     - find:  _id
    .populate("members")
- DELETE /teamwork/:id
    -body: (empty)
- PATCH /teamwork/:id
    - findByIdAndUpdate: (id, { name, members })
- PATCH /teamwork/:id/remove/:userid
    - findByIdAndUpdate: (id, {
      $pull: {
        members: userid,
      },
    });

```

### Git

https://github.com/VictorTM90/laburo-server
https://github.com/VictorTM90/laburo-client
https://laburo.netlify.app/