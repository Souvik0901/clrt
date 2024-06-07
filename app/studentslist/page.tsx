import React from 'react';


import "../components/assets/css/style-dark.css";
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import MainBanner from '../components/Common/MainBanner';
import Studentslistbody from '../components/Studentslist/Studentslistbody';
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../components/assets/vendor/glightbox/css/glightbox.css";
import "../components/assets/vendor/choices/css/choices.min.css";

const page = () => {
  return (
    <div className="studentslist">
        <Navbar />
        <MainBanner/>
        <Studentslistbody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page