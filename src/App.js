import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const EventInfo = lazy(() => import('./pages/EventInfo'));

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/event/:id" component={EventInfo} />
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/create">
            <CreateEvent />
          </ProtectedRoute>
          {/* <ProtectedRoute path="/event/:id">
            <EventInfo />
          </ProtectedRoute> */}
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
