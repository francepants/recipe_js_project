class Ingredients {
    constructor(id, ingredient_name, measurement, recipe_id) {
        this.id = id;
        this.ingredient_name = ingredient_name;
        this.measurement = measurement;
        this.recipe_id = recipe_id;
    }

    // static create(id, ingredient_name, measurement, recipe_id){
    //     let ingredient = new Ingredients(id, ingredient_name, measurement, recipe_id)
    //         Ingredients.all.push(ingredient)
    //         return ingredient
    // }

    static loadIngredients(e) {
        let parentNode = this.parentNode
        // http://localhost:3000/recipes/1
        fetch(`http://localhost:3000/recipes/${this.id}`)
        .then(resp => resp.json())
        .then(function(recipe){
            let ingredientForRecipeDiv = parentNode.querySelector('#ingredient-for-recipe-div')
            ingredientForRecipeDiv.innerHTML = ""
            recipe.ingredients.forEach(function(ing){
                displayIngredient(parentNode, ing)
            })
        })
    }
}

////////////////////////////////////////////////////////////// load ingredients
// function loadIngredients(e) {
//     let parentNode = this.parentNode
//     // http://localhost:3000/recipes/1
//     fetch(`http://localhost:3000/recipes/${this.id}`)
//     .then(resp => resp.json())
//     .then(function(recipe){
//         let ingredientForRecipeDiv = parentNode.querySelector('#ingredient-for-recipe-div')
//         ingredientForRecipeDiv.innerHTML = ""
//         recipe.ingredients.forEach(function(ing){
//             displayIngredient(parentNode, ing)
//         })
//     })
// }


////////////////////////////////////////////////////////////// add/create ingredients FORM
function createIngredientsForm(e) {
    let ingredientsForm = document.createElement('form')
    ingredientsForm.id = "ingredient-form"
    ingredientsForm.addEventListener('submit', createIngredients)
    
    let ingredientDiv = document.createElement('div')
    
    let ingredientNameInput = document.createElement('input')// input element/text
    ingredientNameInput.setAttribute('type',"text")
    ingredientNameInput.setAttribute('name',"ingredient-name")
    ingredientNameInput.id = "ingredient-name"
    ingredientNameInput.placeholder = "Ingredient Name"
    ingredientNameInput.required = true
    
    let ingredientMeasurementInput = document.createElement("input") // input element/text
    ingredientMeasurementInput.setAttribute('type',"text")
    ingredientMeasurementInput.setAttribute('name',"ingredient-measurement")
    ingredientMeasurementInput.id = "ingredient-measurement"
    ingredientMeasurementInput.placeholder = "Ingredient Measurement"
    ingredientMeasurementInput.required = true
    
    let ingredientSubmitButton = document.createElement("button") // submit button
    ingredientSubmitButton.id = "submit-ingredient"
    ingredientSubmitButton.innerText = "Submit Ingredient"
    ingredientSubmitButton.className = "submit-ingredient"
    
    ingredientsForm.appendChild(ingredientDiv)
    ingredientsForm.appendChild(ingredientNameInput)
    ingredientsForm.appendChild(ingredientMeasurementInput)
    // recipeForm.appendChild(recipeCookingTimeInput)
    ingredientsForm.appendChild(ingredientSubmitButton)
    
    //grabs the div from recipe.js
    let ingredientFormDiv = this.parentNode.querySelector("#ingredient-form-div") 
    ingredientFormDiv.innerHTML = ""
    ingredientFormDiv.appendChild(ingredientsForm)
    currentRecipeId = this.parentNode.id
}

////////////////////////////////////////////////////////////// create ingredients
function createIngredients(e) {
    e.preventDefault()
    let strongParams = {
        ingredient: { //require ingredients and permit name and measurement
            ingredient_name: ingredientName().value,
            measurement: ingredientMeasurement().value,
            recipe_id: currentRecipeId
        }
    }
    //send to back end // POST recipe
    fetch(INGREDIENTS_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(ingredient => { 
        let parentNode = document.getElementById(currentRecipeId)
        displayIngredient(parentNode, ingredient)
    })
    resetInputs()
}

////////////////////////////////////////////////////////////// display ingredients
function displayIngredient(parentNode, ing){
    // let ul = document.createElement('ul')
    let li = document.createElement('li')
    li.innerText = `${ing.ingredient_name} - ${ing.measurement}`
    
    let ingredientForRecipeDiv = parentNode.querySelector('#ingredient-for-recipe-div')
    ingredientForRecipeDiv.appendChild(li)
}


