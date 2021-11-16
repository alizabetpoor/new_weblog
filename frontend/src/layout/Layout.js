import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content-container w-full bg-main min-h-screen">
        <div className="content mt-12 w-full">{children}</div>
      </div>
    </>
  );
};

export default Layout;
