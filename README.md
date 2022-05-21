# Mira
<div align="left"><a href="https://aa-mira.herokuapp.com/">
<img src="https://github.com/adamtang5/aa_mod7_capstone_project/blob/main/react-app/src/static/images/logo/mira-logo.png?raw=true" height=80 /></a></div>

Mira is a clone of [Jira Service Management](https://www.atlassian.com/software/jira/service-management). Access the [Mira MVP](https://aa-mira.herokuapp.com/).

**Mira** is a issue management system where people can track progress of tasks and issues, and collaborate with others.

# Index
|
[MVP Feature List](https://github.com/adamtang5/aa_mod7_capstone_project/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/adamtang5/aa_mod7_capstone_project/wiki/Database-Schema) |
[API Documentation](https://github.com/adamtang5/aa_mod7_capstone_project/wiki/API-Documentation) |
[Frontend Routes](https://github.com/adamtang5/aa_mod7_capstone_project/wiki/Frontend-Routes) |


# Technologies Used
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/javascript/javascript-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/react/react-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/redux/redux-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/nodejs/nodejs-plain-wordmark.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/python/python-original-wordmark.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/flask/flask-original-wordmark.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/postgresql/postgresql-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/css3/css3-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/html5/html5-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/git/git-original.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/docker/docker-original-wordmark.svg" height=40 /><img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/vscode/vscode-original.svg" height=40 />


# Getting started

1. Clone this repo.

    * ```git clone git@github.com:adamtang5/aa_mod7_capstone_project.git```

2. Install dependencies.

    * ```pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt```

3. Create a `.env` file based on the __.env.example__ with proper settings required for the development environment.

4. Setup PostgreSQL user, password and database and to make sure it matches the `.env` file.

5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:

    * ```pipenv shell```
    * ```flask db migrate```
    * ```flask seed all```
    * ```flask run```

6. To run the React App in development, checkout the [README](https://github.com/adamtang5/aa_mod7_capstone_project/blob/main/react-app/README.md) inside the `react-app` directory.

# Features

## Projects

Users can perform the following actions.

 - Add/View/Edit/Delete Projects
 - Add/View/Edit/Archive Issues
 - Add/View/Edit/Delete Comments
