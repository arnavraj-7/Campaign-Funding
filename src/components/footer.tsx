"use client";
import { Zap, Twitter, Github, Instagram , Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://x.com/ArnavRaj529053", label: "Twitter" },
    { icon: Github, href: "https://github.com/arnavraj-7/", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/excuzemearnav/", label: "Discord" },
    { icon: Mail, href: "mailto:arnavrajcodes@gmail.com", label: "Email" },
  ];

  const footerLinks = {
    Product: ["Features", "Pricing", "Documentation", "Roadmap"],
    Resources: ["Blog", "Community", "Support", "Status"],
    Company: ["About", "Careers", "Privacy", "Terms"],
    Developers: ["API", "SDK", "Tools", "Examples"],
  };

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Motto */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CrowdSpark</span>
            </div>
            <p className="text-purple-400 font-semibold mb-2">
              &quot;Igniting Innovation, One Campaign at a Time&quot;
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering creators worldwide with blockchain-powered crowdfunding. 
              Transparent, secure, and decentralized funding for the future.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-slate-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={"#"}
                      className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 CrowdSpark. Built with ❤️ on Ethereum and nextjs.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              href="https://github.com/arnavraj-7/Crowd-Spark"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-400 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">View on GitHub</span>
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;