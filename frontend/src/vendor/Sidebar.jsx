
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Available Orders", path: "/vendor/orders" },
  { name: "Ongoing Orders", path: "/vendor/ongoing" },
  { name: "Previous Orders", path: "/vendor/previous" },
  { name: "Revenue", path: "/vendor/revenue" },
  { name: "Profile", path: "/vendor/profile" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-56 bg-gray-800 flex flex-col items-center py-8 min-h-screen">
      <div className="text-2xl font-bold mb-10 tracking-wider">FIX MATE</div>
      <nav className="w-full">
        <ul className="flex flex-col gap-2 w-full">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`block px-8 py-3 rounded-lg transition-colors duration-150 w-full text-left ${location.pathname === link.path ? 'bg-gray-900 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
