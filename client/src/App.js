import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/authentication/SingIn';
import SignUp from './components/authentication/SingUp';
import SingUpEmailChecker from './components/authentication/SingUpEmailChecker';
import ManageCategory from './components/dashboard/administrator/Managecategory';
import ManageContent from './components/dashboard/administrator/ManageContent';
import ManageProject from './components/dashboard/administrator/ManageProject';
import ManageSubCategory from './components/dashboard/administrator/Managesubcategory';
import SingleSubCategory from './components/dashboard/administrator/subcategory/SingleSubCategory';
import UserList from './components/dashboard/administrator/UserList';
import Content from './components/dashboard/Content';
import DashboardMain from './components/dashboard/Dashboard.main';
import Paperbase from './components/dashboard/Paperbase';
import ContentGenerate from './components/dashboard/regulerUsers/ContentGenerate';
import CreateProject from './components/dashboard/regulerUsers/CreateProject';
import Subcategory from './components/dashboard/regulerUsers/Subcategory';
import UserProfile from './components/dashboard/regulerUsers/UserProfile';
import UserProject from './components/dashboard/regulerUsers/UserProject';
import ManageProjectDetails from './components/ManageProjectDetails';
import Home from './components/pages/Home';
import useAuthCheck from './hooks/useAuthCheck';
import AdminRoute from './PrivateRoute/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {

   const authChecked = useAuthCheck();

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signUp/verify" element={<SingUpEmailChecker />} />

            <Route path="dashboard" element={
               <PrivateRoute>
                  <Paperbase />
               </PrivateRoute>
            }>
               <Route path='' element={
                  <PrivateRoute>
                     <DashboardMain />
                  </PrivateRoute>
               } />
               <Route path='sub_category/:categoryId/:index' element={
                  <PrivateRoute>
                     <Subcategory />
                  </PrivateRoute>
               }
               />
               <Route path='sub_category/:categoryId/:index/create_project' element={
                  <PrivateRoute>
                     <CreateProject />
                  </PrivateRoute>
               } />
               <Route path='content_generate/:id' element={
                  <PrivateRoute>
                     <ContentGenerate />
                  </PrivateRoute>} />
               <Route path='write_content' element={
                  <AdminRoute>
                     <Content />
                  </AdminRoute>
               }
               />
               <Route path='manage_category' element={
                  <AdminRoute>
                     <ManageCategory />
                  </AdminRoute>
               } />
               <Route path='manage_category/:id' element={
                  <AdminRoute>
                     <ManageSubCategory />
                  </AdminRoute>
               } />

               <Route path='manage_category/sub_category/:categoryId/:index' element={
                  <AdminRoute>
                     <SingleSubCategory />
                  </AdminRoute>
               } />

               <Route path='user_list' element={
                  <AdminRoute>
                     <UserList />
                  </AdminRoute>
               } />

               <Route path='manage_project' element={
                  <AdminRoute>
                     <ManageProject />
                  </AdminRoute>
               } />
               <Route path='manage_project/:id' element={
                  <AdminRoute>
                     <ManageProjectDetails />
                  </AdminRoute>
               } />
               <Route path='manage_content' element={
                  <AdminRoute>
                     <ManageContent />
                  </AdminRoute>
               } />

               <Route path='user_list/profile' element={
                  <PrivateRoute>
                     <UserProfile />
                  </PrivateRoute>
               } />

               <Route path='profile/project/:id' element={
                   <PrivateRoute>
                     <UserProject />
                  </PrivateRoute>
               } />



            </Route>
         </Routes>
      </div>)
}

export default App;
