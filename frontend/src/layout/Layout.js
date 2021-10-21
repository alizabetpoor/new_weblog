import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content mt-12 w-8/12">{children}</div>
    </>
  );
};

export default Layout;
