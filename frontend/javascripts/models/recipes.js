class Recipes {
    constructor(id, name, description, cooking_time, directions){
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooking_time = cooking_time;
        this.directions = directions;
    }


    static create(id, name, description, cooking_time, directions){
        let recipe = new Recipes(id, name, description, cooking_time, directions)
            Recipes.all.push(recipe)
            return recipe
    }
}

