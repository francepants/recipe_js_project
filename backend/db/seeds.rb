# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

recipes = Recipe.create([
    { name: 'Sofrito', description: 'Sofrito is the base for most Puerto Rican dishes, and this one is better than store bought (difficult to find in the stores in the Western United States). This can be added to beans, rice, soups, stews, you name it.'}, 
    { name: 'Arroz con Gandules', description: "There’s nothing more quintessentially Puerto Rican than arroz con gandules.  It’s part of our national dish (along with Pernil).  For holidays, birthdays, baby showers, and more, if there’s a party, this dish will be there.  Everyone has a little twist on how they prepare this dish, but here’s my version."}
    ])

# sofrito
ingredients = Ingredient.create([
    {ingredient_name: "2 medium Spanish onions, cut into large chunks", measurement: "about 2 cups", recipe_id: 1},
    {ingredient_name: "4 cubanelle peppers, stemmed, seeded, and cut into large chunks", measurement: "2 cups", recipe_id: 1},
    {ingredient_name: "Medium cloves garlic, peeled", measurement: "18 halves", recipe_id: 1},
    {ingredient_name: "1 large bunch cilantro, washed and roughly chopped", measurement: "about 1 1/2 cups", recipe_id: 1},
    {ingredient_name: "Culantro" , measurement: "4 leaves", recipe_id: 1},
    {ingredient_name: "4 ripe plum tomatoes, cored and cut into chunks " , measurement: "about 1 1/2 cups", recipe_id: 1},
    {ingredient_name: "1 large red bell pepper, cored, seeded, and roughly chopped", measurement: "about 1 1/2 cups", recipe_id: 1},
    {ingredient_name: "Kosher salt", measurement: "to taste", recipe_id: 1}
])

# arroz con gandules
ingredients = Ingredient.create([
    {ingredient_name: "Medium grain rice", measurement: "3 cups", recipe_id: 2},
    {ingredient_name: "Water", measurement: "3 cups", recipe_id: 2},
    {ingredient_name: "Gandules(green pigeon peas)", measurement: "1 can", recipe_id: 2},
    {ingredient_name: "Cured salted pork", measurement: "1/2 cup", recipe_id: 2},
    {ingredient_name: "Vegetable oil", measurement: "1/3 cup", recipe_id: 2},
    {ingredient_name: "Sofrito", measurement: "1/2 cup", recipe_id: 2},
    {ingredient_name: "Tomato sauce", measurement: "6 oz", recipe_id: 2},
    {ingredient_name: "Sazon culantro y achiote", measurement: "1 packet", recipe_id: 2},
    {ingredient_name: "Whole spanish olives", measurement: "10 count", recipe_id: 2},
    {ingredient_name: "Cumin", measurement: "1 tsp", recipe_id: 2},
    {ingredient_name: "Salt", measurement: "To taste", recipe_id: 2}
])