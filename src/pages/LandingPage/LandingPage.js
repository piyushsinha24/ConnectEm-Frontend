import waves from '../../assets/images/waves.svg';
import topSquares from '../../assets/images/top-squares.svg';
import bottomSquares from '../../assets/images/bottom-squares.svg';

function LandingPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-start justify-between">
      <img className="w-1/3 md:w-1/6" src={topSquares} alt="top-squares"></img>
      <div>
        <div className="flex">
          <div className="font-bold text-54 md:text-81 text-typography-dark-default font-epilogue mx-40 md:mx-80">
            ConnectEm
          </div>
          <img
            className="hidden md:block md:w-2/5 lg:w-full"
            src={waves}
            alt="waves"
          ></img>
        </div>
        <div className="mx-48 md:mx-88">
          <div className="text-24 text-primary-dark font-work">Your one stop</div>
          <div className="text-24 text-primary-dark font-work">
            for scheduling meeting
          </div>
        </div>
        <button className="rounded font-bold text-16 text-typography-light-default bg-primary-default shadow-xl hover:bg-primary-dark mx-48 md:mx-88 my-16 p-16">
          Get Started
        </button>
      </div>
      <img
        className="w-2/3 md:w-2/5 self-end"
        src={bottomSquares}
        alt="top-squares"
      ></img>
    </div>
  );
}

export default LandingPage;
