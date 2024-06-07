"use client"
import React, { useEffect, useState } from 'react';
import avatar from '../../components/assets/images/avatar/defaultprofile.png';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors';


const MainBanner = () => {
  const backgroundImage = require('../../components/assets/images/pattern/04.png').default;
  const user = Cookies.get('token');
  const [username, setusername] = useState('');
  const [imgpath, setimgpath] = useState('');
  const [totalcourses, settotalcourses] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const [enrolledStudent, setenrolledStudent] = useState('0');
  useEffect(() => {
    try {
      axiosInstance.get(`${SERVICE_URL}getuserdata`)
      .then((response)=>{
        setusername(response.data.userDetails.name);
        setimgpath(response.data.userDetails.profileImg);
        setUserRating(response.data.userDetails.userRating);
      })
      .catch ((error)=>{
        console.error('Error submitting form:', error);
      })
    } catch (error:any) {
      alert(error.response.data.message);
    }
  }, [])

  useEffect(() => {
    const fetchCoursesdata = async () => {
    try {
      const response = await axiosInstance.get(`${SERVICE_URL}paginatedcourses`);
      settotalcourses(response.data.totalcourse);
    }  catch (error) {
      console.error('Error fetching courses:', error);
      }
  };
  fetchCoursesdata();
  }, [])


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
  

  return (

      <section className="pt-0">
        <div className="container-fluid px-0">
						<div
							className="bg-blue h-100px h-md-200px rounded-0"
							style={{
								background: `url(${backgroundImage}) no-repeat center center`,
								backgroundSize: 'cover',
							}}
						></div>
        </div>

        <div className="container mt-n4">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent card-body p-0">
                <div className="row d-flex justify-content-between">
                  <div className="col-auto mt-4 mt-md-0">
                    <div className="avatar avatar-xxl mt-n3">
                      <Image
                        className="avatar-img rounded-circle border border-white border-3 shadow"
                        // src={(imgpath)?`${process.env.NEXT_PUBLIC_BASE_URL}${imgpath}`:avatar}
                        src={(imgpath)?`${imgpath}`:avatar}
                        width={120}
                        height={120}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col d-md-flex justify-content-between align-items-center mt-4">
                    <div>
                      <h1 className="my-1 fs-4">
                        {username}{' '}
                        <i className="bi bi-patch-check-fill text-info small"></i>
                      </h1>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                          <i className="fas fa-star text-warning me-2"></i>
                          {userRating}/5.0
                        </li>
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                          <i className="fas fa-user-graduate text-orange me-2"></i>
                          {enrolledStudent} Enrolled Students
                        </li>
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0">
                          <i className="fas fa-book text-purple me-2"></i>
                          {totalcourses} Courses
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <a href="createcourse" className="btn btn-success mb-0">
                        Create a course
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="d-xl-none" />
              <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                <a className="h6 mb-0 fw-bold d-xl-none" href="#">
                  Menu
                </a>
                <button
                  className="btn btn-primary d-xl-none"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar"
                >
                  <i className="fas fa-sliders-h"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
   
  );
};

export default MainBanner;