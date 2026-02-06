import GetStartedButton from './GetStartedButton';
import { Link } from 'react-router-dom';
import stoneBlender from '/stoneBlender.png'

const Hero = () => {
  return (
    <main className="w-full h-full flex flex-col md:flex-row md:mt-0">
      <div className="z-10 w-full md:w-1/2 pt-10 md:pt-20 pl-8 md:pl-16 flex flex-col justify-center min-h-125 md:min-h-150">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-shadow-2xs" style={{ WebkitTextStroke: "1px #B2734C" }}>
          <span className="text-brand-accent">
            Medical &
          </span>
          <br />
          <span className="text-brand-accent">
            Health Care
          </span>
          <span className="text-brand-text block" style={{ WebkitTextStroke: "0" }}>
            Services
          </span>
        </h1>
        <p className="text-lg md:text-base max-w-md mb-10 font-normal">
          Machine-learning–based Ayurveda solutions combining ancient wisdom with modern intelligence.
        </p>
        <div>
          {localStorage.getItem('token') ? "" : <Link to="/login"><GetStartedButton/></Link>}
        </div>

      </div>
        <svg 
            className="absolute right-0 top-0 h-full max-w-[80%]" 
            viewBox="0 0 314 458" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            <defs>
                <clipPath id="myClip">
                    <path d="M136.331 458.5H314.331V0H162.831C115.507 80.2155 66.3307 165.5 41.3307 209C-28.3559 328.413 -18.2601 372.741 136.331 458.5Z" />
                </clipPath>
            </defs>
            <rect 
                width="315" 
                height="459" 
                fill="#D4956E"
                clipPath="url(#myClip)"
            />
        </svg>
        <img src={stoneBlender} className='absolute bottom-0 md:top-[15%] right-[15%] max-w-[70%] drop-shadow-xl/25' />
    </main>
  );
};

export default Hero;
