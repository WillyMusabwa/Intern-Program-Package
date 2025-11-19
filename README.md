A simple, responsive task management application built with Html, CSS \& JavaScript. This app allows users to create, edit and delete tasks. And it can also record the time spent on the task upon completion.





###### **Technical Approach**



* I chose to use HTML, CSS, and JavaScript for this assessment because its the most way am comfortable with and has more informations on.



* I used a JavaScript array to keep track of all the tasks. Whenever a task is added or updated, the app refreshes the list on the screen to show the changes.
* I used the local Storage so that the tasks don't disappear when you refresh the browser or close the tab it still remains there because it is kept on my local storage.
* I used standard CSS and Flexbox to make sure the app looks good and is easy to read on both phone screens and computer screens.
* I added a small check to make sure that if someone types special symbols like HTML tags into the input box, it is treated as text and doesn't break the app.



###### **Design Decisions**



* The requirement asked to enter time when marking as done. I implemented a pop-up that triggers specifically when the Done button is clicked for users to input the time spent on a task.
* I decided users should not be able to edit a task once it is marked as done to preserve the Time Spent data that was entered.
* Added simple validation rules to ensures users cannot create empty tasks or enter negative time values.



###### **Testing**



I performed manual testing across the following scenarios:

1\. Added tasks, clicked done, entered time, verified it moved to completed state and the time spent i entered is visible.

2\. Tried submitting empty tasks and it got blocked by the system. Tried entering negative minutes and it also got blocked.

3\. I then refreshed the page to ensure the tasks remained and they were still there.

4\. Checked responsiveness on both pc and phone to ensure good layout and view on both devices..



**Total time:** Approximately between 6-7 hours (Planning, Coding, Styling, and Documentation).

