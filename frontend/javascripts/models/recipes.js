class Recipes {
    static all = []

    constructor(id, name, description, cooking_time, directions, ingredients){
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooking_time = cooking_time;
        this.directions = directions;
        this.ingredients = ingredients.map(ingredients => Ingredients.create(ingredients.id, ingredients.ingredient_name, ingredients.measurement, ingredients.recipe_id))
        Recipes.all.push(this)
    }


    static create(id, name, description, cooking_time, directions){
        let recipe = new Recipes(id, name, description, cooking_time, directions)
            Recipes.all.push(recipe)
            return recipe
    }
}

