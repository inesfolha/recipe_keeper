# Recipe Keeper 
<p id="top"></p>

Recipe Keeper is a web application that allows users to manage their recipes. Users can create, read, update, and delete recipes using the provided user interface.

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [How does it work?](#how-does-it-work)
- [API Endpoints](#api-endpoints)
- [Contributions](#contributions)
- [License](#license)

[Back to the Top](#top)
## Features

- Create new recipes with a name, ingredients, steps, and an optional image.
- View a list of all your recipes.
- Edit existing recipes.
- Delete recipes you no longer need.
- A user-friendly web interface for easy recipe management.

## File Structure

- `recipe_app_2.0/` - Contains the main application files.
  - `static/` - Cascading Style Sheets (CSS) for styling the web application and other static assets
  - `api_endpoints.js` - JavaScript module for making API requests.
  - `package.json` - Node.js package configuration.
  - `recipe_2.html` - HTML file for the web application.
  - `recipe_app_2.js` - JavaScript module for the web application logic.


- `recipes_api/` - Contains the backend API.
  - `api.py` - Python module providing CRUD operations for recipes.
  - `recipes.json` - JSON file used for storing recipe data.

[Back to the Top](#top)
## API Endpoints

The API provides the following endpoints:

- `GET /recipes`: Retrieve all recipes.
- `POST /recipes`: Create a new recipe.
- `GET /recipes/{recipe_id}`: Retrieve a specific recipe by its ID.
- `PUT /recipes/{recipe_id}`: Update a specific recipe by its ID.
- `DELETE /recipes/{recipe_id}`: Delete a specific recipe by its ID.

## Dependencies

- [FastAPI](https://fastapi.tiangolo.com/) - A modern, fast (high-performance) web framework for building APIs.
- [uvicorn](https://www.uvicorn.org/) - ASGI server for running the FastAPI application.
- [pydantic](https://pydantic-docs.helpmanual.io/) - Data validation and parsing using Python type annotations.
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - JavaScript API for making network requests.

[Back to the Top](#top)
## Getting Started

1. Clone this repository to your local machine:
```bash
git clone git@github.com:inesfolha/recipe_keeper.git
```

2. Install the required Python dependencies:
```bash
pip install fastapi uvicorn pydantic
```
3. Install the required Node.js dependencies (inside the `recipe_app_2.0` directory):
```bash
npm install
```
4. Start the FastAPI server:
```bash
python api.py
```
5. Open the web application in your browser:
```bash
http://localhost:8000/recipe_2.html
```
[Back to the Top](#top)

## How does it work?
- [Watch Demo](link)


## Contributions

Contributions to this project are welcome. If you'd like to contribute, please fork the repository, make your changes, and create a pull request.

[Back to the Top](#top)