import React from 'react';

// import "../components/assets/vendor/font-awesome/css/all.min.css";
import "../components/assets/vendor/apexcharts/css/apexcharts.css"
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../components/assets/css/style-dark.css";


import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

import Editcoursebody from '../components/Editcourse/Editcoursebody';





const page = () => {
  return (
    <div className="dashboard">
        <Navbar/>
        <Editcoursebody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page