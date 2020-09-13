require 'test_helper'

class IngredientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ingredient = ingredients(:one)
  end

  test "should get index" do
    get ingredients_url, as: :json
    assert_response :success
  end

  test "should create ingredient" do
    assert_difference('Ingredient.count') do
      post ingredients_url, params: { ingredient: { cooking_time: @ingredient.cooking_time, directions: @ingredient.directions, ingredient_name: @ingredient.ingredient_name, measurement: @ingredient.measurement, recipe_id: @ingredient.recipe_id } }, as: :json
    end

    assert_response 201
  end

  test "should show ingredient" do
    get ingredient_url(@ingredient), as: :json
    assert_response :success
  end

  test "should update ingredient" do
    patch ingredient_url(@ingredient), params: { ingredient: { cooking_time: @ingredient.cooking_time, directions: @ingredient.directions, ingredient_name: @ingredient.ingredient_name, measurement: @ingredient.measurement, recipe_id: @ingredient.recipe_id } }, as: :json
    assert_response 200
  end

  test "should destroy ingredient" do
    assert_difference('Ingredient.count', -1) do
      delete ingredient_url(@ingredient), as: :json
    end

    assert_response 204
  end
end
