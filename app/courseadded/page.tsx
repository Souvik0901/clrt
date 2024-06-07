import React from 'react';
import "../components/assets/css/style-dark.css";
import "../components/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../components/assets/vendor/glightbox/css/glightbox.css";
import "../components/assets/vendor/choices/css/choices.min.css";
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import check from '../components/assets/images/check.png';
import Image from 'next/image';

const page = () => {
  return (
    <div className="courseadded">
       <Navbar/>

        <main>
            <section className="overflow-hidden pt-0 pt-sm-5">
              <div className="container mt-[145px] mb-[145px]">
                <div className="row">
                  <div className="col-md-8 text-center mx-auto">
                   <div className='w-[100%] flex justify-center m-[40px 0]'>
                   <Image
                      src={check}
                      width={250}
                      height={250}
                      alt='none'
                    />
                   </div>
                    <h3>Your course has been submitted successfully.</h3>
                    <p>We will review your item shortly. You will be informed by email that your course has been accepted. Also, make sure your Payment and Tax information is correct and valid.</p>
                    <a href="dashboard" className="btn btn-primary-soft mb-5">Back to Homepage</a>
                  </div>
                </div>
              </div>
            </section>

          </main>


        <Footer/>
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>
    </div>
  )
}

export default page