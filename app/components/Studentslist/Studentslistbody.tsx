"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import avatar1 from '../../components/assets/images/avatar/defaultprofile.png';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { AiOutlineStop, } from "react-icons/ai";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors'; 
import { FaLocationDot } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';




const Studentslistbody = () => {
  const [EnrolledStudents, setEnrolledStudents] = useState([]);
  const [getStudents, setgetStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortingFilter, setsortingFilter] = useState('Sort by');
  useEffect(() => {
    try {
      axiosInstance.get(`${SERVICE_URL}getenrollmentlist`)
      .then((response)=>{
        console.log(response.data);
        console.log("Rohit");
        if(response.data.code===200){
          response.data.data.forEach((element:any, index:any) => {
            const timestamp = new Date(element.studentEnrollmentDate);
            const day = timestamp.getUTCDate().toString().padStart(2, '0');
            const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0');
            const year = timestamp.getUTCFullYear();
            response.data.data[index].enrollmentDate = `${day}/${month}/${year}`;
        });
          setgetStudents(response.data.data);
          setEnrolledStudents(response.data.data);
        }
      })
      .catch ((error)=>{
        console.error('Error submitting form:', error);
      })
    } catch (error:any) {
      alert(error.response.data.message);
    }
  }, [])


  const handleSearchInputChange = (event:any) => {
    setSearchInput(event.target.value);
    filterTabledata(event.target.value);
  };


  const filterTabledata = (searchValue: string) => {
    const filteredArray = getStudents.filter((obj: { name: string; location: string; }) => {
      return (
        obj.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        obj.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setEnrolledStudents(filteredArray);
  };

  const sortTabledata = (searchValue:any) => {
    const sortedArray = EnrolledStudents.sort((a:any, b:any) => {
      const dateA:any = new Date(a.enrollmentDate);
      const dateB:any = new Date(b.enrollmentDate);
      if (sortingFilter === 'newest') {
        return dateA - dateB;  
      } else {
        return dateB - dateA;
      }
    });
    setEnrolledStudents(sortedArray);
  };

  const handleSortingChange = (event:any) => {
    setsortingFilter(event.target.value);
    sortTabledata(searchInput);
  };


  const [pageNumber, setPageNumber] = useState(0);
  const studentsPerPage = 8;
  const pageCount = Math.ceil(EnrolledStudents.length / studentsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
  const pagesVisited = pageNumber * studentsPerPage;
  const startIndex = pageNumber * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

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
    <div className="studentslist">

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
                          <a className="list-group-item active" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                          <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                          <a className="list-group-item" href="reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                          <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                          <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                          <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p></div>
                        </div>
                      </div>
                    </div>
                  </nav>
                  
                </div>
               

             
                <div className="col-xl-9">
                 
                  <div className="card border rounded-3">
                  
                    <div className="card-header border-bottom">
                      <h3 className="mb-0">My Students List</h3>
                    </div>
                    

                  
                    <div className="card-body">

                    
                      <div className="row g-3 align-items-center justify-content-between mb-4">
                      
                        <div className="col-md-8">
                          <form className="rounded position-relative">
                            <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" value={searchInput} onChange={handleSearchInputChange}/>
                            <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 "></i></button>
                          </form>
                        </div>

                        
                        <div className="col-md-3">
                          
                          <form>
                            <select className="form-select js-choice border-0 z-index-9 bg-transparent" aria-label=".form-select-sm" value={sortingFilter} onChange={handleSortingChange}>
                              <option value="">Sort by</option>
                              <option value="newest">Newest</option>
                              <option value="oldest">Oldest</option>
                            </select>
                          </form>
                        </div>
                      </div>
                      

                   
                      <div className="table-responsive border-0">
                        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                        
                          <thead>
                            <tr>
                              <th scope="col" className="border-0 rounded-start">Student name</th>
                              <th scope="col" className="border-0">Progress</th>
                              <th scope="col" className="border-0">Courses</th>
                              <th scope="col" className="border-0">Enrolled date</th>
                              <th scope="col" className="border-0 rounded-end">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                              {EnrolledStudents.length === 0 ? (
                                <tr>
                                  <td className='mt-[15px] text-center w-[100%]' colSpan={5}>No students are found</td>
                                </tr>
                              ) : (
                                EnrolledStudents.slice(startIndex, endIndex).map((items: any, index: any) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <div className="d-flex align-items-center position-relative">
                                          <div className="avatar avatar-md bg-black">
                                            <Image src={(items.profileImg) ? `${items.profileImg}` : avatar1} width={100} height={100} style={{ width: '100%', height: '100%' }} className="rounded object-fill" alt="" />
                                          </div>
                                          <div className="mb-0 ms-2">
                                            <h6 className="mb-0"><a href="#" className="stretched-link">{items?.name}</a></h6>
                                              <span className="flex text-body small align-center"><FaLocationDot className="fas fa-fw fa-map-marker-alt me-1 mt-1" /> <span className='fs-[12px] mt-[2px]'>{(items.location!==null)?items?.location:"unknown"}</span></span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-center text-sm-start">
                                        <div className=" overflow-hidden">
                                          <h6 className="mb-0">{items?.progress}%</h6>
                                          <div className="progress progress-sm bg-primary bg-opacity-10 mt-1">
                                            <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style={{"width": `${items?.progress}`}} >
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td className='pcourse pl-30'>{items?.totalCourses}</td>

                                      <td className='txt-center'>{items?.enrollmentDate}</td>

                                      <td className="d-flex align-items-center mt-2">
                                        <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-0"><PiEnvelopeSimpleLight /></a>
                                        <button className="btn btn-sm btn-danger-soft btn-round mb-0"><AiOutlineStop /></button>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          
                        </table>
                      </div>
                     

                     
                      <div className="flex justify-between" >
                        <p className="page-item mb-0 active">
                          Showing {pagesVisited + 1} to {Math.min(pagesVisited + studentsPerPage, EnrolledStudents.length)} of {EnrolledStudents.length} entries
                        </p>
                        <ReactPaginate
                          previousLabel={<RiArrowDropLeftLine className='text-[19px]' />}
                          nextLabel={<RiArrowDropRightLine className='text-[19px]' />}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName="pagination pagination-sm pagination-primary-soft mb-0 pb-0"
                          activeClassName="active"
                          className='pagination pagination-sm pagination-primary-soft mb-0 pb-0'
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          marginPagesDisplayed={1} // Set the number of pages to be displayed before and after the current page
                          pageRangeDisplayed={1}  // Set the number of additional pages to display on each side of the current page
                          forcePage={pageNumber}
                        />
                      </div>

                      


                    </div>
                   
                  </div>
                
                </div>
               
              </div>
            </div>
          </section>
    </div>
  )
}

export default Studentslistbody