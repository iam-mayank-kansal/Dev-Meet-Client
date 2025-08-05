import { navItems, socialLinks } from '@/lib/data';

export const FooterSection = () => {

  return (
    <footer className="bg-white shadow-inner ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">DevMeet</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting developers through seamless video meetings and collaboration.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start">
                contact@devmeet.com
              </li>
              <li className="flex items-start">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DevMeet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};