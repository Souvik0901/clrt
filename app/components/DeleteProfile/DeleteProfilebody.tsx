"use client"
import { axiosInstance } from '@/redux/interceptors'
import { SERVICE_URL } from '@/utils/endpoint';
import { useRouter } from 'next/navigation';
import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const DeleteProfilebody = () => {
    const router = useRouter();
    const deleteAccount = async()=>{
      console.log(1234)
      try{
        const response = await axiosInstance.get(`${SERVICE_URL}removeuser`);
        if(response.data.code === 200){
          Cookies.remove('token');
          router.push('/login');
        }
      }
      catch(error){
        console.log(error);
      }
   }
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
   return (
    <div>
        <section className="pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <nav className="navbar navbar-light navbar-expand-xl mx-0">
                            <div className="offcanvas offcanvas-end"  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                                <div className="offcanvas-header bg-light">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body p-3 p-xl-0">
                                <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                  <div className="list-group list-group-dark list-group-borderless">
                                    <a className="list-group-item" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                    <a className="list-group-item" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                    <a className="list-group-item" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
                                    <a className="list-group-item" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                                    <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                                    <a className="list-group-item" href="reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                                    <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                    <a className="list-group-item active" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                    <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p>
                                   </div>
                                 </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-xl-9">
                        <div className="card border rounded-3 mb-0">
                            <div className="card-header border-bottom">
                                <h3 className="card-header-title mb-0">Deactivate Account</h3>
                            </div>
                            <div className="card-body">
                                <h6>Before you go...</h6>
                                <ul>
                                    <li>If you delete your account, you will lose your all data.</li>
                                </ul>
                                <div className="form-check form-check-md my-4">
                                    <input className="form-check-input" type="checkbox" value="" id="deleteaccountCheck"/>
                                    <label className="form-check-label" htmlFor="deleteaccountCheck">Yes, I&apos;d like to delete my account</label>
                                </div>
                                <button  className="btn btn-success-soft mb-2 mb-sm-0">Keep my account</button>
                                <button  className="btn btn-danger mb-0 pl-[5px]" onClick={()=>{deleteAccount()}}>Delete my account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>	
        </section>
    </div>
  )
}

export default DeleteProfilebody