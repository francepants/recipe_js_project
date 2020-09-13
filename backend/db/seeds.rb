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