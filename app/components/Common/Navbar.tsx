"use client"
import React, { useEffect, useState } from 'react'
import logo from '../../components/assets/images/logo.svg';
import logolight from '../../components/assets/images/logo-light.svg';
import avatar from '../../components/assets/images/avatar/defaultprofile.png';
import techacademy from '../../components/assets/images/tech.svg';
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from 'next/image';
import { BsThreeDots } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors';



const Navbar = () => {
  const [navshow, setnavshow] = useState(false);
  const [navcont, setnavcont] = useState(false);
  const [navcont1, setnavcont1] = useState(false);
  const [navcont2, setnavcont2] = useState(false);
  const [navcont3, setnavcont3] = useState(false);
  const [navcont4, setnavcont4] = useState(false);
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const accessToken = Cookies.get('token');
  const [imgpath, setimgpath] = useState('');
  const router = useRouter();
  const signOut = async()=>{
    try {
        const response = await axios.post(`${SERVICE_URL}logout`, {token:accessToken});
        // console.log(response); 
        Cookies.remove('token');
        router.push('/login');
      } catch (error:any) {
        console.log(error);
      }
  }

  useEffect(() => {
    try {
       axiosInstance.get(`${SERVICE_URL}getuserdata`)
      .then((response)=>{
        //   console.log(response.data.userDetails);
          setusername(response.data.userDetails.name);
          setemail(response.data.userDetails.email);
          setimgpath(response.data.userDetails.profileImg);
      })
      .catch ((error)=>{
        console.error('Error submitting form:', error);
      })
    } catch (error:any) {
      alert(error.response.data.message);
    }
  }, [])

  return (
    <header className="navbar-light navbar-sticky">
        <nav className="navbar navbar-expand-xl">


            <div className="container">

                <a className="navbar-brand" href="/dashboard">
                    <Image className="light-mode-item navbar-brand-item" src={techacademy} alt="logo"/>
                    <Image className="dark-mode-item navbar-brand-item" src={techacademy} alt="logo"/>
                </a>
                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-animation" onClick={()=>{setnavcont(!navcont)}}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

               
                {/* middle portion of the navbar */}
                <div className={`navbar-collapse w-100 ${(navcont)?'nohid':'hidcont'}`}  >

                    {/* mostly scrollup and down and its suggestions */}
                    <ul className="navbar-nav navbar-nav-scroll mx-auto">
                    
                        {/* <li className="nav-item dropdown">
                            <div className="nav-link" id="demoMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>{setnavcont1(!navcont1)}}> <div className='flex items-center w-100 justify-between'><p className='pb-0 mb-0'>Demos</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></div>
                            <ul className={`dropdown-menu ${(navcont1)?'nohid':'hidcont'}`} aria-labelledby="demoMenu">
                                <li> <a className="dropdown-item" href="index.html">Home Default</a></li>
                                <li> <a className="dropdown-item" href="index-2.html">Home Education</a></li>
                                <li> <a className="dropdown-item" href="index-3.html">Home Academy</a></li>
                                <li> <a className="dropdown-item" href="index-4.html">Home Course</a></li>
                                <li> <a className="dropdown-item" href="index-5.html">Home University</a></li>
                                <li> <a className="dropdown-item" href="index-6.html">Home Kindergarten</a></li>
                                <li> <a className="dropdown-item" href="index-7.html">Home Landing</a></li>
                                <li> <a className="dropdown-item" href="index-8.html">Home Tutor</a></li>
                                <li> <hr className="dropdown-divider"/></li>
                                <li> <a className="dropdown-item" href="request-demo.html">Request a demo</a></li>
                                <li> <a className="dropdown-item" href="book-className.html">Book a Class</a></li>
                                <li> <a className="dropdown-item" href="request-access.html">Free Access</a></li>
                                <li> <a className="dropdown-item" href="university-admission-form.html">Admission Form</a></li>
 
                                <li> <hr className="dropdown-divider"/></li>
                                <li className="dropdown-submenu dropend">
                                    <a className="dropdown-item" href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0' >Dropdown levels</p> <RiArrowDropDownLine className='  ml-0 mb-0 pb-0 text-[30px]'/></div></a>
                                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                        <li className="dropdown-submenu dropend">
                                            <a className="dropdown-item e" href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Dropdown (end)</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                            <ul className="dropdown-menu" data-bs-popper="none">
                                                <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                                <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                            </ul>
                                        </li>
                                        <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                        <li className="dropdown-submenu dropstart">
                                            <a className="dropdown-item " href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Dropdown (start)</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                            <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                                                <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                                <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                            </ul>
                                        </li>
                                        <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Pages</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                            <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                                <li className="dropdown-submenu dropend">
                                    <a className="dropdown-item" href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Course</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                        <li> <a className="dropdown-item" href="course-grid.html">Course Grid Classic</a></li>
                                        <li> <a className="dropdown-item" href="course-grid-2.html">Course Grid Minimal</a></li>
                                        <li> <hr className="dropdown-divider"/></li>
                                        <li> <a className="dropdown-item" href="course-list.html">Course List Classic</a></li>
                                        <li> <a className="dropdown-item" href="course-list-2.html">Course List Minimal</a></li>
                                        <li> <hr className="dropdown-divider"/></li>
                                        <li> <a className="dropdown-item" href="course-detail.html">Course Detail Classic</a></li>
                                        <li> <a className="dropdown-item" href="course-detail-min.html">Course Detail Minimal</a></li>
                                        <li> <a className="dropdown-item" href="course-detail-adv.html">Course Detail Advance</a></li>
                                        <li> <a className="dropdown-item" href="course-video-player.html">Course Full Screen Video</a></li>
                                    </ul>
                                </li>

                                <li className="dropdown-submenu dropend">
                                    <a className="dropdown-item" href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>About</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                        <li> <a className="dropdown-item" href="about.html">About Us</a></li>
                                        <li> <a className="dropdown-item" href="contact-us.html">Contact Us</a></li>
                                        <li> <a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
                                        <li> <a className="dropdown-item" href="blog-masonry.html">Blog Masonry</a></li>
                                        <li> <a className="dropdown-item" href="blog-detail.html">Blog Detail</a></li>
                                        <li> <a className="dropdown-item" href="pricing.html">Pricing</a></li>
                                    </ul>
                                </li>

                                <li> <a className="dropdown-item" href="instructor-list.html">Instructor List</a></li>
                                <li> <a className="dropdown-item" href="instructor-single.html">Instructor Single</a></li>
                                <li> <a className="dropdown-item" href="become-instructor.html">Become an Instructor</a></li>

                
                                <li className="dropdown-submenu dropend">
                                    <a className="dropdown-item " href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Authentication</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                        <li> <a className="dropdown-item" href="sign-in.html">Sign In</a></li>
                                        <li> <a className="dropdown-item" href="sign-up.html">Sign Up</a></li>
                                        <li> <a className="dropdown-item" href="forgot-password.html">Forgot Password</a></li>
                                    </ul>
                                </li>

                                <li> <a className="dropdown-item" href="faq.html">FAQs</a></li>
                                <li> <a className="dropdown-item" href="error-404.html">Error 404</a></li>
                                <li> <a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
                                <li> <a className="dropdown-item" href="cart.html">Cart</a></li>
                                <li> <a className="dropdown-item" href="checkout.html">Checkout</a></li>
                                <li> <a className="dropdown-item" href="empty-cart.html">Empty Cart</a></li>
                                <li> <a className="dropdown-item" href="wishlist.html">Wishlist</a></li>
                            </ul>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="accounntMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Accounts</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                            <ul className="dropdown-menu" aria-labelledby="accounntMenu">
                                <li className="dropdown-submenu dropend">
                                    <a className="dropdown-item" href="#"><div className='flex items-center w-100 justify-between'><p className='mb-0 pb-0'>Instructor</p> <RiArrowDropDownLine className='mb-0 pb-0 ml-0 text-[30px]'/></div></a>
                                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                        <li> <a className="dropdown-item" href="dashboard"><i className="bi bi-grid-fill fa-fw me-1"></i>Dashboard</a> </li>
                                        <li> <a className="dropdown-item" href="mycourse"><i className="bi bi-basket-fill fa-fw me-1"></i>Courses</a> </li>
                                        <li> <a className="dropdown-item" href="createcourse"><i className="bi bi-file-earmark-plus-fill fa-fw me-1"></i>Create Course</a> </li>
                                        <li> <a className="dropdown-item flex-row" href="earning"><FaChartLine/><p className='mb-0 pb-0 ml-[5px]'>Earnings</p></a> </li>
                                        <li> <a className="dropdown-item flex-row" href="studentslist"><FaUserGraduate/> <p className='mb-0 pb-0 ml-[5px]'>Students</p></a> </li>
                                        <li> <a className="dropdown-item" href="orderslist"><i className="bi bi-cart-check-fill fa-fw me-1"></i>Orders</a> </li>
                                    </ul>
                                </li>

                                

                                
                                <li> <a className="dropdown-item" href="#"><i className="fas fa-user-cog fa-fw me-1"></i>Admin (Coming Soon)</a> </li>
                                <li> <hr className="dropdown-divider"/></li>
                                <li> <a className="dropdown-item" href="editprofile"><i className="fas fa-fw fa-edit me-1"></i>Edit Profile</a> </li>
                                <li> <a className="dropdown-item" href="instructor-setting.html"><i className="fas fa-fw fa-cog me-1"></i>Settings</a> </li>
                                <li> <a className="dropdown-item" href="deleteaccount"><i className="fas fa-fw fa-trash-alt me-1"></i>Delete Profile</a> </li>
                            </ul>
                        </li>

                    
                        <li className="nav-item"><a className="nav-link" href="docs/alerts.html">Components</a></li>

                    
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="advanceMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               <BsThreeDots className='mt-[10px] text-[20px]'/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end min-w-auto" data-bs-popper="none">
                                <li> 
                                    <a className="dropdown-item" href="index-2.htm" target="_blank">
                                        <i className="text-warning fa-fw bi bi-life-preserver me-2"></i>Support
                                    </a> 
                                </li>
                                <li> 
                                    <a className="dropdown-item" href="docs/index.html" target="_blank">
                                        <i className="text-danger fa-fw bi bi-card-text me-2"></i>Documentation
                                    </a> 
                                </li>
                                <li> <hr className="dropdown-divider"/></li>
                                <li> 
                                    <a className="dropdown-item" href="rtl/index.htm" target="_blank">
                                        <i className="text-info fa-fw bi bi-toggle-off me-2"></i>RTL demo
                                    </a> 
                                </li>
                                <li> 
                                    <a className="dropdown-item" href="https://themes.getbootstrap.com/store/webestica/" target="_blank">
                                        <i className="text-success fa-fw bi bi-cloud-download-fill me-2"></i>Buy Eduport!
                                    </a> 
                                </li>
                            </ul>
                        </li> */}

                        <li className="nav-item"><a className='text-slate-200	mr-[30px] font-semibold	 text-base' href="/dashboard">Dashboard</a></li>
                        <li className="nav-item"><a className='text-slate-200	mr-[30px] font-semibold	 text-base' href="/mycourse">Courses</a></li>
                        <li className="nav-item"><a className='text-slate-200	mr-[30px] font-semibold	 text-base' href="/earning">Earnings</a></li>
                        <li className="nav-item"><a className='text-slate-200	mr-[30px] font-semibold	 text-base' href="/studentslist">Students</a></li>
                        <li className="nav-item"><a className='text-slate-200	mr-[30px] font-semibold	 text-base' href="/orderslist">Orders</a></li>

                    </ul>
                    
                    {/* mostly its a searchbar */}
                    <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                        <div className="nav-item w-100">
                            <form className="position-relative">
                                <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 "></i></button>
                            </form>
                        </div>
                    </div>

                </div>
            
                
            
            
            
            
            
            
            
            
            
            
            
                 {/* dropdown */}
                <div className="dropdown ms-1 ms-lg-0">
                    <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=>{setnavshow(!navshow)}}>
                        <Image className="avatar-img rounded-circle" 
                         src={(imgpath)?`${imgpath}`:avatar}
                         width={120}
                         height={120} 
                        alt="avatar"/>
                    </a>
                    <ul className={(navshow)?"dropdown-animation dropdown-menu-end shadow pt-3 navshow darknavcol":"dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3 "} aria-labelledby="profileDropdown">
                        <li className="px-3">
                            <div className="d-flex align-items-center">
                                
                                <div className="avatar me-3">
                                    <Image className="avatar-img rounded-circle shadow" 
                                     src={(imgpath)?`${imgpath}`:avatar}
                                     width={120}
                                     height={120} 
                                    alt=""/>
                                </div>
                                <div>
                                    <a className="h6" href="#">{username}</a>
                                    <p className="small m-0">{email}</p>
                                </div>
                            </div>
                            <hr/>
                        </li>
                        {/* <!-- Links --> */}
                        <li><a className="dropdown-item" href="editprofile"><i className="bi bi-person fa-fw me-2"></i>Edit Profile</a></li>
                        <li><a className="dropdown-item" href="#"><i className="bi bi-gear fa-fw me-2"></i>Account Settings</a></li>
                        <li><a className="dropdown-item" href="#"><i className="bi bi-info-circle fa-fw me-2"></i>Help</a></li>
                        <li onClick={()=>{signOut()}}><div className="dropdown-item bg-danger-soft-hover" style={{ cursor: 'pointer' }}><i className="bi bi-power fa-fw me-2"></i>Sign Out</div></li>
                        <li> <hr className="dropdown-divider"/></li>
                    
                        <li>
                            <div className="modeswitch-wrap" id="darkModeSwitch">
                                <div className="modeswitch-item">
                                    <div className="modeswitch-icon"></div>
                                </div>
                                <span>Dark mode</span>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
    </header> 
  )
}

export default Navbar