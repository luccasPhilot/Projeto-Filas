import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import UserPage from './components/UserPage'
import AdminPage from './components/AdminPage'

function App() {
  
  const isAdmin = true; 

  return (
    <Router>
      <Switch>
        <Route exact path="/user">
          <UserPage />
        </Route>
        <Route path="/admin">
          {isAdmin ? <AdminPage /> : <Redirect to="/user" />}
        </Route>
        <Redirect from="/" to="/user" />
      </Switch>
    </Router>
  );
};

export default App;
