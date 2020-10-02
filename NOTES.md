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
- relationship
    - recipe has many ingredients
    - ingredients belong to recipe

## Ideas
- add recipes
    - show/hide
    - add new
- edit/update 
    - need to fix this button to change to the correct text
    - when edit button is clicked - go to edit section
- delete
- list ingredients to the recipes
- up vote them


## Buttons
recipe
[x] add recipe 
[x] edit recipe       
[x] delete recipe
ingredients
[] add ingredients
[] edit ingredients 
[] delete ingredients

## brainstorm
- what should happen
    - want to load ingredients per recipe_id
- what is the cause
    click event 

/////
loads ingredients over and over, but i need it to load certain recipes ingredients using recipe_id


//////////
inside display recipe
    // deleteRecipeButton.setAttribute("data-id", recipe.id)


////////// delete recipe
    // fetch(`${RECIPES_URL}/${id}`, {
    //     method: "DELETE"
    // })
    // .then(resp => resp.json())
    // .then(object => document.getElementById(object.id))
    // this.location.reload();


////////// search bar

//filter recipes.all
// no submit btn
// function searchRecipes() {
//     const searchedWord = Recipes.all.filter(word => )
// }
let searchField = document.createElement('input')
searchField.setAttribute('type',"text")
main.appendChild(searchField)
// searchField.innerText = ''
searchField.addEventListener('keydown', function(e){
    // debugger
    // if 3 letters = recipe names 3 letters 
    console.log(e.target.value)
    let searchedWords = Recipes.all.filter(letter => {return letter.startsWith(e.target.value)})
    console.log(searchedWords)
})