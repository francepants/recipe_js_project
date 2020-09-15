# Wepa Recipes
- models
    - recipes
        - name of the recipe
        - description
    - ingredients
        - ingredient name
        - measurement:string
        - cooking time:integer
        - directions:text

- recipe has many ingredients
- ingredients belong to recipe

## Ideas
- add recipes
- list ingredients to the recipes
- up vote them


## Buttons
- add recipe
- edit recipe        
- delete recipe
- same for ingredients 

## brainstorm
- what should happen
    - want to load ingredients per recipe_id
- what is the cause
    click event 

/////
loads ingredients over and over, but i need it to load certain recipes ingredients using recipe_id
