import waves from '../assets/images/waves.svg';
function LandingPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-start">
      <div className="flex">
        <div className="font-bold text-81 text-typography-dark-default font-epilogue mx-56 my-8">
          ConnectEm
        </div>
        <img src={waves} alt="waves"></img>
      </div>
      <div className="text-36 text-primary-dark font-work mx-56">Your one stop</div>
      <div className="text-36 text-primary-dark font-work mx-56">
        for scheduling meeting
      </div>
      <button className="rounded font-bold text-16 text-typography-light-default bg-primary-default hover:shadow-xl hover:bg-primary-dark mx-56 my-16 p-16">
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
