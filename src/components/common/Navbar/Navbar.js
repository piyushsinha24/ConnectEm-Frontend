import React from 'react';
import Container from '../Container';
import Button from '../Button';
import { useHistory, Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const Navbar = () => {
  const history = useHistory();
  const { logout, isAuthenticated } = useAuthContext();

  return (
    <div className="shadow-md fixed top-0 z-10 left-0 w-full bg-light-bright">
      <Container>
        <div className="font-epilogue flex justify-between items-center h-56 xl:h-72 px-16 xl:px-48">
          <Link to="/">
            <h1 className="font-bold text-16 xl:text-21">
              Connect<span className="text-primary-default">Em</span>
            </h1>
          </Link>
          <div className="flex items-center">
            {isAuthenticated() ? (
              <div className="flex items-center">
                <div className="font-bold underline mr-12 text-12 cursor-pointer xl:text-16 xl:mr-32">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
                <div
                  className="font-bold underline text-12 cursor-pointer xl:text-16"
                  onClick={() => logout()}
                >
                  Logout
                </div>
              </div>
            ) : (
              <>
                <Button
                  displayType="secondary"
                  size="sm"
                  onClick={() => history.push('/register')}
                  className="mr-16"
                >
                  Signup
                </Button>
                <Button
                  displayType="primary"
                  size="sm"
                  onClick={() => history.push('/login')}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
