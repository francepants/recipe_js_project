class Recipe < ApplicationRecord
    has_many :ingredients, dependent: :destroy
end
