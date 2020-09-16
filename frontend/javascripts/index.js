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
    .then(recipes => displayRecipes(recipes))
}
    // .then(rec => rec.forEach(recipe => {
    //     let recipes = Recipes.create(recipe.id, recipe.name, recipe.description, recipe.cooking_time, recipe.directions)
    //     displayRecipes(recipes)
    //     }))
    ///////
    // .then(function(recipes){
    //     recipes.forEach(function(recipe){
    //         displayRecipe(recipe)  //displayRecipe(recipe) - singular, shows seed data
    //     })
    // })

function displayRecipes(recipes) {
    recipes.forEach(recipe => displayRecipe(recipe))
}

function displayRecipe(recipe){
    // let recipeListDiv = document.createElement('div')
    let div = document.createElement('div')
    div.id = recipe.id
    // debugger
    let h3 = document.createElement('h3')
    h3.innerText = recipe.name

    let p = document.createElement('p')
    p.innerText = recipe.description

    //click event loads ingredients over and over every time the button is pressed // need it to load certain recipes ingredients using recipe_id
    let seeIngredientsButton = document.createElement('button')
    seeIngredientsButton.innerText = "See ingredients"
    seeIngredientsButton.addEventListener('click', loadIngredients) 
    
    let deleteRecipeButton = document.createElement('button')
    deleteRecipeButton.setAttribute("data-id", recipe.id)
    deleteRecipeButton.innerText = "Delete"
    deleteRecipeButton.className = "delete"
    deleteRecipeButton.addEventListener('click', () =>{
        deleteRecipe(deleteRecipeButton.getAttribute("data-id"))
    })
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(seeIngredientsButton)
    div.appendChild(deleteRecipeButton)
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

    let recipeNameInput = document.createElement('input') // input element/text
    recipeNameInput.setAttribute('type',"text")
    recipeNameInput.setAttribute('name',"recipe-name")
    recipeNameInput.id = "recipe-name"
    recipeNameInput.placeholder = "Recipe Name"
    
    let recipeDescriptionInput = document.createElement("input") // input element/text
    recipeDescriptionInput.setAttribute('type',"text")
    recipeDescriptionInput.setAttribute('name',"recipe-description")
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

    let strongParams = {
        recipe: { //require recipe and permit name and desc
            name: recipeName().value,
            description: recipeDescription().value
        }
    }
    //send to back end // POST recipe
    fetch(RECIPES_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(recipe => { 
        displayRecipe(recipe)
    })
    resetInputs()
}

function resetInputs() {
    recipeName().value = ""
    recipeDescription().value = ""
}

// DELETE Recipe
function deleteRecipe(id){
    // e.preventDefault();

    let recipeId = `${RECIPES_URL}/${id}`
    fetch(recipeId, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"            
        }
    })
    .then(resp => resp.json())
    .then(object => document.getElementById(object.id))
    this.location.reload();
}