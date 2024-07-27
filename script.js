document.getElementById('ingredient-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';

    if (recipes.length === 0) {
        recipesDiv.innerHTML = '<p>No recipes found for the given ingredients.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElem = document.createElement('div');
        recipeElem.innerHTML = `
            <h2>${recipe.title}</h2>
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
        `;
        recipesDiv.appendChild(recipeElem);
    });
}
