# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { published: "published", draft: "draft" }
  MAX_TITLE_LENGTH = 200
  MAX_BODY_LENGTH = 5000
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :body, presence: true, length: { maximum: MAX_BODY_LENGTH }
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  belongs_to :assigned_category, class_name: "Category", counter_cache: true
  belongs_to :user

  def self.switch_article_category (from_category, to_category)
    articles_with_from_category = Article.where(assigned_category_id: from_category)
    articles_with_from_category.each do |article|
      article.assigned_category_id = to_category
      article.save!
    end
  end

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
        errors.add(:slug, t("task.slug.immutable"))
      end
    end
end
