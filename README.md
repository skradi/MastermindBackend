# Mastermind - logic game (backend Express)


![mastermindb](https://github.com/skradi/MastermindBackend/assets/144287736/96449f7e-dc5b-4314-ba92-7bf81c58878e)

### Technologies
Express, TypeScript

### Available Scripts
In the project directory, you can run locally:
`npm i`
`npm run start:dev`

The project is using an SQL database, so if you want to run this project locally, you need to create a database with only one table named 'users,' containing:
id varchar 36 uuid;
username varchar 20;
hashpassword varchar 70;
tokenid varchar 200 Allow NULL; 
email varchar 50; 
game varchar 20 Allow NULL; 

### Links

Link to the Mastermind page: [mastermind page](https://mastermind.elosito.usermd.net).<br>
Link to gitHub mastermind frontend: https://github.com/skradi/MastermindFrontend

### Roadmap 
For now, you can only play solo games, but in the future, I plan to add some features: 
- Leaderboard (list of top 10 best players).
- Adding Friends. 
- Challenging a friend to a duel. 
