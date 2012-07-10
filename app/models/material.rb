class Material < ActiveRecord::Base
  attr_accessible :name, :number, :supplier

  scope :likes

  def self.likes args
  end
end
