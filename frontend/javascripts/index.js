const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"

document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    loadRecipes()
}

// recipes
function loadRecipes() {
    fetch(RECIPES_URL)
    .then(function(resp){
        return resp.json();
    })
    .then(function(recipes){
        recipes.forEach(function(recipe){
            displayRecipe(recipe)
        })
    })
}

function displayRecipe(recipe){
    const main = document.querySelector('div#main')
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const button = document.createElement('button')

    
    h3.innerText = recipe.name
    p.innerText = recipe.description
    button.innerText = "See ingredients"

    main.appendChild(h3)
    main.appendChild(p)
    main.appendChild(button)
}

// ingredients
function loadIngredients() {
    fetch(INGREDIENTS_URL)
    .then(function(resp){
        return resp.json();
    })
    .then(function(ingredients){
        ingredients.forEach(function(ing){
            displayIngredient(ing)
        })
    })
}