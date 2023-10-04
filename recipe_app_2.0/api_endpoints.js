export async function getRecipes(){
    try{
        const response = await fetch('http://127.0.0.1:8000/recipes');
        
        if(response.status !== 200){
            throw new Error('Error fetching data');
        }
        
        const recipes = await response.json();
        return recipes
        
    } catch(error){
        console.log(error)}
        throw error;
};


export async function addRecipe(recipe_data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/recipes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe_data)
        });

        if (response.status === 200) {
            const newRecipe = await response.json();
            return newRecipe;
        } else {
            throw new Error('Error adding data');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function deleteRecipe(recipeId){
    try { 
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`, {
            method: 'DELETE'
        });
        if (response.status !== 200) {
            throw new Error('Error deleting recipe');
        };
        return 'Recipe successfully deleted'
    
    } catch (error) {
        console.error(error);
        throw error; 
    }
};


export async function editRecipe(recipeId, recipeInfo) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`, {
        method: 'PUT', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeInfo)
    });

        if (response.status !== 200) {
            throw new Error('Error editing recipe');
        };

        const responseData = await response.json();
        return 'Recipe successfully updated'
    
    } catch (error) {
        console.error(error);
        throw error;
    }

};

