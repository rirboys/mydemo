class CreateMaterials < ActiveRecord::Migration
  def change
    create_table :materials do |t|
      t.string :name
      t.string :number
      t.string :supplier

      t.timestamps
    end
  end
end
