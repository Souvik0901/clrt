"use client";
import React, { ChangeEvent, useEffect, useState, } from 'react'
import Image from 'next/image';
import avatar from '../../components/assets/images/avatar/defaultprofile.png';
import axios from 'axios';
import { SERVICE_URL } from '@/utils/endpoint';
import Cookies from 'js-cookie';
import { axiosInstance } from '@/redux/interceptors';
import { useRouter } from 'next/navigation';

const Editprofile = () => {
  const [images, setImage] = useState<File| null>(null);
  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  
 

  const [editformData, seteditformData] = useState({
    username:'',
    emailId:'',
    phoneNumber:'',
    location:'',
    profileImg:'',
    abouttxt:'',
    oldPassword: '',
    newPassword: '',
    confirmPassword:'',
    _id:'',
  });
  const user = Cookies.get('token');


  useEffect(() => {
    try {
      axiosInstance.get(`${SERVICE_URL}getuserdata`)
      .then((response)=>{
          seteditformData({
            username: response.data.userDetails.name,
            emailId: response.data.userDetails.email,
            phoneNumber: response.data.userDetails.phoneNumber,
            location: response.data.userDetails.location,
            profileImg: response.data.userDetails.profileImg,
            abouttxt: response.data.userDetails.abouttxt,
            oldPassword: '',
            newPassword: '',
            confirmPassword:'',
            _id:'',
          });
        
      })
      .catch ((error)=>{
        console.error('Error submitting form:', error);
      })
    } catch (error:any) {
      alert(error.response.data.message);
    }
  }, [])




  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    seteditformData({
      ...editformData,
      [name]: value,
    });
  };

  const changePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if(editformData.oldPassword !== '' && editformData.newPassword !== '' && editformData.confirmPassword !== ''){
        if(editformData.newPassword === editformData.confirmPassword){
          try {
            const response = await axios.post(`${SERVICE_URL}changepassword`, editformData,
              {
                headers: {authorization: user},
              }
            );
            console.log(response.data);
            let currentLocation = window.location.href;
            window.location.href = currentLocation 
          } catch (error:any) {
            alert(error.response.data.message);
          }
        }
        else{
          alert("New and Confirm passwords fields do not match");
        }
    }
    else{
      alert("All fields are mandatory*");
    }
  };



  const changeUserData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // if(editformData.username !=='' && editformData.emailId !=='' && images !==null && editformData.abouttxt !=='' && editformData.location !==''){
      // Create FormData and append other form fields
      let editData = new FormData();
      editData.append('username', editformData.username);
      editData.append('emailId', editformData.emailId);
      editData.append('phoneNumber', editformData.phoneNumber);
      editData.append('location', editformData.location);
      editData.append('abouttxt', editformData.abouttxt);

  
      // Append the file to FormData
      console.log(images)
      if(images!==null){
        editData.append('profileImg', images || '');
      }

      try {
        const response = await axiosInstance.post(
          `${SERVICE_URL}updateprofileinfo`,
          editData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
              Authorization: user,
            },
          }
        );
        console.log(response.data);
        let currentLocation = window.location.href;
        window.location.href = currentLocation 
      } catch (error:any) {
        console.log(error.response.data.message);
      }
    // }
    // else{
    //   alert('All fields are mandatory*');
    // }
    
  };

  const router = useRouter();
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
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                
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
                      <a className="list-group-item active" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                      <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                      <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p>                  </div>
                    </div>
                  </div>
                </div>
              </nav>
          
            </div>
            {/* <Sidebar/> */}
     
            <div className="col-xl-9">
              <div className="card border rounded-3">
                <div className="card-header border-bottom">
                  <h3 className="card-header-title mb-0">Edit Profile</h3>
                </div>
 
                <form className="card-body" onSubmit={changeUserData} id="editprofileform" >
                  <div className="row g-4">
                    <div className="col-12 justify-content-center align-items-center">
                      <label className="form-label">Profile picture</label>
                      <div className="d-flex align-items-center">
                        <label className="position-relative me-4" htmlFor="uploadfile-1" title="Replace this pic">
                      
                          <span className="avatar avatar-xl">
                           <Image
                              id="uploadfile-1-preview" 
                              className="avatar-img rounded-circle border border-white border-3 shadow"
                            
                              src={(editformData.profileImg)?`${editformData.profileImg}`:avatar}
                              width={120}
                              height={120}
                              alt=""
                            />
                          </span>
                        </label>

                        {/* <label className="btn btn-primary-soft mb-0" htmlFor="uploadfile-1">upload</label> */}
                        <input id="uploadfile-1" className="btn btn-primary-soft mb-0" type="file"  
                        name="my-image"  
                        accept="image/gif, image/jpeg, image/png"
                        onChange={imageHandler}
                        />
                        
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Username</label>
                      <div className="input-group">
                        <span className="input-group-text">Eduport.com</span>
                        <input type="text" className="form-control" 
                         name="username"
                         value={editformData.username}
                         onChange={handleChange}
                         placeholder='name'
                         />
                        
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email id</label>
                      <input className="form-control" type="email"   placeholder="Email"
                       name="emailId"
                       value={editformData.emailId}
                       onChange={handleChange}/>
                    
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone number</label>
                      <input type="text" className="form-control" placeholder="Phone number"
                       name="phoneNumber"
                       value={editformData.phoneNumber}
                       onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input className="form-control" type="text"
                       name="location"
                       value={editformData.location}
                       onChange={handleChange}
                       placeholder='location'
                       />
                    </div>
                    
         
                    <div className="col-12">
                      <label className="form-label">About me</label>
                      <textarea className="form-control"
                       rows={5}  
                       name="abouttxt"
                       value={editformData.abouttxt}
                       onChange={handleChange}
                       placeholder='Brief description for your profile.'
                      />
                      <div className="form-text">Brief description for your profile.</div> 
                    </div>
                                  
                    <div className="d-sm-flex justify-content-end">
                      <button type="submit" className="btn btn-primary mb-0">Save changes</button>
                    </div>
                  </div>
                </form>
      
              </div>
     
              
              <div className="row g-4 mt-3">
                <div className="col-lg-6">
                  <form className="card border rounded-3" onSubmit={changePassword} id="passwordform">
                
                    <div className="card-header border-bottom">
                      <h5 className="card-header-title mb-0">Update password</h5>
                    </div>
                
                    <div className="card-body">
                
                      <div className="mb-3">
                        <label className="form-label">Current password</label>
                        <input className="form-control" type="password" placeholder="Enter current password" 
                          name="oldPassword"
										      value={editformData.oldPassword}
										      onChange={handleChange}/>
                      </div>
                
                      <div className="mb-3">
                        <label className="form-label"> Enter new password</label>
                        <div className="input-group">
                          <input className="form-control" type="password" placeholder="Enter new password"
                           name="newPassword"
                           value={editformData.newPassword}
                           onChange={handleChange}
                          />
                          <span className="input-group-text p-0 bg-transparent">
                            <i className="far fa-eye cursor-pointer p-2 w-40px"></i>
                          </span>
                        </div>
                        <div className="rounded mt-1" id="psw-strength"></div>
                      </div>
                      
                      <div>
                        <label className="form-label">Confirm new password</label>
                        <input className="form-control" type="password" placeholder="Enter new password"
                         name="confirmPassword"
                         value={editformData.confirmPassword}
                         onChange={handleChange}
                        />
                      </div>
                      
                      <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-primary mb-0">Change password</button>
                      </div>
                    </div>
                    
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Editprofile