class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :description
      t.integer :cooking_time
      t.text :directions
      t.timestamps
    end
  end
end
