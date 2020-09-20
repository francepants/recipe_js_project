class API {
    // load recipes
    static loadRecipes() {
        fetch("http://localhost:3000/recipes")
        .then(resp => resp.json())
        .then(recipes => recipes.forEach(recipe => displayRecipe(recipe)))
    }

    // EDIT recipe
    

    // ingredients


}