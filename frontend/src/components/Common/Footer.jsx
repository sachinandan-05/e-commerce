import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer className="border-t py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
                 <div>
                    <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
                    <p className="text-gray-500 mb-4">
                        Get the latest updates and offers.
                    </p>
                    <p className="font-mediun text-sm text-gray-600 mb-6">
                        Sign up and get 15% off your first order.
                    </p>
                    <form className="flex">
                       <input type="email" placeholder="Enter your email" className="p-3 w-full text-sm border-t border-l border-b border-gray-00 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all" required/>
                       <button type="submit" className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all">Subscribe</button> 
                    </form>
                 </div>
            
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-600 ">
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Men's top wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Women's top wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Men's bottom wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Women's top wear</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <ul className="space-y-2 text-gray-600 ">
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">About Us</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">FAQs</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Features</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
                <div className="flex items-center space-x-4 mb-6">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <TbBrandMeta className="h-5 w-5"/>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <IoLogoInstagram className="h-5 w-5"/>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <RiTwitterXLine className="h-5 w-5"/>
                    </a>
                </div>
                <p className="text-gray-500">Call Us</p>
                <p>
                    <FiPhoneCall className="inline-block mr-2"/>
                    +91 12345 67890
                </p>
            </div>
            </div>


            <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="flex space-x-4">
                   <a href="https://github.com/sachinandan-05" target="_blank" rel="noreferrer">
                       <GitHubIcon />
                   </a>
                   <a href="https://www.linkedin.com/in/sachinandan-yadav-660115243/" target="_blank" rel="noreferrer">
                       <LinkedInIcon />
                   </a>
                </div>
            <p className="text-gray-500 text-sm tracking-tighter">
                Made by Sachinandan with ❤️
            </p>
        </div>
        </footer>
    )
}

export default Footer;