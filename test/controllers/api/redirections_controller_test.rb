# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @redirection = create(:redirection, user: @user)
    @headers = headers()
  end

  def test_listing_all_redirections
    get api_redirections_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    fetched_redirections = response_json["redirections"]
    assert_equal fetched_redirections.length, Redirection.count
  end

  def test_should_create_redirection
    post api_redirections_path, params: {
                                  redirections: {
                                    to_path: "arigatou",
                                    from_path: "thankyou"
                                  }
                                },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Redirection"), response_json["notice"]
  end

  def test_should_update_redirection
    new_to_path = "about"
    new_from_path = "associations"
    put api_redirection_path(@redirection.id), params: {
                                                 redirections: {
                                                   from_path: new_from_path,
                                                   to_path: new_to_path
                                                 }
                                               },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Redirection")
    @redirection.reload
    assert_equal @redirection.from_path, new_from_path
    assert_equal @redirection.to_path, new_to_path
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete api_redirection_path(@redirection.id), headers: headers()
    end
    response_json = response.parsed_body

    assert_response :ok
    assert_equal t("successfully_destroyed", entity: "Redirection"), response_json["notice"]
  end
end