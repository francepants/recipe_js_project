const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"
const main = document.querySelector('div#main')

document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    loadRecipes()
    createRecipeForm()
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
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const button = document.createElement('button')

    
    h3.innerText = recipe.name
    p.innerText = recipe.description
    button.innerText = "See ingredients"

    //click event loads ingredients over and over every time the button is pressed
    //show/hide
    // need it to load certain recipes ingredients using recipe_id
    button.addEventListener('click', loadIngredients) 
    
    
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(button)
    main.appendChild(div)
}

// ingredients
function loadIngredients() {
    fetch(INGREDIENTS_URL)
    .then(function(resp){
        return resp.json();
    })
    .then(function(ingredients){
        ingredients.forEach(function(ingredient){
            displayIngredients(ingredient)
        })
    })
}

function displayIngredients(ingredients){

    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const button = document.createElement('button')
    

    
    ul.innerText = "Ingredients:"
    li.innerText = ingredients.ingredient_name
    button.innerText = "See ingredients"

    ul.appendChild(li) 
    main.appendChild(ul)
  
}


// create recipe form
function createRecipeForm() {
    const recipeForm = document.createElement('form')
    recipeForm.setAttribute('method',"post")
    recipeForm.setAttribute('action',"submit")

    const recipeDiv = document.createElement('div')

    const recipeInput = document.createElement("input") // input element/text
    recipeInput.setAttribute('type',"text")
    recipeInput.setAttribute('name',"recipe-name")

    const recipeSubmitButton = document.createElement("input")
    recipeSubmitButton.setAttribute('type',"submit")
    recipeSubmitButton.setAttribute('value',"Create Recipe")

    recipeForm.appendChild(recipeDiv)
    recipeForm.appendChild(recipeInput)
    recipeForm.appendChild(recipeSubmitButton)

    document.getElementById('main').appendChild(recipeForm);
}
// add recipe button


//random