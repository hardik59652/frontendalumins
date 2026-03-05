import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    // Cloudinary Logo URL jo aapne diya tha
    const vgecLogo = "https://res.cloudinary.com/di14davts/image/upload/v1772534350/clogo_ywg1wp.png";

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                    
                    {/* --- LOGO SECTION --- */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={vgecLogo}
                            className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
                            alt="VGEC Logo"
                        />
                        <div className="flex flex-col border-l-2 border-gray-100 pl-3">
                            <span className="text-blue-900 font-black text-sm md:text-base leading-none uppercase tracking-tighter">
                                VGEC Alumni
                            </span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                ESTD. 1994
                            </span>
                        </div>
                    </Link>

                    {/* --- ACTION BUTTONS (Login/Register) --- */}
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-xl text-xs px-4 lg:px-5 py-2 lg:py-2.5 mr-2 transition-all"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-xs px-4 lg:px-5 py-2 lg:py-2.5 mr-2 shadow-lg hover:shadow-blue-200 transition-all uppercase tracking-tight"
                        >
                            Registration
                        </Link>
                    </div>

                    {/* --- NAVIGATION LINKS --- */}
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-bold text-xs uppercase tracking-tight lg:flex-row lg:space-x-6 lg:mt-0">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About", path: "/about" },
                                { name: "Opportunities", path: "/opportunities" },
                                { name: "Giving Back", path: "/givingback" },
                                { name: "Directory", path: "/alumindirectory" },
                                { name: "Reunion", path: "/reunion" },
                                { name: "News", path: "/newsevents" }
                            ].map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"} hover:text-blue-700 lg:p-0 transition-colors`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </header>
    );
}