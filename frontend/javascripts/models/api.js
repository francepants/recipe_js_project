class API {
    // load recipes
    static loadRecipes() {
        fetch("http://localhost:3000/recipes")
        .then(resp => resp.json())
        .then(recipes => recipes.forEach(recipe => displayRecipe(recipe)))
    }
    
    // load ingredients
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