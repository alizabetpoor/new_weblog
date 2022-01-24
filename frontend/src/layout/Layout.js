import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content-container w-full bg-main min-h-screen">
        <div className="content mt-12 w-full pb-8">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
