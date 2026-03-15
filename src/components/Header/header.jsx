import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";


export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
 const handleLogout = async () => {
  try {

    const response = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      credentials: "include"
    })
  

    const result = await response.json();
    console.log(result);

    // local logout
    localStorage.removeItem("user");

    // redirect
    window.location.href = "/login";

  } catch (error) {
    console.log("Logout error:", error);

    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const vgecLogo =
    "https://res.cloudinary.com/di14davts/image/upload/v1772534350/clogo_ywg1wp.png";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contacts", path: "/contacts" },
    { name: "Achievements", path: "/achivements" },
    { name: "Opportunities", path: "/opportunities" },
    { name: "Donation", path: "/donation" },
    { name: "Giving Back", path: "/givingback" },
    { name: "Directory", path: "/alumindirectory" },
    { name: "Reunion", path: "/reunion" },
    { name: "News", path: "/newsevents" },
  ];

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="px-4 lg:px-8 py-3">

        <div className="flex items-center justify-between max-w-7xl mx-auto">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3 group">

            <img
              src={vgecLogo}
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
              alt="VGEC Logo"
            />

            <div className="flex flex-col border-l-2 border-gray-100 pl-3">
              <span className="text-blue-900 font-black text-sm md:text-base uppercase">
                VGEC Alumni
              </span>

              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                ESTD. 1994
              </span>
            </div>

          </Link>

          {/* DESKTOP NAVIGATION */}

          <ul className="hidden lg:flex items-center gap-x-6 text-sm font-semibold text-gray-700">

            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative pb-1 transition ${
                      isActive
                        ? "text-blue-700 border-b-2 border-blue-700"
                        : "hover:text-blue-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

          </ul>

          {/* RIGHT BUTTONS */}
{/* RIGHT BUTTONS */}

<div className="hidden lg:flex items-center gap-3">

{user ? (

<button
onClick={handleLogout}
className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-md transition"
>
Logout
</button>

) : (

<>
<Link
to="/login"
className="text-gray-800 hover:bg-gray-100 font-semibold rounded-lg text-sm px-4 py-2 transition"
>
Log in
</Link>

<Link
to="/register"
className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-md transition"
>
Registration
</Link>
</>

)}

</div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? (
              <X size={28} className="text-blue-700" />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}

        {isMenuOpen && (

          <div className="lg:hidden mt-4 bg-white border-t pt-4">

            <ul className="flex flex-col text-base font-semibold">

              {navLinks.map((link) => (
                <li key={link.path} className="border-b border-gray-100">

                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center px-4 py-3 text-gray-700 hover:text-blue-700"
                  >
                    {link.name}
                    <ChevronRight size={16} className="text-gray-300" />
                  </NavLink>

                </li>
              ))}

           <div className="flex flex-col gap-3 px-4 mt-6">

{user ? (

<button
onClick={()=>{
handleLogout()
setIsMenuOpen(false)
}}
className="text-center py-3 font-semibold text-white bg-red-600 rounded-lg"
>
Logout
</button>

) : (

<>
<Link
to="/login"
onClick={() => setIsMenuOpen(false)}
className="text-center py-3 font-semibold bg-gray-100 rounded-lg"
>
Log in
</Link>

<Link
to="/register"
onClick={() => setIsMenuOpen(false)}
className="text-center py-3 font-semibold text-white bg-blue-700 rounded-lg"
>
Registration
</Link>
</>

)}

</div>

            </ul>

          </div>

        )}

      </nav>
    </header>
  );
}