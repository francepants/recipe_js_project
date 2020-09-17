const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"
const main = document.querySelector('div#main')
const recipeSubmitButton = () => document.getElementById('submit-recipe')

let editing = false
let editedRecipeId = null

const form = () => document.getElementById('recipe-form')
const recipeName = () => document.getElementById('recipe-name')
const recipeDescription = () => document.getElementById('recipe-description')

////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    loadRecipes()
    createRecipeForm()
    form().addEventListener('submit', createRecipe)
}

////////////////////////////////////////////////////////////
// recipes
function loadRecipes() {
    fetch(RECIPES_URL)
    .then(resp => resp.json())
    .then(recipes => displayRecipes(recipes))
}

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

    let seeIngredientsButton = document.createElement('button')
    seeIngredientsButton.innerText = "See ingredients"
    seeIngredientsButton.addEventListener('click', loadIngredients) 
    
    let deleteRecipeButton = document.createElement('button')
    deleteRecipeButton.innerText = "Delete"
    deleteRecipeButton.className = "delete"
    deleteRecipeButton.id = recipe.id
    deleteRecipeButton.addEventListener('click', deleteRecipe)

    let editRecipeButton = document.createElement('button')
    editRecipeButton.innerText = "Edit"
    editRecipeButton.className = "edit"
    editRecipeButton.id = recipe.id
    editRecipeButton.addEventListener('click', editRecipe)

    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(seeIngredientsButton)
    div.appendChild(editRecipeButton)
    div.appendChild(deleteRecipeButton)
    main.appendChild(div)
}

////////////////////////////////////////////////////////////
// ingredients //needs work
function loadIngredients(e) {
    // debugger
    fetch(INGREDIENTS_URL)
    .then(resp => resp.json())
    .then(function(recipe){
        recipe.forEach(function(ingredients){
            displayIngredients(ingredients)
        })
    })
}

function displayIngredients(e){
    // debugger
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    // let button = document.createElement('button')
    
    ul.innerText = "Ingredients:"
    li.innerText = ingredients.ingredient_name
    button.innerText = "See ingredients"

    ul.appendChild(li) 
    main.appendChild(ul)

}

////////////////////////////////////////////////////////////
// create recipe form
function createRecipeForm() {
    let recipeForm = document.createElement('form')
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

    let recipeSubmitButton = document.createElement("button") // submit button
    recipeSubmitButton.id = "submit-recipe"
    recipeSubmitButton.innerText = "Submit Recipe"
    recipeSubmitButton.className = "submit-recipe"



    recipeForm.appendChild(recipeDiv)
    recipeForm.appendChild(recipeNameInput)
    recipeForm.appendChild(recipeDescriptionInput)
    recipeForm.appendChild(recipeSubmitButton)

    document.getElementById('main').appendChild(recipeForm);
}
////////////////////////////////////////////////////////////
function createRecipe(e) {
    e.preventDefault();

    if(editing) {
        updateRecipe()
    } else {
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

}
////////////////////////////////////////////////////////////
function resetInputs() {
    recipeName().value = ""
    recipeDescription().value = ""
    recipeSubmitButton().innerText = "Add Recipe"
}

////////////////////////////////////////////////////////////
// DELETE Recipe
function deleteRecipe(e){
    this.id 
    this.parentNode
    // debugger
    fetch(RECIPES_URL + "/" +(this.id), {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        this.parentNode.remove()
    })
}
// edit Recipe
function editRecipe(e){
    // debugger
    editing = true
    recipeName().value = this.parentNode.querySelector('h3').innerText
    recipeDescription().value = this.parentNode.querySelector('p').innerText
    recipeSubmitButton().innerText = "Edit Recipe"

    editedRecipeId = this.id
}
// update recipe
function updateRecipe(e) {
    let name = recipeName().value
    let description = recipeDescription().value

    const strongParams = {
        recipe: {
            name: name,
            description: description
        }
    }
    fetch(RECIPES_URL + "/" + editedRecipeId, {
        method: "PATCH",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {
        // debugger
        const div = document.getElementById(editedRecipeId)
        div.querySelector('h3').innerText = data.name
        div.querySelector('p').innerText = data.description

        editing = false
        editedRecipeId = null
        resetInputs()
        // recipeSubmitButton().innerText = "Update Recipe"
    })
}

