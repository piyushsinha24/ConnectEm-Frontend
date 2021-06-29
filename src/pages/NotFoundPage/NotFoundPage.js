import React from 'react';
import Container from '../../components/common/Container';

const NotFoundPage = () => {
  return (
    <div>
      <Container>
        <div className="font-work p-16 mt-56 w-full h-screen grid place-items-center xl:p-24 xl:mt-0">
          <p className="text-24 font-bold">
            <span className="text-primary-default">404</span> Not Found.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
