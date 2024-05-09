import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home/Home';

import Posts from './Pages/Posts/Posts';
import PostAddForm from './Pages/Posts/PostAddForm'
import EditPostForm from './Pages/Posts/EditPostForm'

import Categories from './Pages/Category/Category';
import CatAddForm from './Pages/Category/CategoryAddForm';
import EditCategoryForm from './Pages/Category/CategoryEdit';
import AddCategoryForm from './Pages/Category/CategoryAddForm'

import ContactUs from './Pages/ContactUs/ContactUs';

import Authors from './Pages/Authors/Authors';
import AuthorAddForm from './Pages/Authors/AuthorAddForm'
import EditAuthorForm from './Pages/Authors/EditAuthorForm'

import Comments from './Pages/Comments/Comments';
import CommentAddForm from './Pages/Comments/CommentAddForm'
import EditCommentForm from './Pages/Comments/EditCommentForm'

import Users from './Pages/Users/Users';
import UserAddForm from './Pages/Users/usersAddForm'
import UserEditForm from './Pages/Users/EditUserForm'

import SignUp from './Pages/SignUp/SignUp'

import Login from './Pages/Login/Login'

import LogOut from './Pages/LogOut/LoginOut'




function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path ="/home" exact element ={<Home/>}></Route>
            
            <Route path ="/categories" exact element ={<Categories/>}></Route>
            <Route path ="/CatAddForm" exact element ={<CatAddForm/>}></Route>
            <Route path ="/EditCategoryForm/:id" exact element ={<EditCategoryForm/>}></Route>
            <Route path ="/CatAddForm" exact element ={<AddCategoryForm/>}></Route>

            <Route path ="/posts" exact element ={<Posts/>}></Route>
            <Route path ="/PostAddForm" exact element ={<PostAddForm/>}></Route>
            <Route path ="/EditPostForm/:id" exact element ={<EditPostForm/>}></Route>
            
            <Route path ="/authors" exact element ={<Authors/>}></Route>
            <Route path ="/AuthorAddForm" exact element ={<AuthorAddForm/>}></Route>
            <Route path ="/editauthorform/:id" exact element ={<EditAuthorForm/>}></Route>

            <Route path ="/contactus" exact element ={<ContactUs/>}></Route>

            <Route path ="/comments" exact element ={<Comments/>}></Route>
            <Route path ="/CommentAddForm" exact element ={<CommentAddForm/>}></Route>
            <Route path ="/editcommentform/:id" exact element ={<EditCommentForm/>}></Route>
            

            <Route path ="/users" exact element ={<Users/>}></Route>
            <Route path ="/UserAddForm" exact element ={<UserAddForm/>}></Route>
            <Route path ="/edituserform/:id" exact element ={<UserEditForm/>}></Route>

            <Route path ="/signup" exact element ={<SignUp/>}></Route>

            <Route path ="/" exact element ={<Login/>}></Route>
            <Route path ="/logout" exact element ={<LogOut/>}></Route>

          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
