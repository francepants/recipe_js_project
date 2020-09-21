const BASE_URL = "http://localhost:3000"
const RECIPES_URL = "http://localhost:3000/recipes"
const INGREDIENTS_URL = "http://localhost:3000/ingredients"

const main = document.querySelector('div#main')

//recipe
let editing = false
let editedRecipeId = null
let currentRecipeId = null
const form = () => document.getElementById('recipe-form')
const recipeCookTime = () => document.getElementById('recipe-cook-time')
const recipeName = () => document.getElementById('recipe-name')
const recipeDescription = () => document.getElementById('recipe-description')
const recipeSubmitButton = () => document.getElementById('submit-recipe')

//ingredient
const ingredientName = () => document.getElementById('ingredient-name')
const ingredientMeasurement = () => document.getElementById('ingredient-measurement')

////////////////////////////////////////////////////////////// event listener
document.addEventListener('DOMContentLoaded', handleEvents())

function handleEvents() {
    // loadRecipes()
    Recipes.createRecipeForm()
    form().addEventListener('submit', Recipes.createRecipe)
}

Recipes.loadRecipes()