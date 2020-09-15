const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"
const main = document.querySelector('div#main')
const br = document.createElement('br')

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
    // recipeForm.setAttribute('method',"post")
    // recipeForm.setAttribute('action',"submit")
    recipeForm.id = "recipe-form"


    const recipeDiv = document.createElement('div')

    const recipeNameInput = document.createElement("input") // input element/text
    recipeNameInput.setAttribute('type',"text")
    recipeNameInput.setAttribute('name',"recipe-name")
    recipeNameInput.id = "recipe-name"
    recipeNameInput.placeholder = "Recipe Name"
    
    const recipeDescriptionInput = document.createElement("input") // input element/text
    recipeDescriptionInput.setAttribute('type',"text")
    recipeDescriptionInput.setAttribute('name',"recipe-name")
    recipeDescriptionInput.id = "recipe-description"
    recipeDescriptionInput.placeholder = "Recipe Description"

    const recipeSubmitButton = document.createElement("input") // submit button
    recipeSubmitButton.setAttribute('type',"submit")
    recipeSubmitButton.setAttribute('value',"Create Recipe")

    recipeForm.appendChild(recipeDiv)
    recipeForm.appendChild(recipeNameInput)
    recipeForm.appendChild(recipeDescriptionInput)
    recipeForm.appendChild(recipeSubmitButton)

    document.getElementById('main').appendChild(recipeForm);
}