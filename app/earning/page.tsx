
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";

import "../components/assets/css/style-dark.css";

import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import MainBanner from '../components/Common/MainBanner';
import Earningbody from '../components/Earning/Earningbody';



const page = () => {


  return (
    <div className="earning">
        <Navbar/>
        <MainBanner/>
        <Earningbody/>
        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page