# frozen_string_literal: true

json.extract! @organization,
  :site_name,
  :is_password

json.user @user.id
