const recipeForm = document.getElementById('recipe-form');
const formTitle = document.getElementById('form-title');
const recipeNameInput = document.getElementById("recipeName");
const recipeIngredients = document.getElementById('ingredients');
const steps = document.getElementById('steps');
const submitButton = document.getElementById("addButton");
const recipeImage = document.getElementById("recipeImage");
const DEFAULT_IMAGE_URL = 'static/dish_image.png';


const displayArea = document.getElementById('recipes-list');

import { 
    getRecipes as getRecipesRequest, 
    addRecipe as addRecipeRequest, 
    deleteRecipe as deleteRecipeRequest, 
    editRecipe as editRecipeRequest   
} from './api_endpoints.js';


// Initialize recipes as an empty array
let recipes = [];
let editingMode = false; // set the editing mode 
let editingIndex = -1;

// Asynchronously fetch recipes and assign the result
getRecipesRequest()
  .then(data => {
    recipes = data;

    // After fetching the data, display the recipes
    recipes.forEach((recipe, index) => {
      displayRecipe(recipe, index);
    });
  })
  .catch(error => {
    console.error("Error fetching recipes:", error);
  });


/**
 * Create a container for edit and delete buttons associated with a recipe.
 *
 * @param {number} index - The index of the recipe in the `recipes` array.
 * @returns {HTMLDivElement} - A `div` element containing edit and delete buttons.
 */
function createButtonsDiv(index) {
    // Create a div to hold the edit and delete buttons
    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-container')

    // Create a delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-button');

    // Add an event handler for the delete button
    deleteButton.onclick = function() {
        deleteRecipe(index);
    };

    // Create an edit button
    let editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-button');
    editButton.dataset.index = index; // Store the index in the button's dataset

    // Add an event handler for the Edit button
    editButton.onclick = function() {
        enterEditMode(index);
    };

    // Append buttons to the buttonsDiv
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    return buttonsDiv;
}


/**
 * Create a container for displaying recipe information.
 *
 * @param {Object} recipe - The recipe object containing name, ingredients, steps, and image.
 * @returns {HTMLDivElement} - A `div` element containing recipe information.
 */
function createRecipeInfo(recipe) {
    // Create and add elements for recipe info
    let recipeName = document.createElement('h3');
    recipeName.textContent = recipe.name;

    let ingredientsList = document.createElement('p');
    ingredientsList.textContent = `Ingredients: ${recipe.ingredients}`;

    let stepsList = document.createElement('p');
    stepsList.textContent = `Steps: ${recipe.steps}`;

    let recipeImage = document.createElement('img');

    // Set the recipe image source and alt text
    if (recipe.image) {
        recipeImage.src = recipe.image;
        recipeImage.alt = 'Recipe Image';
    } else {
        recipeImage.src = DEFAULT_IMAGE_URL;
        recipeImage.alt = 'Default Recipe Image';
    }

    recipeImage.classList.add('recipe-image');

    // Create a container for recipe info
    let recipeInfo = document.createElement('div');
    recipeInfo.appendChild(recipeName);
    recipeInfo.appendChild(ingredientsList);
    recipeInfo.appendChild(stepsList);
    recipeInfo.appendChild(recipeImage);

    return recipeInfo;
}


/**
 * Display a recipe on the webpage.
 *
 * @param {Object} recipe - The recipe object to be displayed.
 * @param {number} index - The index of the recipe in the `recipes` array.
 */
function displayRecipe(recipe, index) {
    // Create a div for the new recipe
    let recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-item');

    // Create buttons container and recipe info
    let buttonsDiv = createButtonsDiv(index);
    let recipeInfo = createRecipeInfo(recipe);

    // Append recipe info and buttons to the recipeDiv
    recipeDiv.appendChild(recipeInfo);
    recipeDiv.appendChild(buttonsDiv);

    // Add the new recipe div to the display area
    displayArea.appendChild(recipeDiv);

};


/**
 * Handle the form submission event and either update an existing recipe or add a new one.
 *
 * @param {Event} event - The form submission event.
 */
recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture values from input fields
    let enteredRecipeName = recipeNameInput.value;
    let enteredIngredients = recipeIngredients.value;
    let enteredSteps = steps.value;
    let enteredImageURL = recipeImage.value;

    if (editingMode) {
        //Update the recipe
        let updatedRecipe = {
            name: enteredRecipeName,
            ingredients: [enteredIngredients],
            steps: enteredSteps,
            image: enteredImageURL || DEFAULT_IMAGE_URL
        };
        updateRecipe(editingIndex, updatedRecipe);
    } else {
        //Add new recipe
        let newRecipe = {
            name: enteredRecipeName,
            ingredients: [enteredIngredients],
            steps: enteredSteps,
            image: enteredImageURL || DEFAULT_IMAGE_URL
        };
    
        addRecipe(newRecipe);
    }
   
});


/**
 * Delete a recipe at the given index and update the display.
 *
 * @param {number} index - The index of the recipe in the `recipes` array to be deleted.
 */
async function deleteRecipe(index) {
    try {
        // Find the ID of the recipe at the given index
        const recipeToDelete = recipes[index];
        const recipeId = recipeToDelete.id;

        // Call the deleteRecipeRequest function with the recipe ID
        await deleteRecipeRequest(recipeId);

        // Remove the deleted recipe from the recipes array
        recipes.splice(index, 1);

        // Clear the display area
        displayArea.innerHTML = '';

        // Display the remaining recipes
        recipes.forEach((recipe, index) => {
            displayRecipe(recipe, index);
        });
    } catch (error) {
        console.error(error);
    }
};


/**
 * Enter edit mode for a specific recipe, populating the form fields with existing data.
 *
 * @param {number} index - The index of the recipe in the `recipes` array to be edited.
 */
function enterEditMode(index) {
    let recipe = recipes[index];
    recipeNameInput.value = recipe.name;
    recipeIngredients.value = recipe.ingredients;
    steps.value = recipe.steps;
    
    // Set the recipe image URL or null if it's the default image
    recipeImage.value = recipe.image === DEFAULT_IMAGE_URL ? null : recipe.image;


    submitButton.textContent = 'Update Recipe'; // Change the button text
    formTitle.textContent = `Edit "${recipe.name}" recipe`;
    editingMode = true;
    editingIndex = index;
};

/**
 * Add a new recipe to the `recipes` array, display it, and clear form input fields.
 *
 * @param {Object} recipe - The recipe object to be added.
 */
async function addRecipe(recipe_data) {
    try {
        const newRecipe = await addRecipeRequest(recipe_data);
        recipes.push(newRecipe);
        displayRecipe(newRecipe, recipes.length - 1);
        clearInput();
        return newRecipe; // Return the newly created recipe
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

/**
 * Update an existing recipe with new data, refresh the display, and exit edit mode.
 *
 * @param {number} index - The index of the recipe in the `recipes` array to be updated.
 * @param {Object} updatedRecipe - The updated recipe data.
 */
async function updateRecipe(index, updatedRecipe) {
    try {
        // Find the ID of the recipe at the given index
        const recipeToUpdate = recipes[index];
        const recipeId = recipeToUpdate.id;

        // Call the deleteRecipeRequest function with the recipe ID
        await editRecipeRequest(recipeId, updatedRecipe);

        editingMode = false;
        editingIndex = -1;
        clearInput()
        
        submitButton.textContent = 'Add Recipe'; // Change the button text
        formTitle.textContent = 'Add New Recipe';
        
        // update the recipes array
        recipes[index] = updatedRecipe;

        // Clear the display area
        displayArea.innerHTML = '';

        // Display the remaining recipes
        recipes.forEach((recipe, index) => {
            displayRecipe(recipe, index);
        });
    
    } catch (error) {
        console.error(error);
    }
};


/**
 * Clear the input fields of the recipe form.
 */
function clearInput(){    
    // Clear input fields
    recipeNameInput.value = '';
    recipeIngredients.value = '';
    steps.value = '';
    recipeImage.value = '';
}