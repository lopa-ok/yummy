document.getElementById('ingredient-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredients"]:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    fetchRecipes(selectedIngredients);
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
        recipesDiv.innerHTML = '<p>No recipes found for the selected ingredients.</p>';
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
