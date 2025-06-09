import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axois  from 'axios'
import { toast } from 'react-toastify';
import { logOut } from '../redux/userSlice';

function Navigation() {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {

    try {
    let res = await axois.post("http://localhost:4000/api/v1/auth/logout")

    console.log("res in lout o",res);
    
    if(res.status == 200)
    {
      toast.success(res.data.message);
      dispatch(logOut());
      navigate('/')
    }
    } catch (error) {
      console.log("error in logout : ",error)
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-4 bg-amber-300 py-3 fixed w-full">
        <Link to='/' className='text-2xl font-bold'>Local Library</Link>
        <div className='flex gap-3'>

          <Link to='/'>Home</Link>
          <Link to='/books'>Books</Link>
          {authUser && (
            <Link to='/dashboard'>DashBoard</Link>
          )
          }


          {!authUser && (
            <>
              <Link to='/register'>SignUp</Link>
              <Link to='/login'>SignIn</Link>
            </>
          )}
          {authUser && (
            <>
              <button
                onClick={() => {
                  handleLogout();
                }}

              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>
    </div>
  );
}

export default Navigation;
