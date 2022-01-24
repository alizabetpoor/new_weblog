import { BiHash } from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="items-center p-4 footer bg-blue-500 text-neutral-content">
      <div className="items-center grid-flow-col">
        <BiHash className="fill-current w-10 h-10" />
        <p>طراحی شده توسط علی ضابط پور</p>
      </div>
    </footer>
  );
};

export default Footer;
