import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-100 border-t border-zinc-200 px-8 md:px-16 py-16 font-sans text-zinc-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-zinc-900 font-bold tracking-widest uppercase mb-4 block">
            Brand<span className="text-zinc-400">.</span>
          </Link>
          <p className="text-sm leading-relaxed text-zinc-400">
            Curating simplicity through intentional design and modern aesthetics.
          </p>
        </div>



        {/* Links: Contact */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900 mb-6">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="https://leetcode.com/u/Shivwhoo/" className="hover:text-zinc-900 transition-colors">Leetcode</Link></li>
            <li><Link to="https://github.com/shivwhoo" className="hover:text-zinc-900 transition-colors">Github</Link></li>
            <span>Email: shivamkishore009@gmail.com</span>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900 mb-6">Newsletter</h4>
          <form className="flex border-b border-zinc-300 pb-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none outline-none text-xs w-full placeholder:text-zinc-400 focus:ring-0"
            />
            <button type="submit" className="text-[10px] uppercase font-bold tracking-tighter hover:text-zinc-900 transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase text-zinc-400">
        <p>© 2026 Brand Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-zinc-900">Privacy</Link>
          <Link to="/terms" className="hover:text-zinc-900">Terms</Link>
          <Link to="/cookies" className="hover:text-zinc-900">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;