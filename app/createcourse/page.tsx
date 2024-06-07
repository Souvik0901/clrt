
import React from 'react';

// import "../components/assets/vendor/font-awesome/css/all.min.css";
import "../components/assets/vendor/apexcharts/css/apexcharts.css"
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../components/assets/css/style-dark.css";
import "../components/assets/vendor/quill/css/quill.snow.css";
import "../components/assets/vendor/stepper/css/bs-stepper.min.css";
import "../components/assets/vendor/choices/css/choices.min.css";
import "../components/assets/vendor/aos/aos.css";
import "../components/assets/vendor/glightbox/css/glightbox.css";

import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import Createcoursebody from '../components/Createcourse/Createcoursebody';
// import Popup from '../components/Createcourse/AddLecturePopup';

const page = () => {
  
  return (
    <>
    <div className="">
        <Navbar/>
        <Createcoursebody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
    </>
  )
}

export default page