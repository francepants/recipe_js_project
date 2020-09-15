const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"
const main = document.querySelector('div#main')

const form = () => document.getElementById('recipe-form')
const recipeName = () => document.getElementById('recipe-name')
const recipeDescription = () => document.getElementById('recipe-description')
// let recipes = []


document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    loadRecipes()
    createRecipeForm()
    form().addEventListener('submit', createRecipe)
}

// recipes
function loadRecipes() {
    fetch(RECIPES_URL)
    .then(resp => resp.json())
    .then(obj => obj.forEach(recipe => {
        let recipesss = Recipes.create(recipe.id, recipe.name, recipe.description)
        displayRecipe(recipesss)
    }))
    // .then(recipes => displayRecipes(recipes))
    ///////
    // .then(function(recipes){
    //     recipes.forEach(function(recipe){
    //         displayRecipe(recipe)  //displayRecipe(recipe) - singular, shows seed data
    //     })
    // })
}

function displayRecipes(recipes) {
    recipes.forEach(recipe => displayRecipe(recipe))
}

function displayRecipe(recipe){
    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    let button = document.createElement('button')

    // const recipeListDiv = document.createElement('div')

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
    // recipeListDiv.appendChild(div)
    main.appendChild(div)
}

// ingredients //needs work
function loadIngredients(ingredients) {
    
    fetch(INGREDIENTS_URL)
    .then(resp => resp.json())
    .then(function(ingredients){
        ingredients.forEach(function(ingredient){
            displayIngredients(ingredient)
        })
    })
}

function displayIngredients(ingredients){

    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let button = document.createElement('button')
    
    ul.innerText = "Ingredients:"
    li.innerText = ingredients.ingredient_name
    button.innerText = "See ingredients"

    ul.appendChild(li) 
    main.appendChild(ul)
}


// create recipe form
function createRecipeForm() {
    let recipeForm = document.createElement('form')
    // recipeForm.setAttribute('method',"post")
    // recipeForm.setAttribute('action',"submit")
    recipeForm.id = "recipe-form"

    let recipeDiv = document.createElement('div')

    let recipeNameInput = document.createElement("input") // input element/text
    recipeNameInput.setAttribute('type',"text")
    recipeNameInput.setAttribute('name',"recipe-name")
    recipeNameInput.id = "recipe-name"
    recipeNameInput.placeholder = "Recipe Name"
    
    let recipeDescriptionInput = document.createElement("input") // input element/text
    recipeDescriptionInput.setAttribute('type',"text")
    recipeDescriptionInput.setAttribute('name',"recipe-name")
    recipeDescriptionInput.id = "recipe-description"
    recipeDescriptionInput.placeholder = "Recipe Description"

    let recipeSubmitButton = document.createElement("input") // submit button
    recipeSubmitButton.setAttribute('type',"submit")
    recipeSubmitButton.setAttribute('value',"Create Recipe")

    recipeForm.appendChild(recipeDiv)
    recipeForm.appendChild(recipeNameInput)
    recipeForm.appendChild(recipeDescriptionInput)
    recipeForm.appendChild(recipeSubmitButton)

    document.getElementById('main').appendChild(recipeForm);
}

function createRecipe(e) {
    e.preventDefault();

    let recipe = {
        name: recipeName().value,
        description: recipeDescription().value
    }
    // recipes.push(recipe) //save
    displayRecipe(recipe)
}