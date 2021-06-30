import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import waves from '../../assets/images/waves.svg';
import topSquares from '../../assets/images/top-squares.svg';
import bottomSquares from '../../assets/images/bottom-squares.svg';
import arrowDown from '../../assets/icons/arrowDown.svg';

function LandingPage() {
  return (
    <div>
      <Container>
        <div className="h-screen flex items-center relative">
          <img
            className="w-200 xl:w-auto absolute left-0 top-0"
            src={topSquares}
            alt="top-squares"
          />
          <img
            className="absolute right-0 bottom-0 w-300 xl:w-700"
            src={bottomSquares}
            alt="top-squares"
          />
          <img
            className="absolute right-0 left-2/4 bottom-32 w-36 transform -translate-x-2/4 animate-bounce"
            src={arrowDown}
            alt="arrow-down"
          />
          <div className="ml-16 xl:ml-108">
            <div className="flex">
              <div className="font-bold text-dark-default font-epilogue text-36 xl:text-81">
                ConnectEm
              </div>
              <img className="w-108 ml-4 xl:w-auto" src={waves} alt="waves"></img>
            </div>
            <div className="ml-4 mb-24 font-work text-16 w-200 xl:w-auto xl:font-bold xl:text-21 xl:ml-12 ">
              Your one stop to simple{' '}
              <span className="text-primary-default">Daily Meeting</span> scheduler
            </div>
            <div className="ml-4 xl:ml-12">
              <Link to="/register">
                <Button displayType="primary" className="mr-16">
                  Get Started
                </Button>
              </Link>
              <Button displayType="secondary">Learn More</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
