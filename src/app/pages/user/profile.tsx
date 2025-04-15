import ProfileSidebar from "@/app/components/user/ProfileSidebar";
import { useAuth } from "@/app/contexts/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex gap-8">
      <ProfileSidebar />
      <section className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
        {user ? (
          <div>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>UID:</strong> {user.uid}
            </p>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
      </section>
    </div>
  );
}
