const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
   <footer className="w-full bg-white mb-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {currentYear}{" "}
          <a 
            href="https://edgecaseexchange.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 hover:underline transition-colors font-medium text-blue-700"
          >
            edgecaseexchange.com
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;