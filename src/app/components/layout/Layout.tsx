import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    <Footer />
  </>
);

export default Layout;
