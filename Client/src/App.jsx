// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import About from './pages/About'
// import Signin from './pages/Signin'
// import SignUp from './pages/SignUp'
// import Dashboard from './pages/Dashboard'
// import Projects from './pages/Projects'
// import Home from './pages/Home'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import PrivateRoute from './components/PrivateRoute'

// export default function App() {
//   return (
//     <BrowserRouter >
//      <Header/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/Sign-in' element={<Signin/>}/>
//         <Route path='/Sign-up' element={<SignUp/>}/>
//         <Route element={<PrivateRoute/>}>
//           <Route path='/dashboard' element={<Dashboard/>}/>
//         </Route>
//         <Route element={<OnlyAdminPrivateRoute/>}>
//           <Route path='/create-post' element={<CreatePost/>}/>
//         </Route>
//         <Route path='/projects' element={<Projects/>}/>
//         <Route path='/home' element={<Home/>}/>
//       </Routes>
//       <Footer/>
//     </BrowserRouter>
//   )
// }
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import CreatePost from './pages/CreatePost'
// import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter >
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Sign-in' element={<Signin/>}/>
        <Route path='/Sign-up' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
