# frozen_string_literal: true

require "test_helper"

class ArticleReportsWorkerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, status: :draft, assigned_category: @category, user: @user)
  end

  def test_generates_reports_pdf_for_valid_user
    assert_broadcasts(@user.id, 4) do
      ArticleReportsWorker.perform_async(@user.id)
    end

    assert_equal true, @user.report.attached?
  end

  def test_raises_error_for_invalid_user_id
    assert_raises ActiveRecord::RecordNotFound do
      ArticleReportsWorker.perform_async(@user.id + "invalid")
    end

    assert_equal false, @user.report.attached?
  end

  def test_purges_existing_report_and_creates_new_report_if_report_exists
    assert_broadcasts(@user.id, 4) do
      ArticleReportsWorker.perform_async(@user.id)
    end
    first_report_id = @user.report.id

    assert_broadcasts(@user.id, 4) do
      ArticleReportsWorker.perform_async(@user.id)
    end

    @user.reload
    second_report_id = @user.report.id

    assert_not_equal first_report_id, second_report_id
  end
end
