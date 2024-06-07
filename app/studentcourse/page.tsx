import React from 'react';
import "../components/assets/css/style.css";
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import StudentBanner from '../components/Common/StudentBanner';
import StudentcourseBody from '../components/Studentcourses/Studentcoursebody';
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";



const page = () => {
  return (
    <div className="studentcourse">
        <Navbar />
        <StudentBanner/>
        <StudentcourseBody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page