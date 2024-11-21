# TO DO LIST - README

## User stories

### 1. Task list

On app load, user should see the full list of tasks, centered in the middle, with each item having
Name, Priority and State displayed on it. User can click on the State button/text, and move it to the next state.
Eg: if task is in "To do" state, clicking on it will move it to "In Progress".

### 2. Create Task

On a button click on the Task list view, modal is opened where user can input data in order to create a new task.
User has to be able to enter a name of the task and select a priority. By default, each tasks will be in "todo" state.
When the task is created, it should be on the top of the list.

### 3. Delete Task

User can delete a task, by clicking a delete button on a list on a task. Prior to deletion, confirmation modal is shown
where user can either click "Cancel", or "Confirm". On cancel, modal is closed while on confirm, modal is closed and task
is removed from the UI. In case there are no tasks remaining, user sees a "All done!" texts.

### 4. Edit Task

User can edit a task, by clicking an edit button on a list on a task. Upon clicking, modal is opened with that
particular task information filled. If user presses the "Edit" button, tasks information will be updated, and the modal
closed.

### 5. Sort & Filter tasks

On the list view, user can sort and filter tasks by their state and priority. By default, list view should
filter out tasks that are done, and sort them by higher priority.

_(bonus)_ User always sees the latest sort/filter combination he had selected, on each consequent visit.
