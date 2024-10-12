import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import TeamDetails from './pages/TeamDetails';
import TournamentOrganization from './pages/TournamentOrganization';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const PrivateRoute: React.FC<{ component: React.ComponentType<any>; path: string; exact?: boolean }> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/teams" component={TeamManagement} />
        <PrivateRoute path="/team/:id" component={TeamDetails} />
        <PrivateRoute path="/tournaments" component={TournamentOrganization} />
        <PrivateRoute path="/analytics" component={Analytics} />
        <PrivateRoute path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default App;
