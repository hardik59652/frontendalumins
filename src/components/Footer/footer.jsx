import React from 'react';
import { Facebook, Linkedin, Twitter, Youtube, Globe, Mail, Phone, InstagramIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1c20] text-white pt-16 pb-8 px-6 font-sans border-t-4 border-[#1e40af]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="alumindirectory" className="hover:text-white transition">Alumni Directory</a></li>
              <li><a href="achivements" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="/opportunities" className="hover:text-white transition">Job Board</a></li>
              <li><a href="/givingback" className="hover:text-white transition">Giving Back</a></li>
              <li><a href="/contacts" className="hover:text-white transition">Contacts</a></li>
            </ul>
          </div>

          {/* Column 2: Events & Chapters */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-400 uppercase tracking-wider">Engagement</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="reunion" className="hover:text-white transition">Annual Meetup 2026</a></li>
              <li><a href="newsevents" className="hover:text-white transition">news and upcoming events</a></li>
              <li><a href="givingback" className="hover:text-white transition">Student Mentorship</a></li>
              <li><a href="#" className="hover:text-white transition">calender</a></li>
            </ul>
          </div>

          {/* Column 3: College Info */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6 text-blue-400 uppercase tracking-wider">Contact Institute</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <Globe size={18} className="text-blue-400 shrink-0" />
                <span>VGEC Campus, Chandkheda, Ahmedabad - 382424</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <span>+91 79 23293866</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <span>alumni@vgecg.ac.in</span>
              </li>
            </ul>
          </div> */}

          {/* Column 4: GTU Affiliation */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-6 text-blue-400 uppercase tracking-wider">Affiliation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Affiliated with Gujarat Technological University (GTU) and Approved by AICTE.
            </p>
            <div className="mt-4 bg-white/10 p-2 rounded border border-white/20">
              <span className="text-xs font-mono tracking-tighter">ESTD: 1994</span>
            </div>
          </div>
        </div>

        {/* Middle Section: VGEC Branding */}
        <div className="border-t border-gray-700 pt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Placeholder for VGEC Logo */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
               <span className="text-blue-900 font-bold text-xs text-center">VGEC LOGO</span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">VISHWAKARMA GOVERNMENT</h2>
              <h2 className="text-xl font-bold tracking-tight">ENGINEERING COLLEGE</h2>
              <p className="text-blue-400 text-sm font-medium tracking-widest">ALUMNI ASSOCIATION</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold uppercase hidden lg:block">Follow Our Journey</span>
            <div className="flex gap-3"> <a href='https://www.facebook.com/VGEC.Official/'>
                

              <Facebook size={36} className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full cursor-pointer transition" />
             
              </a>
              <a href="https://www.linkedin.com/school/vishwakarma-government-engineering-college-chandkheda-gandhinagar-017/">
              <Linkedin size={36} className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full cursor-pointer transition" />
              </a>
              <a href='https://x.com/OfficialVgec/'>
              <Twitter size={36} className="p-2 bg-blue-400 hover:bg-blue-300 rounded-full cursor-pointer transition" />
              </a>
              <a href="https://www.youtube.com/channel/UCtQ2bmEH9yb1rereIRge5YQ">
              <Youtube size={36} className="p-2 bg-red-600 hover:bg-red-500 rounded-full cursor-pointer transition" />
              </a>
              <a href="https://www.instagram.com/vgec.official/">
              <InstagramIcon size={36} className="p-2 bg-red-600 hover:bg-red-500 rounded-full cursor-pointer transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-500 border-t border-gray-800/50 pt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            <span>© 2026 VGEC Alumni. All Rights Reserved.</span>
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Use</a>
            <a href="#" className="hover:text-blue-400">Sitemap</a>
          </div>
          <div className="italic text-gray-600">
            "Work is Worship"
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;