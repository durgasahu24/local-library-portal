import React from 'react'
import {Link} from 'react-router-dom'

function Navigation() {
  return (

    <div>
      <nav className="flex justify-between items-center px-4  bg-amber-300 py-3 ">
        <div className="text-lg font-bold">Local Library</div>
        <div className='flex gap-3'>
          <Link to='/'>Home</Link>
          <Link to='/register'>SignUp</Link>
          <Link to='/login'>SignIn</Link>
          <Link to='/dashboard'>DashBoard</Link>
        </div>

      </nav>

    </div>
  )
}

export default Navigation
