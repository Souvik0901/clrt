import React from 'react'

const Sidebar = () => {
  return (
  <div className="list-group list-group-dark list-group-borderless">
    <a className="list-group-item" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
    <a className="list-group-item" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
    <a className="list-group-item" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
    <a className="list-group-item" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
    <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
    <a className="list-group-item" href="review"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
    <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
    <a className="list-group-item" href="payout"><i className="bi bi-wallet2 fa-fw me-2"></i>Payouts</a>
    <a className="list-group-item" href="setting"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
    <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
    <a className="list-group-item text-danger bg-danger-soft-hover" href="signin"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
  </div>

  )
}

export default Sidebar