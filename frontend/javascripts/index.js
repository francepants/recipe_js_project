document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    loadRecipes()
}

function loadRecipes() {
    fetch('http://localhost:3000/recipes')
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

    div.innerHTML = `
    <h3>${recipe.name}</h3>
    <p>${recipe.description}</p>
    `
    main.appendChild(div)
}