import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SplashPage from './components/SplashPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import SingleUser from './components/User/SingleUser';
import EditUserForm from './components/User/EditUserForm';
import { authenticate } from './store/session';
import { fetchUsers } from './store/user';
import { fetchProjects } from './store/project';
import ProjectsList from './components/Project/ProjectsList';
import SingleProject from './components/Project/SingleProject';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(fetchUsers()))
      .then(() => dispatch(fetchProjects()))
      .then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/welcome' exact={true}>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <SingleUser />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/edit' exact={true} >
          <EditUserForm />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <ProjectsList />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:projectId' exact={true} >
          <SingleProject />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
