You will have to run both server and FE in 2 terminals.

Steps to run todo-list-server: 
```
npm ci
npm run build
npm start
```

Steps to run todo-react-mui:
```
npm ci
npm start
```

Description: 
This simple Todo-list application allows to add, update, and delete tasks. No MongoDB database was configured, so only an in-memory array as a database is set up.

The following functionalities are offered:
• Add a new task (submit only a task title)

• Mark a task as completed (checkbox) / uncompleted (empty checkbox)

• Edit a task (change a task title)

• Delete a task.

B) Compliance to Implementation Requirements:

React Hooks are used;

• API calls are made using fetch;

• styling with Material-UI components.

Backend: Node.js with Express:

• API Endpoints to perform CRUD operations:

• POST /tasks: Add a new task.

• GET /tasks: Retrieve all tasks.

• PUT /tasks/:id: Update a task by ID.

• DELETE /tasks/:id: Delete a task by ID.

• Ensure proper error handling and status codes in API responses (not implemented yet!)

• Use CORS middleware to allow frontend-backend communication.

Evaluation Criteria:

• Frontend:

• Proper use of React hooks and component structure (passed)

• Clean and modular code organization (passed)

• Ability to handle API calls and manage state (passed)

• Backend:

• Proper use of Express routes and CRUD operations (passed)

• Well-organized code structure (passed)

• Implementation of error handling and status codes (failed)

Stretch Goals (Optional Enhancements):

Backend:
   
• Use MongoDB and Mongoose for database management (not done)

• Implement JWT authentication for user-specific tasks (not done)

Frontend:
   
• Use React Router for navigation (e.g., Home and Todo pages) (passed)

• Use Context API or Redux for state management (passed)
