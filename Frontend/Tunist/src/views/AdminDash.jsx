import React from 'react'
import {
    fetchUtils,
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
  } from "react-admin";
  // import { dataProvider } from './dataProvider';
  import simpleRestProvider  from 'ra-data-simple-rest';
  import adminAuth from '../admin components/adminAuth';
import LoginPage from '../admin components/LoginPage';
import {UserList} from '../admin components/users'
import {ArticleList} from '../admin components/articles'
import {AttractionList} from '../admin components/attractions'





//   const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     const token = localStorage.getItem('token');
//     options.headers.set('Authorization', `Bearer ${token}`);
//     return fetchUtils.fetchJson(url, options);
// }
// const dataProvider = simpleRestProvider('http://localhost:8000/api' );

const AdminDash = () => {
  return (
    <div>
        <Admin basename="/admin" loginPage={LoginPage}  authProvider={adminAuth}  dataProvider= {simpleRestProvider('http://localhost:8080/api' )} >
    <Resource name="users" list={UserList} />
    <Resource name="articles" list={ArticleList} />
    <Resource name="attractions" list={AttractionList} />

  </Admin>
        </div>
  )
}

export default AdminDash