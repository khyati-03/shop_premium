import Link from "next/link";

const ProfileSidebar = () => (
  <aside className="w-48 border-r pr-4">
    <nav className="flex flex-col gap-2">
      <Link href="/user/profile" className="hover:underline">
        Profile
      </Link>
      <Link href="/user/orders" className="hover:underline">
        Orders
      </Link>
      <Link href="/wishlist" className="hover:underline">
        Wishlist
      </Link>
    </nav>
  </aside>
);

export default ProfileSidebar;
