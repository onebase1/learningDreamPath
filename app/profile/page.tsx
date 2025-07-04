// File: app/profile/page.tsx

import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* The UserProfile component automatically handles displaying user data */}
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
