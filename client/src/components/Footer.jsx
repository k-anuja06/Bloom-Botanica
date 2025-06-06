import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t py-4 bg-gray-100">
      <div className="container mx-auto text-center flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        <p>© All Rights Reserved 2025.</p>
        <p>Developed with 💚 by <span className="font-bold">Anuj Jha</span></p>

        <div className="flex gap-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/itsjhaanuj21/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-100 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/its-jhaanuj-21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-100 transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
