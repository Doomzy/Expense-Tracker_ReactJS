import { UserProfile } from "@clerk/clerk-react";

function ProfilePage() {
  return (
    <div className="m-auto w-fit mt-5">
      <UserProfile
        appearance={{
          variables: {
            colorText: "#063348",
            colorPrimary: "#e8a673",
            fontWeight: { medium: 600, normal: 500 },
            borderRadius: "3px",
          },
        }}
      />
    </div>
  );
}

export default ProfilePage;
