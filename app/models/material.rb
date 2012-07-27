class Material < ActiveRecord::Base
  attr_accessible :name, :number, :supplier

  scope :today,       lambda { where(:created_at => Time.now.midnight...(Time.now.midnight + 1.day)) }
  scope :yesterday,   lambda { where(:created_at => (Time.now.beginning_of_day - 1.day)..Time.now.end_of_day) }
  scope :this_week,   lambda { where(:created_at => Time.now.beginning_of_week..Time.now.end_of_week) }
  scope :this_month,  lambda { where(:created_at => Time.now.beginning_of_month..Time.now.end_of_month) }
  scope :link
  scope :any

  #default_scope :order => 'created_at DESC'
  validates_uniqueness_of :number, :case_sensitive => false, :allow_nil => false, :allow_blank => false

  def self.any arg
    unless arg.blank?
      return where((Material.column_names - ["created_at", "updated_at", "id"]).collect { |c| c + " like '%#{arg}%'" }.join(' or '))
    end
    self
  end

  def self.link type
    unless type.blank?
      case type
      when "today"      then return today
      when "yesterday"  then return yesterday
      when "this_week"  then return this_week
      when "this_month" then return this_month
      end
    end
    self
  end

end
