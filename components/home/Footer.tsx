import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Youtube, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 px-4 md:px-8 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-32 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/solveX.svg" 
                  fill
                  className="object-contain" 
                  alt="SolveX" 
                />
              </div>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs antialiased">
              The premier destination for engineers to master algorithmic challenges and excel in technical interviews. Precision-engineered for growth.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500 transition-colors">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500 transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4">
              {["All Problems", "Learning Paths", "Leaderboard", "Real-time Metrics", "Cloud Compiler"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Community</h4>
            <ul className="space-y-4">
              {["Discord Server", "Success Stories", "Engineering Blog", "Partnerships", "Referral Program"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm antialiased">
              Get the latest technical interview tips directly in your inbox.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="engineering@firm.com" 
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 dark:text-gray-400 text-xs antialiased">
            © {new Date().getFullYear()} SolveX Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-8 text-xs text-gray-500 dark:text-gray-400 antialiased">
            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
