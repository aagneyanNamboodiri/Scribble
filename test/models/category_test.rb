# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_and_saved_without_category_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_CATEGORY_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_category_can_have_zero_articles_count
    @category.articles_count = 0
    assert @category.valid?
  end
end
