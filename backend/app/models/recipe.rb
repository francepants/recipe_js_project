class Recipe < ApplicationRecord
    has_many :ingredients

    validates :name, presence: true
    validates :description, presence: true


end
