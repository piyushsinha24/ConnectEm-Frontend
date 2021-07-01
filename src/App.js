import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const EventInfo = lazy(() => import('./pages/EventInfo'));

function App() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/book/:eventId" component={BookingPage} />
          <Route path="/event/:id" component={EventInfo} />
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/create">
            <CreateEvent />
          </ProtectedRoute>
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
