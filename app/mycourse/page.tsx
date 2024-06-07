import React from 'react';

import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import Mycoursebody from '../components/Mycourses/Mycoursebody';
import "../components/assets/vendor/choices/css/choices.min.css";


import "../components/assets/css/style-dark.css";
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import MainBanner from '../components/Common/MainBanner';


const page = () => {
  return (
    <div className="mycourse">
        <Navbar />
        <MainBanner/>
        <Mycoursebody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page