class IngredientsController < ApplicationController
  before_action :set_ingredient, only: [:show, :update, :destroy]

  # GET /ingredients
  def index
    @ingredients = Ingredient.all
    render json: @ingredients
    # @ingredients = Ingredient.where("recipe_id = ?", params[:recipe_id])
    # #@ingredients = Ingredient.find_by(recipe_id: params[:recipe_id]).limit(255)
    #   #@Ingredients = Ingredient.find_by(params[:recipe_id])
    #   #@ingredients = Ingredient.all
    # if @ingredients.empty?
    #   @ingredients = Ingredient.all
    # end
  end

  # GET /ingredients/1
  def show
    render json: @ingredient
  end

  # POST /ingredients
  def create
    @ingredient = Ingredient.new(ingredient_params)

    if @ingredient.save
      render json: @ingredient, status: :created, location: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ingredients/1
  def update
    if @ingredient.update(ingredient_params)
      render json: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ingredients/1
  def destroy
    @ingredient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def ingredient_params
      params.require(:ingredient).permit(:ingredient_name, :measurement, :cooking_time, :directions, :recipe_id)
    end
end
