import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import LogoutBtn from './LogoutBtn';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userName = useSelector((state) => state.auth.userData?.username || "User");
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }, // Changed to true when logged in
  ];

  return (
    <header className="h-20 bg-zinc-100 border-b border-zinc-200 font-sans sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between h-20 px-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-widest text-zinc-800 uppercase hover:opacity-80 transition-opacity">
            Blogify<span className="text-zinc-400">.</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8">
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Auth Specific UI */}
            {authStatus && (
              <li className="flex items-center gap-6 ml-4 border-l border-zinc-300 pl-8">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 italic hidden lg:block">
                  Hi, {userName}
                </span>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;