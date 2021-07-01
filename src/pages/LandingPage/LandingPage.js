import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import waves from '../../assets/images/waves.svg';
import topSquares from '../../assets/images/top-squares.svg';
import bottomSquares from '../../assets/images/bottom-squares.svg';
import arrowDown from '../../assets/icons/arrowDown.svg';
import { demoPoints } from '../../constants/constants';
import { useRef } from 'react';

function LandingPage() {
  const demoSectionRef = useRef(null);

  const scrollToDemo = () => {
    if (demoSectionRef.current)
      window.scrollTo({
        top: demoSectionRef.current.offsetTop - 72,
        behavior: 'smooth',
      });
  };

  const renderPoints = ({ title, description, imageData }, index) => {
    const direction = index % 2 ? 'xl:flex-row-reverse' : 'xl:flex-row';

    return (
      <div className={`flex justify-between flex-col ${direction}`}>
        <div className="flex-1 xl:py-24 xl:px-36">
          <p className="font-epilogue text-21 font-bold">
            {`${index + 1}. ${title}`}
          </p>
          <p className="font-work mt-8">{description}</p>
        </div>
        <img
          src={imageData}
          className="w-500 border-2 border-light-grey shadow-card rounded-4 mt-16 xl:mt-0"
          alt="demo"
        />
      </div>
    );
  };

  return (
    <div>
      <Container>
        <div className="h-screen flex items-center relative min-h-600 xl:min-h-900">
          <img
            className="w-200 mt-48 absolute left-0 top-0 xl:w-auto"
            src={topSquares}
            alt="top-squares"
          />
          <img
            className="absolute right-0 bottom-0 w-300 xl:w-700"
            src={bottomSquares}
            alt="top-squares"
          />
          <img
            className="absolute right-0 left-2/4 w-24 transform -translate-x-2/4 animate-bounce bottom-24 xl:bottom-32xl:w-36"
            src={arrowDown}
            alt="arrow-down"
          />
          <div className="ml-16 xl:ml-108">
            <div className="flex">
              <div className="font-bold text-dark-default font-epilogue text-36 xl:text-81">
                Connect<span className="text-primary-default">Em</span>
              </div>
              <img className="w-108 ml-4 xl:w-auto" src={waves} alt="waves"></img>
            </div>
            <div className="ml-4 mb-24 font-work text-16 w-260 xl:w-auto xl:font-bold xl:text-21 xl:ml-12 ">
              Your one stop solution for a simple{' '}
              <span className="text-primary-default">Daily Meeting</span> scheduler
            </div>
            <div className="ml-4 xl:ml-12">
              <Link to="/register">
                <Button displayType="primary" className="mr-16">
                  Get Started
                </Button>
              </Link>
              <Button displayType="secondary" onClick={scrollToDemo}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div ref={demoSectionRef} className="px-16 py-24 xl:px-48 xl:py-36">
          <p className="font-epilogue font-bold mb-16 text-24 xl:text-54">
            How it works?
          </p>
          <div className="space-y-36">
            {demoPoints.map((point, index) => renderPoints(point, index))}
          </div>
          <div className="text-center mt-56">
            <p>This is our purpose,</p>
            <p className="font-bold font-epilogue text-center text-24 xl:text-36">
              To Connect <span className="text-primary-default">Them</span>.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
