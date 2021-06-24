import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <div>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
