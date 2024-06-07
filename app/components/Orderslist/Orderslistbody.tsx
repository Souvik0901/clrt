"use client"
import { SERVICE_URL } from '@/utils/endpoint';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { axiosInstance } from '@/redux/interceptors';
import ReactPaginate from 'react-paginate';

const Orderslistbody = () => {
  const router = useRouter();
  const [orderList, setorderList] = useState([]);
  const [getOrders, setgetOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortingFilter, setsortingFilter] = useState('Sort by');
     
  const signOut = async()=>{
    try {
        const response = await axios.post(`${SERVICE_URL}logout`, {token:Cookies.get('token')});
        Cookies.remove('token');
        router.push('/login');
      } catch (error:any) {
        console.log(error);
      }
  }

    useEffect(() => {
      try {
        axiosInstance.get(`${SERVICE_URL}getorderitems`)
        .then((response)=>{
          if(response.data.code===200){
            response.data.data.forEach((element:any, index:any) => {
              const timestamp = new Date(element.orderDate);
              const day = timestamp.getUTCDate().toString().padStart(2, '0');
              const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0');
              const year = timestamp.getUTCFullYear();
              response.data.data[index].orderDate = `${day}/${month}/${year}`;
          });
            setorderList(response.data.data);
            setgetOrders(response.data.data);
          }
        })
        .catch ((error)=>{
          console.error('Error:', error);
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
      const filteredArray = getOrders.filter((obj:any) => {
        return (
          obj.courseDetails.courseTitle.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setorderList(filteredArray);
    };

    // const sortTabledata = (searchValue:any) => {
    //   const sortedArray = orderList.sort((a:any, b:any) => {
    //     console.log(a);
    //     const dateA:any = new Date(a.orderDate);
    //     const dateB:any = new Date(b.orderDate);
    //     console.log(dateA);
    //     console.log(dateB);
    //     if (sortingFilter === 'newest') {
    //       return dateA - dateB;  
    //     } else {
    //       return dateB - dateA;
    //     }
    //   });
    //   console.log(sortedArray);
    //   setorderList(sortedArray);
    // };
  
    const sortTabledata = (searchValue: any,) => {
      const sortedArray = orderList.sort((a: any, b: any) => {
          const rearrangedDateA = a.orderDate.split('/').reverse().join('-');
          const rearrangedDateB = b.orderDate.split('/').reverse().join('-');

          const dateA: any = new Date(rearrangedDateA);
          const dateB: any = new Date(rearrangedDateB);
          console.log(dateA);
          console.log(dateB);
        
          if (isNaN(dateA) || isNaN(dateB)) {
              console.log("Invalid date format!");
              return 0; 
          }
          if (sortingFilter === 'newest') {
              return dateA - dateB; 
          } else {
              return dateB - dateA;
          }
      }); 
      setorderList(sortedArray);
  };

    const handleSortingChange = (event:any) => {
      setsortingFilter(event.target.value);
      sortTabledata(searchInput);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const ordersPerPage = 8;
    const pageCount = Math.ceil(orderList.length / ordersPerPage);
  
    const changePage = ({ selected }: { selected: number }) => {
      setPageNumber(selected);
    };
    const pagesVisited = pageNumber * ordersPerPage;
    const startIndex = pageNumber * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
  


  return (
    <div className="orderslist">

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
                        <a className="list-group-item active" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                        <a className="list-group-item" href="reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                        <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                        <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                        <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p>                      </div>
                      </div>
                    </div>
                  </div>
                </nav>
                
              </div>
             

              
              <div className="col-xl-9">

                <div className="card border rounded-3">
                 
                  <div className="card-header border-bottom">
                    <h3 className="mb-0">Order List</h3>
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
                            <th scope="col" className="border-0 rounded-start">Course name</th>
                            <th scope="col" className="border-0">Order ID</th>
                            <th scope="col" className="border-0">Date</th>
                            <th scope="col" className="border-0">Amount</th>
                            <th scope="col" className="border-0 rounded-end">Payment</th>
                          </tr>
                        </thead>

                       
                        <tbody>
                          { (orderList.length === 0) ? 
                              (
                                <tr>
                                  <td className='mt-[15px] text-center w-[100%]' colSpan={5}>No orders made yet</td>
                                </tr>
                              ) 
                              :
                              (
                              orderList.slice(startIndex, endIndex).map((orderitems:any,index)=>{
                                return(
                                  <tr key={index}>
                                    <td>
                                      <h6 className="mt-2 mt-lg-0 mb-0"><a href="#">{orderitems.courseDetails.courseTitle}</a></h6>
                                    </td>
                                    <td className="text-center text-sm-start text-primary-hover">
                                      <a href="#" className="text-body"><u>#{orderitems._id.slice(0, 6)}</u></a>
                                    </td>
                                    <td>{orderitems.orderDate}</td>
                                    <td>${orderitems.courseDetails.price}</td>
                                    <td>{orderitems.paymentType}</td>
                                  </tr>
                                )
                              })
                              )
                          }
                          
                          
                        </tbody>
                       
                      </table>
                     
                    </div>
                    

                  
                      <div className="flex justify-between">
                        <p className="page-item mb-0 active">
                          Showing {pagesVisited + 1} to{" "}
                          {Math.min(
                            pagesVisited + ordersPerPage,
                            orderList.length
                          )}{" "}
                          of {orderList.length} entries
                        </p>
                        <ReactPaginate
                          previousLabel={
                            <RiArrowDropLeftLine className="text-[19px]" />
                          }
                          nextLabel={
                            <RiArrowDropRightLine className="text-[19px]" />
                          }
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName="pagination pagination-sm pagination-primary-soft mb-0 pb-0"
                          activeClassName="active"
                          className="pagination pagination-sm pagination-primary-soft mb-0 pb-0"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          marginPagesDisplayed={1} // Set the number of pages to be displayed before and after the current page
                          pageRangeDisplayed={1} // Set the number of additional pages to display on each side of the current page
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

export default Orderslistbody

