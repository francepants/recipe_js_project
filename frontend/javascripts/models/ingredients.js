class Ingredients {
    constructor(id, ingredient_name, measurement, recipe_id) {
        this.id = id;
        this.ingredient_name = ingredient_name;
        this.measurement = measurement;
        this.recipe_id = recipe_id;
    }

    static create(id, ingredient_name, measurement, recipe_id){
        let ingredient = new Ingredients(id, ingredient_name, measurement, recipe_id)
            Ingredients.all.push(ingredient)
            return ingredient
    }
}