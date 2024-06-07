
"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_URL } from '@/utils/endpoint';
import Cookies from 'js-cookie';
import axios from 'axios';
import { axiosInstance } from '@/redux/interceptors';
import Image from 'next/image';


const Earningbody = () => {
  const router = useRouter();
  const [current, setcurrent] = useState(0);
  const [previous, setprevious] = useState(0);
  const [previoustoprevious, setprevioustoprevious] = useState(0);
  const [LifeEarnings, setLifeEarnings] = useState(0);
  const [netcurrentmonth, setnetcurrentmonth] = useState(0.0);
  const [netpreviousmonth, setnetpreviousmonth] = useState(0.0);
  const [topcourses, settopcourses] = useState([]);

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
  },[])

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

   axiosInstance.get(`${SERVICE_URL}gettopcourses`)
   .then((response)=>{
     if(response.data.code===200){
       console.log(response.data.data);
       settopcourses(response.data.data);
     } 
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

  


  


  return (
    <div className='earningbody'>
       <section className="pt-0">
          <div className="container">

            <div className="row">

              {/* column section xl-3 */}
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
                          <a className="list-group-item" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                          <a className="list-group-item" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                          <a className="list-group-item active" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
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
             

              {/* column section xl-9 */}
              <div className="col-xl-9">

                
                
                 {/* row wise box g-4 */}
                <div className="row g-4">
               
                  <div className="col-sm-6 col-lg-6">
                    <div className="text-center p-4 bg-light rounded-3">
                      <h6 className="text-body">Sales this month</h6>
                      <h2 className="mb-0 fs-1">${current}</h2>
                    </div>
                  </div>
                  
                  <div className="col-sm-6 col-lg-6">
                    <div className="text-center p-4 bg-light rounded-3">
                      <h6 className="text-body">Lifetime Earnings</h6>
                      <h2 className="mb-0 fs-1">${LifeEarnings}</h2>
                    </div>
                  </div>
                </div>
              
                 {/* row wise box g-4  p-4*/}
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
                

              
                <div className="card border rounded-3 mt-5">
                
                  <div className="card-header">
                    <h5 className="mb-0">Top five earning sources</h5>
                  </div>
                 
                  <div className="card-body">
                    <div className="row g-4 g-md-5 align-items-center">
                     
                      {/* <div className="col-md-6">
                        <div id="ChartPageViews"></div>
                      </div> */}

                     
                      <div className="col-md-6">
                        <ul className="list-group list-group-borderless mb-3">
                          <li className="list-group-item"><h6 className="mb-0">Courses</h6></li>
                          { 
                            (topcourses.length===0)?
                               <p>No available courses</p>
                            :
                            topcourses.map((courseItems:any,index)=>{
                              return(
                                <div className='flex mt-[20px]' key={index}>
                                  <Image  src={courseItems.populatedCourseDetails[0].courseImage} alt="none" width={150} height={100}/>
                                  <div className="courseinfo">
                                    <li className="list-group-item mb-0 pb-0" key={index}><i className="text-success fas fa-circle me-2 ml-[10px] mb-[0] pb-[0]"></i>{courseItems.populatedCourseDetails[0].courseTitle}</li>
                                    <span className="flex text-body small align-center mt-0 pt-0"><span className='fs-[12px] mt-[2px] ml-[20px]'>Level: {courseItems.populatedCourseDetails[0].courseLevel}</span></span>
                                  </div>
                                  </div>
                              )
                            })
                          }
                          
                         
                        </ul>
                      </div>
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

export default Earningbody