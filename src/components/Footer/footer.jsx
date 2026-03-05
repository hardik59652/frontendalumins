import React from 'react';
import { Facebook, Linkedin, Twitter, Youtube, Globe, Mail, Phone, InstagramIcon } from 'lucide-react';

const Footer = () => {
  const vgecLogo = "https://res.cloudinary.com/di14davts/image/upload/v1772534350/clogo_ywg1wp.png";

  return (
    <footer className="bg-[#1a1c20] text-white pt-12 md:pt-16 pb-8 px-4 md:px-6 font-sans border-t-4 border-[#1e40af]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          
          {/* Column 1: Quick Links (Contact Included Here) */}
          <div className="col-span-1">
            <h3 className="text-sm md:text-lg font-bold mb-4 md:mb-6 text-blue-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-base">
              <li><a href="/alumindirectory" className="hover:text-white transition">Alumni Directory</a></li>
              <li><a href="/achivements" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="/opportunities" className="hover:text-white transition">Job Board</a></li>
              <li><a href="/givingback" className="hover:text-white transition">Giving Back</a></li>
              {/* Aapka routed contact link yahan hai */}
              <li><a href="/contacts" className="hover:text-white transition font-bold text-white-300">Contacts</a></li>
            </ul>
          </div>

          {/* Column 2: Engagement */}
          <div className="col-span-1">
            <h3 className="text-sm md:text-lg font-bold mb-4 md:mb-6 text-blue-400 uppercase tracking-wider">Engagement</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-base">
              <li><a href="/reunion" className="hover:text-white transition">Annual Meetup</a></li>
              <li><a href="/newsevents" className="hover:text-white transition">News & Events</a></li>
              <li><a href="/givingback" className="hover:text-white transition">Mentorship</a></li>
              <li><a href="#" className="hover:text-white transition">Calendar</a></li>
            </ul>
          </div>

          {/* Column 3: Affiliation (Full Width on Mobile) */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <h3 className="text-sm md:text-lg font-bold mb-4 md:mb-6 text-blue-400 uppercase tracking-wider">Affiliation</h3>
            <p className="text-gray-400 text-[11px] md:text-sm leading-relaxed">
              VGEC Chandkheda is affiliated with Gujarat Technological University (GTU) and Approved by AICTE.
            </p>
            <div className="mt-4 bg-white/10 p-2 px-4 rounded border border-white/20">
              <span className="text-[10px] md:text-xs font-mono tracking-tighter uppercase font-bold text-blue-200">ESTD: 1994</span>
            </div>
          </div>
        </div>

        {/* Middle Section: VGEC Branding */}
        <div className="border-t border-gray-700 pt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-xl shadow-blue-900/10">
               <img src={vgecLogo} alt="VGEC Logo" className="w-full h-auto object-contain" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-tight leading-tight uppercase">Vishwakarma Government</h2>
              <h2 className="text-lg md:text-xl font-black tracking-tight leading-tight uppercase">Engineering College</h2>
              <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Alumni Association</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-[10px] font-black uppercase hidden lg:block tracking-widest text-gray-500">Follow Our Journey</span>
            <div className="flex gap-4"> 
              <a href='https://www.facebook.com/VGEC.Official/' target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Facebook size={32} className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg" />
              </a>
              <a href="https://www.linkedin.com/school/vishwakarma-government-engineering-college-chandkheda-gandhinagar-017/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Linkedin size={32} className="p-1.5 bg-blue-700 hover:bg-blue-600 rounded-full shadow-lg" />
              </a>
              <a href='https://x.com/OfficialVgec/' target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Twitter size={32} className="p-1.5 bg-sky-500 hover:bg-sky-400 rounded-full shadow-lg" />
              </a>
              <a href="https://www.youtube.com/channel/UCtQ2bmEH9yb1rereIRge5YQ" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Youtube size={32} className="p-1.5 bg-red-600 hover:bg-red-500 rounded-full shadow-lg" />
              </a>
              <a href="https://www.instagram.com/vgec.official/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <InstagramIcon size={32} className="p-1.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-full shadow-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] font-bold text-gray-500 border-t border-gray-800/50 pt-8 uppercase tracking-widest gap-4">
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
            <span>© 2026 VGEC Alumni.</span>
            <a href="#" className="hover:text-blue-400 transition">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms</a>
            <a href="#" className="hover:text-blue-400 transition">Sitemap</a>
          </div>
          <div className="italic text-gray-600 text-xs md:text-sm font-medium border-l-2 border-blue-900/30 pl-4">
            "Work is Worship"
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;