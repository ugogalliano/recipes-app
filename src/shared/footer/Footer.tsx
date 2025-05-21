import { githubUrl, linkedinUrl } from "@/config/costants";

const Footer = () => {
  return (
    <div className="bg-black border-t-2 container py-6 text-white mx-auto text-center">
      <h1 className="text-sm">Created by Ugo Galliano &copy; 2024</h1>
      <div className="mt-2">
        <a
          href={linkedinUrl}
          target="_blank"
          className=" hover:text-gray-300 mx-2"
        >
          LinkedIn
        </a>
        <a
          href={githubUrl}
          target="_blank"
          className=" hover:text-gray-300 mx-2"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
