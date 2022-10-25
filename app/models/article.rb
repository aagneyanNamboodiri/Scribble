# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { published: "published", draft: "draft" }
  MAX_TITLE_LENGTH = 200
  MAX_BODY_LENGTH = 5000
  VALID_TITLE_REGEX = /[a-zA-Z0-9]+/
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: VALID_TITLE_REGEX
  validates :body, presence: true, length: { maximum: MAX_BODY_LENGTH }
  validates :slug, uniqueness: false
  validate :slug_not_changed

  before_save :set_slug
  belongs_to :assigned_category, class_name: "Category", counter_cache: true
  belongs_to :user

  private

    def set_slug
      if slug.nil? && status == "published"
        itr = 1
        loop do
          title_slug = title.parameterize
          slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
          break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

          itr += 1
        end
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("task.slug.immutable"))
      end
    end
end
