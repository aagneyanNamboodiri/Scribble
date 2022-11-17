# frozen_string_literal: true

require "test_helper"

class DeleteCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_should_delete_category_if_it_has_no_articles_under_it
    @category_2.save!
    delete api_category_path(@category_2.id), headers: headers

    assert_response :success
    assert_equal t("successfully_destroyed", entity: "Category"), response_to_json(response)["notice"]
  end

  def test_should_switch_article_category_to_new_category_when_deleting
    @article.save!
    delete api_category_path(@category.id),
      params: {
        new_category: @category_2.id
      },
      headers: headers

    assert_response :success
    @article.reload
    assert_equal @category_2.id, @article.assigned_category_id
  end

  def test_should_create_general_category_when_deleting_last_category
    delete api_category_path(@category_2.id), headers: headers
    assert_response :success

    @article.save!
    delete api_category_path(@category.id), headers: headers

    assert_response :success
    assert_equal 1, Category.all.count
    assert_equal "General", Category.first.name
  end

  def test_from_category_and_to_category_cannot_be_same
    @article.save!
    assert_raises Exception do
      delete api_category_path(@category.id),
        params: {
          new_category: @category.id
        },
        headers: headers
    end
  end

  def test_from_category_has_to_be_a_valid_category
    delete api_category_path(@category.id + "test"),
      params: {
        new_category: @category.id
      },
      headers: headers

    assert_includes response_to_json(response)["error"], "Couldn't find Category with 'id'="
  end

  def test_to_category_has_to_be_a_valid_category
    @article.save!
    delete api_category_path(@category.id),
      params: {
        new_category: "test"
      },
      headers: headers

    assert_equal "Assigned category must exist", response_to_json(response)["error"]
  end

  def test_shouldnt_delete_if_general_category_is_only_existing_category
    @category_2.destroy!
    @category.update!(name: "General")
    assert_raises Exception do
      delete api_category_path(@category.id), headers: headers
    end
  end
end
