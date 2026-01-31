import GetStartedButton from './GetStartedButton';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <main className="w-full h-full flex flex-col md:flex-row md:mt-0">
      <div className="z-10 w-full md:w-1/2 pt-10 md:pt-20 pl-8 md:pl-16 flex flex-col justify-center min-h-125 md:min-h-150">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-earth bg-clip-text text-transparent block">
            Medical &
          </span>
          <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-earth bg-clip-text text-transparent block">
            Health Care
          </span>
          <span className="text-brand-text block">
            Services
          </span>
        </h1>
        <p className="text-black text-sm md:text-base max-w-md mb-10 leading-relaxed font-normal">
          Online medical consultations with certified medical professionals
        </p>
        <div>
          {localStorage.getItem('isLoggedIn') ? "" : <Link to="/login"><GetStartedButton/></Link>}
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
    </main>
  );
};

export default Hero;
