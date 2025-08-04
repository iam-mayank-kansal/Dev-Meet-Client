import { Home, Video, Users, User, LogIn, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const navItems = [
    { name: "Home", path: "/", },
    { name: "Join Meeting", path: "/join" },
    { name: "Host Meeting", path: "/host", },
    { name: "Community", path: "/community", },
    { name: "Profile", path: "/profile" },
  ];

  const socialLinks = [
    { name: "Email", url: "mailto:contact@devmeet.com", icon: <Mail className="w-5 h-5" /> },
    { name: "GitHub", url: "https://github.com/devmeet", icon: <Github className="w-5 h-5" /> },
    { name: "Twitter", url: "https://twitter.com/devmeet", icon: <Twitter className="w-5 h-5" /> },
    { name: "LinkedIn", url: "https://linkedin.com/company/devmeet", icon: <Linkedin className="w-5 h-5" /> },
  ];

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
                <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                contact@devmeet.com
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
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