# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 200
  MAX_BODY_LENGTH = 5000
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :title, presence: true, length: { maximum: MAX_BODY_LENGTH }
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  belongs_to :assigned_category, class_name: "Category"

  private

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end
end
