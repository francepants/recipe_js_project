class Recipes {
    static all = []

    constructor(id, name, description, ingredients){
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        // Recipes.all.push(this)
    }

    //load recipe
    static loadRecipes() {
        fetch("http://localhost:3000/recipes")
        .then(resp => resp.json())
        .then(data => {
            Recipes.createRecipes(data)
            Recipes.displayRecipes()
            Recipes.searchRecipes()
        })
    }

    //create recipe FORM
    static createRecipeForm() {
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


    static createRecipes(recipesData){
        console.log(recipesData)
        recipesData.forEach(data => Recipes.create(data.id, data.name, data.description))
    }

    static create(id, name, description){
        let recipe = new Recipes(id, name, description)
        Recipes.all.push(recipe) //shows recipes on page
        return recipe
    }


    //create recipe from form
    static createRecipe(e) {
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
            .then(data => { 
                let recipe = Recipes.create(data.id, data.name, data.description)
                recipe.display()
            })
            resetInputs()
        }
    }

    // display all recipes
    static displayRecipes(){
        Recipes.all.map(recipe => recipe.display())
    }

    // display recipe look
    display(){
        // debugger
        let recDiv = document.createElement('div')
        recDiv.className = 'rec-div'
        recDiv.id = this.id
        
        let h3 = document.createElement('h3')
        h3.innerText = this.name
        
        let p = document.createElement('p')
        p.innerText = this.description

        let addIngredientsButton = document.createElement('button')
        addIngredientsButton.innerText = "Add ingredients"
        addIngredientsButton.addEventListener('click', Ingredients.createIngredientsForm)

        let ingredientFormDiv = document.createElement('div') //where the ingredient form is
        ingredientFormDiv.id = "ingredient-form-div"

        let ingredientForRecipeDiv = document.createElement('div') // for ingredients to display per recipe
        ingredientForRecipeDiv.id = "ingredient-for-recipe-div"

        let seeIngredientsButton = document.createElement('button')
        seeIngredientsButton.innerText = "See ingredients"
        seeIngredientsButton.id = this.id
        seeIngredientsButton.addEventListener('click', Ingredients.loadIngredients)
        
        let deleteRecipeButton = document.createElement('button')
        deleteRecipeButton.innerText = "Delete"
        deleteRecipeButton.className = "delete"
        deleteRecipeButton.id = this.id
        deleteRecipeButton.addEventListener('click', deleteRecipe)

        let editRecipeButton = document.createElement('button')
        editRecipeButton.innerText = "Edit"
        editRecipeButton.className = "edit"
        editRecipeButton.id = this.id
        editRecipeButton.addEventListener('click', editRecipe)

        recDiv.appendChild(h3)
        recDiv.appendChild(p)
        recDiv.appendChild(addIngredientsButton)
        recDiv.appendChild(seeIngredientsButton)
        recDiv.appendChild(editRecipeButton)
        recDiv.appendChild(deleteRecipeButton)
        recDiv.appendChild(ingredientFormDiv)
        recDiv.appendChild(ingredientForRecipeDiv)
        
        main.appendChild(recDiv)
    }

    // search
    static searchRecipes() {
        let getSearchFieldDiv = document.getElementById('search-field-div')
        let searchField = document.createElement('input')
        searchField.setAttribute('type',"text")
        searchField.id = 'search-field'
        searchField.placeholder = "Search Recipes"
        getSearchFieldDiv.appendChild(searchField)
        
        searchField.addEventListener('keyup', function(e){
            const searchedLetter = e.target.value //is case sensitive
            console.log(searchedLetter)

            let filteredRecipes = Recipes.all.filter(data => data.name.startsWith(searchedLetter))
            console.log(filteredRecipes)
        })
    
    }
}



// EDIT Recipe
function editRecipe(e){
    
    editing = true //prevents from making duplicate
    recipeName().value = this.parentNode.querySelector('h3').innerText
    recipeDescription().value = this.parentNode.querySelector('p').innerText
    recipeSubmitButton().innerText = "Submit Edits"
    
    editedRecipeId = this.id
}

// UPDATE recipe
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

// DELETE Recipe
function deleteRecipe(e){
    fetch(RECIPES_URL + "/" +this.id, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        this.parentNode.remove()
    })
}

// reset inputs
function resetInputs() {
    recipeName().value = ""
    recipeDescription().value = ""
    recipeSubmitButton().innerText = "Add Recipe"
}

// show/hide recipe form
function showHideAddRecipeButton(e) {
    let x = document.getElementById('recipe-form');
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}