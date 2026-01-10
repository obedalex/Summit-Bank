import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Globe, Copy } from "lucide-react";

export default function Footer() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <footer className="bg-[#0B0D12] text-gray-300 py-16 px-6 md:px-16 lg:px-24 border-t border-white/10">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/10 pb-12">

        {/* LOGO + BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" className="h-14 w-14 object-cover rounded-full shadow-lg shadow-black/40" />
            <h2 className="text-xl font-semibold text-white tracking-wide">
              Summit <span className="text-[#d4af37]">Investment Bank</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering your financial journey with world-class banking, investment solutions,
            global transfers and wealth management — built on innovation & trust.
          </p>
        </div>

        {/* QUICK LINKS */}
       <div>
  <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>

  <ul className="space-y-2 text-sm">
    {[
      { label: "Open Account", action: () => (window.location.href = "/login-signup") },
      { label: "Investment Plans", action: () => (window.location.href = "/wealth") },
      { label: "Corporate Banking", action: () => (window.location.href = "/about") },
      { label: "Wealth Management", action: () => (window.location.href = "/wealth") },

      {
        label: "Contact Us",
        action: () => {
          const subject = encodeURIComponent("Inquiry – Summit Investment Global");
          const body = encodeURIComponent(
            `Dear Summit Investment Global Team,

I hope this message finds you well.

I would like to inquire about your banking and investment services, including wealth management and global financial solutions.

Kindly get back to me at your earliest convenience.

Warm regards,
[Your Name Here]
            `
          );

          window.location.href = `mailto:info@summitinvestmentglobal.com?subject=${subject}&body=${body}`;
        },
      },
    ].map(({ label, action }) => (
      <li key={label}>
        <motion.p
          whileHover={{ x: 6, color: "#d4af37" }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer"
          onClick={action}
        >
          {label}
        </motion.p>
      </li>
    ))}
  </ul>
</div>


        {/* CONTACT SECTION */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-gray-400">

            <p className="flex items-start gap-2">
              <MapPin size={18} className="text-[#d4af37]" />
              920 Broadway, 10th Floor, New York, NY 10010
            </p>

            <div className="flex items-center gap-2 group">
              <Phone size={18} className="text-[#d4af37]" />
              <span>United States: +1 832 649 1282</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard("+1 832 649 1282")}
                className="ml-2 p-1 border border-gray-600 rounded-md hover:bg-[#d4af37] hover:text-black transition"
              >
                <Copy size={16} />
              </motion.button>
            </div>

           <p className="flex items-center gap-2">
  <Mail size={18} className="text-[#d4af37]" />

  <motion.a
    whileHover={{ x: 6, color: "#d4af37" }}
    transition={{ duration: 0.2 }}
    className="text-sm cursor-pointer"
    href={`mailto:info@summitinvestmentglobal.com?subject=${encodeURIComponent(
      "Inquiry – Summit Investment Global"
    )}&body=${encodeURIComponent(
      `Dear Summit Investment Global Team,

I hope this message finds you well.

I would like to inquire about your investment and banking services, including wealth management, global transfers, and corporate financial solutions. Kindly provide more information at your earliest convenience.

Warm regards,
[Your Name Here]`
    )}`}
  >
   info@summitinvestmentglobal.com
  </motion.a>
</p>


          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 text-sm gap-4">

        {/* COPYRIGHT */}
        <p className="text-gray-500">
          © {new Date().getFullYear()} Summit Investment Bank. All rights reserved.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4">
          {[
            { Icon: Facebook, link: "https://facebook.com" },
            { Icon: Twitter, link: "https://twitter.com" },
            { Icon: Linkedin, link: "https://linkedin.com" },
            { Icon: Globe, link: "https://summitinvestmentglobal.com" },
          ].map(({ Icon, link }, idx) => (
            <motion.a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, backgroundColor: "#d4af37", color: "#000" }}
              transition={{ duration: 0.2 }}
              className="p-2 rounded-full border border-gray-700/50 text-white hover:shadow-lg cursor-pointer"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

      </div>
    </footer>
  );
}
