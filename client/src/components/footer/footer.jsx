import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t py-6 text-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-300 text-sm">
        <Link
          to="/about"
          className="hover:text-white transition duration-300"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-white transition duration-300"
        >
          Contact
        </Link>
        <Link
          to="/privacy-policy"
          className="hover:text-white transition duration-300"
        >
          Privacy Policy
        </Link>
      </div>
      <p className="text-gray-500 mt-4 text-xs">
        &copy; {new Date().getFullYear()} BusinessUpdate. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

