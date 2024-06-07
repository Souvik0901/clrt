import React, { useState } from 'react';
import Image from 'next/image';
import Course1 from '../../components/assets/images/courses/4by3/08.jpg';
import Course2 from '../../components/assets/images/courses/4by3/10.jpg';
import Course3 from '../../components/assets/images/courses/4by3/06.jpg';
import Course5 from '../../components/assets/images/courses/4by3/04.jpg';
import Course8 from '../../components/assets/images/courses/4by3/11.jpg';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";




const StudentcourseBody = () => {


  return (
    <div className='studentcoursebody'>
       

       <section className="pt-0">


            <div className="container">
              <div className="row">

                    {/* this is the sidebar */}
                    <div className="col-xl-3">
                    
                      <nav className="navbar navbar-light navbar-expand-xl mx-0">
                        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        
                          <div className="offcanvas-header bg-light">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                        
                          <div className="offcanvas-body p-3 p-xl-0">
                            <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                            
                              <div className="list-group list-group-dark list-group-borderless">
                                <a className="list-group-item" href="student-dashboard.html"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                <a className="list-group-item" href="student-subscription.html"><i className="bi bi-card-checklist fa-fw me-2"></i>My Subscriptions</a>
                                <a className="list-group-item active" href="student-course-list.html"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                <a className="list-group-item" href="student-payment-info.html"><i className="bi bi-credit-card-2-front fa-fw me-2"></i>Payment info</a>
                                <a className="list-group-item" href="student-bookmark.html"><i className="bi bi-cart-check fa-fw me-2"></i>Wishlist</a>
                                <a className="list-group-item" href="instructor-edit-profile.html"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                <a className="list-group-item" href="instructor-setting.html"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
                                <a className="list-group-item" href="instructor-delete-account.html"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                <a className="list-group-item text-danger bg-danger-soft-hover" href="#"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </nav>
                      
                    </div>
              

                    {/* this is the sidebar o 9xl */}
                    <div className="col-xl-9">

                      <div className="card border rounded-3">
                      
                        <div className="card-header border-bottom">
                          <h3 className="mb-0">My Courses List</h3>
                        </div>
                        

                      
                      
                        <div className="card-body">

                        
                          <div className="row g-3 align-items-center justify-content-between mb-4">
                          
                            <div className="col-md-8">
                              <form className="rounded position-relative">
                                <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 "></i></button>
                              </form>
                            </div>

                          
                            <div className="col-md-3">
                              
                              <form>
                                <select className="form-select js-choice border-0 z-index-9 bg-transparent" aria-label=".form-select-sm">
                                  <option value="">Sort by</option>
                                  <option>Free</option>
                                  <option>Newest</option>
                                  <option>Most popular</option>
                                  <option>Most Viewed</option>
                                </select>
                              </form>
                            </div>
                          </div>
                      

                        
                          <div className="table-responsive border-0">
                            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                            
                              <thead>
                                <tr>
                                  <th scope="col" className="border-0 rounded-start">Course Title</th>
                                  <th scope="col" className="border-0">Total Lectures</th>
                                  <th scope="col" className="border-0">Completed Lecture</th>
                                  <th scope="col" className="border-0 rounded-end">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                              
                                <tr>
                                
                                  <td>
                                    <div className="d-flex align-items-center">
                                      
                                      <div className="w-100px">
                                        <Image src={Course8} className="rounded" alt=""/>
                                      </div>
                                      <div className="mb-0 ms-2">
                                        
                                        <h6><a href="#">Building Scalable APIs with GraphQL</a></h6>
                                        
                                        <div className="overflow-hidden">
                                          <h6 className="mb-0 text-end">85%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10">
                                            {/* <div 
                                                className="progress-bar bg-primary aos" 
                                                role="progressbar" 
                                                data-aos="slide-right" 
                                                data-aos-delay="200" 
                                                data-aos-duration="1000" 
                                                data-aos-easing="ease-in-out"  
                                                style="width: 60%" 
                                                aria-valuenow="85"
                                                aria-valuemin="0" 
                                                aria-valuemax="100"
                                            ></div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                              
                                  <td>56</td>

                                  
                                  <td>40</td>

                                  
                                  <td>
                                    <a href="#" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0"><i className="bi bi-play-circle me-1"></i>Continue</a>
                                  </td>
                                </tr>

                                
                                <tr>
                                  
                                  <td>
                                    <div className="d-flex align-items-center">
                                    
                                      <div className="w-100px">
                                        <Image src={Course3} className="rounded" alt=""/>
                                      </div>
                                      <div className="mb-0 ms-2">
                                    
                                        <h6><a href="#">Create a Design System in Figma</a></h6>
                                      
                                        <div className="overflow-hidden">
                                          <h6 className="mb-0 text-end">100%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10">
                                            {/* <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                            </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  
                                  <td>42</td>

                                  
                                  <td>42</td>

                                  
                                  <td>
                                    <button className="btn btn-sm btn-success me-1 mb-1 mb-x;-0 disabled"><i className="bi bi-check me-1"></i>Complete</button>
                                    <a href="#" className="btn btn-sm btn-light me-1"><i className="bi bi-arrow-repeat me-1"></i>Restart</a>
                                  </td>
                                </tr>

                                
                                <tr>
                                  
                                  <td>
                                    <div className="d-flex align-items-center">
                                    
                                      <div className="w-100px">
                                        <Image src={Course5} className="rounded" alt=""/>
                                      </div>
                                      <div className="mb-0 ms-2">
                                        
                                        <h6><a href="#">The Complete Web Development in python</a></h6>
                                        
                                        <div className="overflow-hidden">
                                          <h6 className="mb-0 text-end">60%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10">
                                            {/* <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                            </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  
                                  <td>28</td>

                                  
                                  <td>12</td>

                                  
                                  <td>
                                    <a href="#" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0"><i className="bi bi-play-circle me-1"></i>Continue</a>
                                  </td>
                                </tr>

                                
                                <tr>
                                  
                                  <td>
                                    <div className="d-flex align-items-center">
                                    
                                      <div className="w-100px">
                                        <Image src={Course1} className="rounded" alt=""/>
                                      </div>
                                      <div className="mb-0 ms-2">
                                      
                                        <h6><a href="#">Digital Marketing MasterclassName</a></h6>
                                        
                                        <div className="overflow-hidden">
                                          <h6 className="mb-0 text-end">40%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10">
                                          {/* <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style= "width: 40%" aria-valuenow="40"  aria-valuemin="0" aria-valuemax="100">
                                          </div> */}

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  
                                  <td>32</td>

                                  
                                  <td>18</td>

                                  
                                  <td>
                                    <a href="#" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0"><i className="bi bi-play-circle me-1"></i>Continue</a>
                                  </td>
                                </tr>

                                
                                <tr>
                                  
                                  <td>
                                    <div className="d-flex align-items-center">
                                    
                                      <div className="w-100px">
                                        <Image src={Course2} className="rounded" alt=""/>
                                      </div>
                                      <div className="mb-0 ms-2">
                                      
                                        <h6><a href="#">Graphic Design MasterclassName</a></h6>
                                      
                                        <div className="overflow-hidden">
                                          <h6 className="mb-0 text-end">90%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10">
                                            {/* <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                            </div> */}
                                            
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  
                                  <td>16</td>

                                  
                                  <td>14</td>
                                  
                                  
                                  <td>
                                    <a href="#" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0"><i className="bi bi-play-circle me-1"></i>Continue</a>
                                  </td>
                                </tr>
                              </tbody>
                            
                            </table>
                          </div>
                      


                         {/* pagination */}
                          <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                          
                              <p className="mb-0 text-center text-sm-start">Showing 1 to 8 of 20 entries</p>
                            
                              <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                                <ul className="pagination pagination-sm pagination-primary-soft mb-0 pb-0">
                                  <li className="page-item mb-0"><a className="page-link" href="#" tabIndex={-1}><RiArrowDropLeftLine className='text-[19px]'/></a></li>
                                  <li className="page-item mb-0"><a className="page-link" href="#">1</a></li>
                                  <li className="page-item mb-0 active"><a className="page-link" href="#">2</a></li>
                                  <li className="page-item mb-0"><a className="page-link" href="#">3</a></li>
                                  <li className="page-item mb-0"><a className="page-link" href="#"><RiArrowDropRightLine className='text-[19px]'/></a></li>
                                </ul>
                              </nav>

                          </div>
                        
                        </div> 
                       
                       
                      
                      </div>
                    </div>
               
              </div> 
            </div>	
       </section>



    </div>
  )
}

export default StudentcourseBody