import React from 'react';
import Logo2 from '../../components/assets/images/logo-light.svg';
import techacademy from '../../components/assets/images/techchefz.jpg';
import tech from '../../components/assets/images/tech.svg'
import Image from 'next/image';
import { FaFacebookSquare,FaInstagram,FaTwitter,FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
   
        <footer className="bg-dark p-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        
                        <a href="index.html" className='footer-logo'> 
                            <Image className="h-20px" src={tech} alt="logo"/> 
                        </a>
                    </div>
                    
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="text-center text-white text-[14px]">
                            Copyrights ©2021 <a href="#" className="text-reset btn-link">TechChefz Academy</a>. All rights reserved.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-inline mb-0 text-center text-md-end">
                            <li className="list-inline-item ms-2 text-white"><a href="#" className='text-white'><FaFacebookSquare/></a></li>
                            <li className="list-inline-item ms-2 text-white"><a href="#" className='text-white'><FaInstagram/></a></li>
                            <li className="list-inline-item ms-2 text-white"><a href="#" className='text-white'><FaLinkedinIn/></a></li>
                            <li className="list-inline-item ms-2 text-white"><a href="#" className='text-white'><FaTwitter/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
   
  )
}

export default Footer