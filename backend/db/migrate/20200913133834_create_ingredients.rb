class CreateIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :ingredients do |t|
      t.string :ingredient_name
      t.integer :measurement
      t.integer :cooking_time
      t.text :directions
      t.belongs_to :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
