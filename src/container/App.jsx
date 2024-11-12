import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../Pages/Home'
import { useDispatch, useSelector } from 'react-redux';
import { InitCanva, init } from '../js/SetupEditor';
import Authorize from '../Pages/Authorize';
import { checkAuthenticated } from '../utils/checkAuthenticated';
import { SetCurrentUserSignIn } from '../Actions/UserAction';





function App() {
  const user = useSelector((state) => state.IUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()



  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design/:link" element={<Home />} />

        <Route path="/Auth" element={<Authorize />} />
        <Route path="*" element={<Error />} />
      </Routes>





    </>
  )
}

export default App
