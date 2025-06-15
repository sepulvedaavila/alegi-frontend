
const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              src="/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png"
              alt="ALEGI Logo"
              className="h-10"
            />
            <p className="text-gray-600 text-sm">
              Legal outcomes, AI precision.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#how-it-works" className="text-gray-600 hover:text-alegi-blue transition-colors">How It Works</a></li>
                  <li><a href="#features" className="text-gray-600 hover:text-alegi-blue transition-colors">Features</a></li>
                  <li><a href="#solutions" className="text-gray-600 hover:text-alegi-blue transition-colors">Solutions</a></li>
                  <li><a href="#lumina" className="text-gray-600 hover:text-alegi-blue transition-colors">Lumina</a></li>
                  <li><a href="#security" className="text-gray-600 hover:text-alegi-blue transition-colors">Security</a></li>
                  <li><a href="#faq" className="text-gray-600 hover:text-alegi-blue transition-colors">FAQs</a></li>
                </ul>
              </div>
              
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy-policy" className="text-gray-600 hover:text-alegi-blue transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="text-gray-600 hover:text-alegi-blue transition-colors">Terms of Service</a></li>
                  <li><a href="/cookie-policy" className="text-gray-600 hover:text-alegi-blue transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-600 text-center">
            ALEGI 2025, all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
