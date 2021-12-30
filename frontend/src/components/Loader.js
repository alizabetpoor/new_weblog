import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    rtl
    speed={1.5}
    width={700}
    height={260}
    viewBox="0 0 600 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="70" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="70" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="20" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="20" y="76" rx="3" ry="3" width="380" height="6" />
    <rect x="20" y="95" rx="3" ry="3" width="178" height="6" />
    <circle cx="40" cy="20" r="20" />
    <rect x="20" y="120" rx="3" ry="3" width="500" height="123" />
  </ContentLoader>
);

export default Loader;
