class Recipes {
    static all = []

    constructor(id, name, description, cooking_time, directions, ingredients){
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooking_time = cooking_time;
        this.directions = directions;
        this.ingredients = ingredients;
        debugger
        Recipes.all.push(this)
    }


    static create(id, name, description, cooking_time, directions, ingredients){
        let recipe = new Recipes(id, name, description, cooking_time, directions, ingredients)
            Recipes.all.push(recipe)
            return recipe
    }
}

////////////////////////////////////////////////////////////// load recipes
function loadRecipes(e) {
    fetch(RECIPES_URL)
    .then(resp => resp.json())
    .then(recipes => recipes.forEach(recipe => displayRecipe(recipe)))
}

////////////////////////////////////////////////////////////// create recipe form
function createRecipeForm() {
    let recipeForm = document.createElement('form')
    recipeForm.id = "recipe-form"

    let recipeDiv = document.createElement('div')
    recipeDiv.id = "recipe-form-div"

    let recipeNameInput = document.createElement('input')// input element/text
    recipeNameInput.setAttribute('type',"text")
    recipeNameInput.setAttribute('name',"recipe-name")
    recipeNameInput.id = "recipe-name"
    recipeNameInput.placeholder = "Recipe Name"
    recipeNameInput.required = true
    
    let recipeDescriptionInput = document.createElement("input") // input element/text
    recipeDescriptionInput.setAttribute('type',"text")
    recipeDescriptionInput.setAttribute('name',"recipe-description")
    recipeDescriptionInput.id = "recipe-description"
    recipeDescriptionInput.placeholder = "Recipe Description"
    recipeDescriptionInput.required = true

    // let recipeCookingTimeInput = document.createElement("input") // input element/text
    // recipeCookingTimeInput.setAttribute('type',"text")
    // recipeCookingTimeInput.setAttribute('name',"recipe-cooking_time")
    // recipeCookingTimeInput.id = "recipe-cooking_time"
    // recipeCookingTimeInput.placeholder = "Recipe Cook Time"

    let recipeSubmitButton = document.createElement("button") // submit button
    recipeSubmitButton.id = "submit-recipe"
    recipeSubmitButton.innerText = "Submit Recipe"
    recipeSubmitButton.className = "submit-recipe"

    recipeForm.appendChild(recipeDiv)
    recipeForm.appendChild(recipeNameInput)
    recipeForm.appendChild(recipeDescriptionInput)
    // recipeForm.appendChild(recipeCookingTimeInput)
    recipeForm.appendChild(recipeSubmitButton)

    document.getElementById('main').appendChild(recipeForm);
}

////////////////////////////////////////////////////////////// create recipe
function createRecipe(e) {
    e.preventDefault();

    if(editing) {
        updateRecipe()
    } else {
        let strongParams = {
            recipe: { //require recipe and permit name and desc
                name: recipeName().value,
                description: recipeDescription().value
                // cooking_time: recipeCookTime().value
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

////////////////////////////////////////////////////////////// display recipe
function displayRecipe(recipe){
    let recDiv = document.createElement('div')
    recDiv.className = 'rec-div'
    recDiv.id = recipe.id
    
    let h3 = document.createElement('h3')
    h3.innerText = recipe.name
    
    let p = document.createElement('p')
    p.innerText = recipe.description
    
    // let ingredient_p = document.createElement('p') 
    // ingredient_p.innerText = recipe.ingredients.map(ing => ing.ingredient_name)

    let addIngredientsButton = document.createElement('button')
    addIngredientsButton.innerText = "Add ingredients"
    addIngredientsButton.addEventListener('click', createIngredientsForm)

    let ingredientFormDiv = document.createElement('div') //where the ingredient form is
    ingredientFormDiv.id = "ingredient-form-div"

    let ingredientForRecipeDiv = document.createElement('div') // for ingredients to display per recipe
    ingredientForRecipeDiv.id = "ingredient-for-recipe-div"

    let seeIngredientsButton = document.createElement('button')
    seeIngredientsButton.innerText = "See ingredients"
    seeIngredientsButton.id = recipe.id
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

    recDiv.appendChild(h3)
    recDiv.appendChild(p)
    // recDiv.appendChild(ingredient_p)
    recDiv.appendChild(addIngredientsButton)
    recDiv.appendChild(seeIngredientsButton)
    recDiv.appendChild(editRecipeButton)
    recDiv.appendChild(deleteRecipeButton)
    recDiv.appendChild(ingredientFormDiv)
    recDiv.appendChild(ingredientForRecipeDiv)

    main.appendChild(recDiv)
}

////////////////////////////////////////////////////////////// EDIT Recipe
function editRecipe(e){
    
    editing = true //prevents from making duplicate
    recipeName().value = this.parentNode.querySelector('h3').innerText
    recipeDescription().value = this.parentNode.querySelector('p').innerText
    recipeSubmitButton().innerText = "Submit Edits"
    
    editedRecipeId = this.id
}

////////////////////////////////////////////////////////////// UPDATE recipe
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
        
        const div = document.getElementById(editedRecipeId)
        div.querySelector('h3').innerText = data.name
        div.querySelector('p').innerText = data.description
        
        editing = false
        editedRecipeId = null
        resetInputs()
    })
}

////////////////////////////////////////////////////////////// DELETE Recipe
function deleteRecipe(e){
    this.id 
    this.parentNode
  
    fetch(RECIPES_URL + "/" +(this.id), {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        this.parentNode.remove()
    })
}

////////////////////////////////////////////////////////////// reset inputs
function resetInputs() {
    recipeName().value = ""
    recipeDescription().value = ""
    recipeSubmitButton().innerText = "Add Recipe"
}

////////////////////////////////////////////////////////////// show/hide recipe form
function showHideAddRecipeButton(e) {
    let x = document.getElementById('recipe-form');
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}