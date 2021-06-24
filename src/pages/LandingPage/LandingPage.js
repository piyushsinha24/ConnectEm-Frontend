import waves from '../../assets/images/waves.svg';
import topSquares from '../../assets/images/top-squares.svg';
import bottomSquares from '../../assets/images/bottom-squares.svg';

function LandingPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-start">
      <img className="w-1/6" src={topSquares} alt="top-squares"></img>
      <div className="flex">
        <div className="font-bold text-81 text-typography-dark-default font-epilogue mx-80 my-32">
          ConnectEm
        </div>
        <img src={waves} alt="waves"></img>
      </div>
      <div className="text-24 text-primary-dark font-work mx-80">Your one stop</div>
      <div className="text-24 text-primary-dark font-work mx-80">
        for scheduling meeting
      </div>
      <button className="rounded font-bold text-16 text-typography-light-default bg-primary-default hover:shadow-xl hover:bg-primary-dark mx-80 my-16 p-16">
        Get Started
      </button>
      <img
        className="w-2/5 absolute bottom-0 right-0"
        src={bottomSquares}
        alt="top-squares"
      ></img>
    </div>
  );
}

export default LandingPage;
