# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
    @category = build(:category, user: @user)
    @article = build(:article, assigned_category: @category, user: @user)
    @redirection = build(:redirection, from_path: "something", to_path: "another", user: @user)
  end

  def test_user_name_should_exist
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages[0], "Name can't be blank"
  end

  def test_user_name_should_be_having_valid_length
    @user.name = "a" * (User::MAX_USERNAME_LENGTH + 1)
    assert_not @user.valid?
    assert_includes @user.errors.full_messages[0], "Name is too long (maximum is 25 characters)"
  end

  def test_shouldnt_delete_user_if_he_has_article
    @user.save!
    @article.save!
    assert_raises ActiveRecord::InvalidForeignKey do
      @user.delete
    end
  end

  def test_shouldnt_delete_user_if_he_has_associated_category
    @user.save!
    @category.save!
    assert_raises ActiveRecord::InvalidForeignKey do
      @user.delete
    end
  end

  def test_shouldnt_delete_user_if_he_has_associated_redirection
    @user.save!
    @redirection.save!
    assert_raises ActiveRecord::InvalidForeignKey do
      @user.delete
    end
  end
end
