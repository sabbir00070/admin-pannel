import { ShieldCheck, LifeBuoy, Globe, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-800">
              Zerox Admin Panel
            </span>
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            Made with <Heart className="w-3 h-3 text-red-500" /> for admins
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <Globe className="w-4 h-4" />
          <span>Secure • Fast • Reliable</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-sm">
          <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-500 text-xs">
            v1.0.0
          </span>

          <a
            href="#"
            className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition"
          >
            <LifeBuoy className="w-4 h-4" />
            Support
          </a>

          <a
            href="#"
            className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;