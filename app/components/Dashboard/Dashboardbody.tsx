"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { FaEdit,FaTimes } from "react-icons/fa";
import Cookies from 'js-cookie';
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface course {
  id:string;
  courseImage: string,
  courseTitle: string;
  price: number;
  selling: number;
  period: number;
  _id: string
}



const Dashboardbody = () => {
  const user = Cookies.get('token');
  const router = useRouter();

  const [courses, setCourses] = useState<course[]>([]);
  const [enrolledStudent, setenrolledStudent] = useState('0');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [current, setcurrent] = useState(0);
  const [previous, setprevious] = useState(0);
  const [previoustoprevious, setprevioustoprevious] = useState(0);
  const [LifeEarnings, setLifeEarnings] = useState(0);
  const [netcurrentmonth, setnetcurrentmonth] = useState(0.0);
  const [netpreviousmonth, setnetpreviousmonth] = useState(0.0);
  const [totalcourses, settotalcourses] = useState(0);

  const getPriceForMonth = (month:any, year:any, data:any) => {
    let totalPrice = 0;
    data.forEach((order:any) => {
        const orderDate = new Date(order.orderDate);
        if (orderDate.getMonth() === month && orderDate.getFullYear() === year) {
            totalPrice += order.courseDetails.price;
        }
    });
    return totalPrice;
};

  const getAmount = useCallback((data:any)=>{
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousToPreviousMonth = previousMonth === 0 ? 11 : previousMonth - 1;
    const previousToPreviousYear = previousMonth === 0 ? previousYear - 1 : previousYear;
    const currentMonthPrice = getPriceForMonth(currentMonth, currentYear,data);
    const previousMonthPrice = getPriceForMonth(previousMonth, previousYear,data);
    const previousToPreviousMonthPrice = getPriceForMonth(previousToPreviousMonth, previousToPreviousYear,data);
    setcurrent(currentMonthPrice);
    setprevious(previousMonthPrice);
    setprevioustoprevious(previousToPreviousMonthPrice);
  },[]);

  const getLifeTimeEarnings = useCallback((data:any) => {
    let totalPrice = 0;
    data.forEach((order:any) => {
        totalPrice += order.courseDetails.price;
        
    });
    setLifeEarnings(totalPrice);
},[]);


  useEffect(() => {
   axiosInstance.get(`${SERVICE_URL}getorderitems`)
   .then((response)=>{
    getAmount(response.data.data);
    getLifeTimeEarnings(response.data.data);   
    })
   .catch((error)=>{
    console.log(error);
   })
  },[getAmount,getLifeTimeEarnings])

  useEffect(()=>{
    if(previous===0){
      setnetcurrentmonth(current-previous);
    }
    else{
      const currentMonth:any = ((current-previous)/previous)*100;
      setnetcurrentmonth(currentMonth.toFixed(2));
    }
    if(previoustoprevious===0){
      setnetpreviousmonth(previous-previoustoprevious);
    }
    else{
      const previousMonth:any = ((previous-previoustoprevious)/previoustoprevious)*100;
      setnetcurrentmonth(previousMonth.toFixed(2));
    };
  },[previous, previoustoprevious, current])

  const signOut = async()=>{
    try {
        const response = await axios.post(`${SERVICE_URL}logout`, {token:Cookies.get('token')});
        console.log(response); 
        Cookies.remove('token');
        router.push('/login');
      } catch (error:any) {
        console.log(error);
      }
  }

  useEffect(() => {
    const fetchCourses = async () => {

        try {
        const response = await axiosInstance.get(`${SERVICE_URL}paginatedcourses`, {

            params: { page: currentPage, limit: 5}, 
        });

        const data: course[] = response.data.result;
        setCourses(data);
        setPageCount(response.data.pageCount);
        settotalcourses(response.data.totalcourse);
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };
    fetchCourses();

    axiosInstance.get(`${SERVICE_URL}getenrollmentlist`)
    .then((response)=>{
      // console.log(response.data);
      if(response.data.code===200){
        // console.log(response.data.data.length);
        const length = response.data.data.length;
        if( length>999){
          const newlength = (length/1000)%100;
          setenrolledStudent(`${newlength}K+`);
        }
        else{
          setenrolledStudent(`${length}`);
        }
      }
    })
    .catch ((error)=>{
      console.error('Error submitting form:', error);
    })
    

    }, [user, currentPage]);

  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      };

  return (
    <section className="pt-0">


        <div className="container">


          <div className="row">
            
             {/* column for chart of dashboard ,course, earning students.... */}
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
                        <a className="list-group-item active" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                        <a className="list-group-item" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                        <a className="list-group-item" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
                        <a className="list-group-item" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                        <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                        <a className="list-group-item" href="reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                        <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                        <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                        <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p>
                      </div>

                    </div>
                    
                  </div>
                </div>
              </nav>
            
            </div>
            

          
            <div className="col-xl-9">

            
                  <div className="row g-4">

                    <div className="col-sm-6 col-lg-6">
                      <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                        <span className="display-6 text-info mb-0"><i className="fas fa-gem fa-fw"></i></span>
                        <div className="">
                          <div className="d-flex flex-col items-center">
                            <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="12" data-purecounter-delay="300"></h5>
                            <span className="mb-0 h5">{totalcourses}</span>
                          </div>
                          <span className="mb-0 h6 fw-light">Total Courses</span>
                        </div>
                      </div>
                    </div>
                  
                    
                    <div className="col-sm-6 col-lg-6">
                      <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                        <span className="display-6 text-info mb-0"><i className="fas fa-gem fa-fw"></i></span>
                        <div className="">
                          <div className="d-flex flex-col items-center">
                            <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="12" data-purecounter-delay="300"></h5>
                            <span className="mb-0 h5">{enrolledStudent}</span>
                          </div>
                          <span className="mb-0 h6 fw-light">Enrolled Students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                



                <div className="card card-body rounded-top border overflow-hidden p-0 mt-5">
              <div className="card card-body rounded-top border overflow-hidden p-0 mt-5">
                  <div className="row g-4 p-4">
                    
                    <div className="col-sm-6 col-md-4">
                      <span className="badge bg-dark text-white">Current Month</span>
                      <h4 className="text-primary my-2">${current}</h4>
                      {
                        (netcurrentmonth>=0)?
                        <p className="mb-0"><span className="text-success me-1">{netcurrentmonth}%<i className="bi bi-arrow-up"></i></span>current month</p>
                        :
                        <p className="mb-0"><span className="text-danger me-1">{Math.abs(netcurrentmonth)}%<i className="bi bi-arrow-down"></i></span>current month</p>
                      }
                    </div>
                   
                    <div className="col-sm-6 col-md-4">
                      <span className="badge bg-dark text-white">Last Month</span>
                      <h4 className="my-2">${previous}</h4>
                      {
                        (netpreviousmonth>=0)?
                        <p className="mb-0"><span className="text-success me-1">{netpreviousmonth}%<i className="bi bi-arrow-up"></i></span>Then last month</p>
                        :
                        <p className="mb-0"><span className="text-danger me-1">{Math.abs(netpreviousmonth)}%<i className="bi bi-arrow-down"></i></span>Then last month</p>
                      }
                    </div>
                  </div>

                
                  <div id="ChartPayoutEarning"></div>

                </div>
                  

                  {/* Card sections of most selling courses */}
                  <div className="row">
                    <div className="col-12">
                      <div className="card border rounded-3 mt-5">
                      
                        <div className="card-header border-bottom">
                          <div className="d-sm-flex justify-content-sm-between align-items-center">
                            <h3 className="mb-2 mb-sm-0">Most Selling Courses</h3>
                            <a href="mycourse" className="btn btn-sm btn-primary-soft mb-0">View all</a>
                          </div>
                        </div>
                        

                        
                        <div className="card-body">
                          <div className="table-responsive-lg border-0 rounded-3">
                          
                            <table className="table table-dark-gray align-middle p-4 mb-0">
                            
                              <thead>
                                <tr>
                                  <th scope="col" className="border-0 rounded-start">Course Name</th>
                                  <th scope="col" className="border-0">Selling</th>
                                  <th scope="col" className="border-0">Amount</th>
                                  <th scope="col" className="border-0">Period</th>
                                  <th scope="col" className="border-0 rounded-end">Action</th>
                                </tr>
                              </thead>
                            
                              <tbody>
                                
                               {courses && courses.map((course)=>(

                              
                                <tr key={course.id}>
                                
                                  <td>
                                    <div className="d-flex align-items-center">
                                    
                                      <div className="w-100px w-md-60px">
                                      <Image src={`${course.courseImage}`} width={100} height={100} className="rounded" alt="nonenone"/>
                                      </div>
                                    
                                      <h6 className="mb-0 ms-2">	
                                        <a href="#">{course.courseTitle}</a>
                                      </h6>
                                    </div>
                                  </td>
                                
                                  <td>0</td>
                                
                                  <td>${course.price}</td>
                                
                                  <td>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">{course.period} months</span>
                                  </td>
                                  
                                  <td className="d-flex align-items-center" style={{ padding: '1.5rem' }}>
                                    <a href={`/editcourse?courseId=${course._id}`} className="btn btn-sm btn-success-soft btn-round me-1 mb-0"><FaEdit/></a>
                                    <button className="btn btn-sm btn-danger-soft btn-round mb-0"><FaTimes/></button>
                                  </td>
                                </tr>

                               ))} 
                              </tbody>
                            
                            </table>
                          
                          </div>

                        
                                {/* pagination */}
                                <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                                 <p className="mb-0 text-center text-sm-start">Showing Page {currentPage}  of {pageCount}</p>
                                    <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                                        <ul className="pagination pagination-sm pagination-primary-soft mb-0 pb-0">
                                            {currentPage > 1 && (
                                                <li className="page-item mb-0">
                                                    <a className="page-link"  onClick={() => handlePageChange(currentPage - 1)}>
                                                        <RiArrowDropLeftLine className="text-[19px]" />
                                                    </a>
                                                </li>
                                            )}
                                            {[...Array(pageCount)].map((_, index) => (
                                                <li className={`page-item mb-0 ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                                    <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                            {currentPage < pageCount && (
                                                <li className="page-item mb-0">
                                                    <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                        <RiArrowDropRightLine className="text-[19px]" />
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                        </div>
                      
                      </div>
                    </div>
                  </div>
                  
            </div>
            
          </div>
         </div>

        </div>
    </section>

  )
}

export default Dashboardbody