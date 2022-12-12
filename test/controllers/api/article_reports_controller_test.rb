# frozen_string_literal: true

require "test_helper"

class Api::ArticleReportsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: :published)
    @headers = headers()
    end

  def test_generates_pdf_for_user
    post api_article_reports_path, headers: headers
    assert_response :success
    assert_equal @user.report.attached?, true
  end

  def test_downloads_report
    post api_article_reports_path, headers: headers
    assert_response :success

    get download_api_article_reports_path, headers: headers
    assert_response :success
    assert_equal "application/pdf", response.content_type
  end

  def test_raises_error_if_user_has_no_report_attached
    get download_api_article_reports_path, headers: headers
    assert_response :not_found
    error = response_to_json(response)["error"]
    assert_equal t("not_found", entity: "report"), error
  end
end
