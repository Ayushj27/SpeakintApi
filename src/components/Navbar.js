import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor : '#e3f1ff'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/post" style={{color : '#003372', fontWeight : 'bold'}}>
      Speakint Api
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <a className="nav-link" href="/post" style={{color : '#003372'}}>
            POST
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/get" style={{color : '#003372'}}>
            GET
          </a>
        </li>
        
       
        
      </ul>

    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar