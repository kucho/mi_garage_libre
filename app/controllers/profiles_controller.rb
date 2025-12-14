# frozen_string_literal: true

class ProfilesController < InertiaController
  def edit
    render(inertia: { profile: ProfileSerializer.new(Current.profile) })
  end

  def update
    if Current.profile.update(profile_params)
      redirect_to(edit_profile_url, notice: "Profile updated successfully")
    else
      redirect_to(edit_profile_url, inertia: { errors: Current.profile.errors })
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:first_name, :last_name, :handle)
  end
end
