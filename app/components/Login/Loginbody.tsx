'use client';
import {useState} from 'react'
import Image from 'next/image';
import axios from 'axios';
// import { useRouter } from 'next/router';

import elm02 from "../../components/assets/images/element/02.svg";
import avatar01 from "../../components/assets/images/avatar/01.jpg";
import avatar02 from "../../components/assets/images/avatar/02.jpg";
import avatar03 from "../../components/assets/images/avatar/03.jpg";
import avatar04 from "../../components/assets/images/avatar/04.jpg";
import { useRouter } from 'next/navigation';
import { SERVICE_URL } from '../../../utils/endpoint';
import Cookies from 'js-cookie';

const Loginbody = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVICE_URL}login`, formData); 
			if(response.data.code===200 && response.data.data.usertype ==='student' ){
				Cookies.set('token', response.data.userToken , { expires: 7 });
				window.location.href = `${process.env.NEXT_PUBLIC_STUDENT_DASHBOARD_URL}/student-dashboard`
			}
			else if(response.data.code === 200 && response.data.data.usertype === 'instructor' ){
				Cookies.set('token', response.data.userToken , { expires: 7 });
				router.push('/dashboard');
			}
	  else{
		alert(response.data.message);
	  }
    } catch (error:any) {
		alert(error.response.data.message);
    }
  };




  return (
    <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
	
		<div className="container-fluid">
			<div className="row">
				
				<div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
					<div className="p-3 p-lg-5">
				
						<div className="text-center">
							<h2 className="fw-bold">Welcome to our largest community</h2>
							<p className="mb-0 h6 fw-light">Lets learn something new today!</p>
						</div>
					
						<Image src={elm02} className="mt-5" alt=""/>
				
						<div className="d-sm-flex mt-5 align-items-center justify-content-center">
					
							<ul className="avatar-group mb-2 mb-sm-0">
								<li className="avatar avatar-sm">
									<Image className="avatar-img rounded-circle" src={avatar01} alt="avatar"/>
								</li>
								<li className="avatar avatar-sm">
									<Image className="avatar-img rounded-circle" src={avatar02} alt="avatar"/>
								</li>
								<li className="avatar avatar-sm">
									<Image className="avatar-img rounded-circle" src={avatar03} alt="avatar"/>
								</li>
								<li className="avatar avatar-sm">
									<Image className="avatar-img rounded-circle" src={avatar04} alt="avatar"/>
								</li>
							</ul>

							<p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now its your turn.</p>
						</div>
					</div>
				</div>

		
				<div className="col-12 col-lg-6 m-auto">
					<div className="row my-5">
						<div className="col-sm-10 col-xl-8 m-auto">

							<span className="mb-0 fs-1">👋</span>
							<h1 className="fs-2">Login into TechChefz Academy!</h1>
							<p className="lead mb-4">Nice to see you! Please log in with your account.</p>


							<form  onSubmit={handleSubmit}
                       id="loginform"
							>

								<div className="mb-4">
									<label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
									<div className="input-group input-group-lg">
										<span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill"></i></span>
										<input 
										 type="email" 
										 className="form-control border-0 bg-light rounded-end ps-1" 
										 placeholder="E-mail" 
										 id="exampleInputEmail1"
										 name="email"
										 value={formData.email}
										 onChange={handleChange}
										 />
									</div>
								</div>

								<div className="mb-4">
									<label htmlFor="inputPassword5" className="form-label">Password *</label>
									<div className="input-group input-group-lg">
										<span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
										<input 
										  type="password" 
											className="form-control border-0 bg-light rounded-end ps-1" 
											placeholder="password" 
											id="inputPassword5"
											name="password"
                      value={formData.password}
                      onChange={handleChange}
											/>
									</div>
									<div id="passwordHelpBlock" className="form-text">
										Your password must be 8 characters at least 
									</div>
								</div>

								<div className="mb-4 d-flex justify-content-between mb-4">
									<div className="form-check">
										<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
										<label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
									</div>
									<div className="text-primary-hover">
										<a href="forgot-password.html" className="text-secondary">
											<u>Forgot password?</u>
										</a>
									</div>
								</div>

								<div className="align-items-center mt-0">
									<div className="d-grid">
										<button className="btn btn-primary mb-0" type="submit">Login</button>
									</div>
								</div>
							</form>



							<div className="row">

								<div className="position-relative my-4">
									<hr/>
									<p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
								</div>


								<div className="col-xxl-6 d-grid">
									<a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2"></i>Login with Google</a>
								</div>

								<div className="col-xxl-6 d-grid">
									<a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2"></i>Login with Facebook</a>
								</div>
							</div>


							<div className="mt-4 text-center">
								<span>Dont have an account? <a href="signup">Signup here</a></span>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
	  </section>
  )
}

export default Loginbody