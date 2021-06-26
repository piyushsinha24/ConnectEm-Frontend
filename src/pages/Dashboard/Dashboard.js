import React from 'react';
import Container from '../../components/common/Container';
import { useAuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Container>
        <div className="px-16 py-24 mt-56 xl:px-48 xl:py-36 xl:mt-72">
          <p className="font-work">Welcome {user?.firstName},</p>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
