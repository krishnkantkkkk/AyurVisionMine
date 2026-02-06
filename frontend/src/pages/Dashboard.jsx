import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Upload, History } from 'lucide-react';
import { UserDataContext } from '../contexts/UserContext';

const Dashboard = () => {
    const {user, diseasesList} = useContext(UserDataContext);
    return (
        <div className="w-full h-full flex flex-col overflow-y-auto pb-10">
            <div className="px-6 md:px-12 pt-8 md:pt-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                            Welcome back, <span className=" text-black">{user?.firstName?.toUpperCase()}</span>
                        </h1>
                        <p className="text-sm md:text-base text-brand-dark">Track your health journey with AyurVision</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap justify-center sm:justify-start gap-5 px-6 md:px-12 pt-8 md:pt-12">
                <div className="flex flex-col justify-center items-center border border-gray-200 h-50 w-50 md:h-60 md:w-60 p-6 rounded-2xl transition-shadow relative overflow-hidden">
                    <div className="h-full w-1/10 bg-brand-accent absolute top-0 left-0"></div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Total Analyses</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">{diseasesList?.length||0}</p>
                    <p className="text-xs text-brand-dark mt-2">All time records</p>
                </div>

                <div className="flex flex-col justify-center items-center border border-gray-200 h-50 w-50 md:h-60 md:w-60 p-6 rounded-2xl transition-shadow relative overflow-hidden">
                    <div className="h-full w-1/10 bg-brand-accent absolute top-0 left-0"></div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Total Analyses</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">{diseasesList?.length||0}</p>
                    <p className="text-xs text-brand-dark mt-2">All time records</p>
                </div>
                
                <div className="flex flex-col justify-center items-center border border-gray-200 h-50 w-50 md:h-60 md:w-60 p-6 rounded-2xl transition-shadow relative overflow-hidden">
                    <div className="h-full w-1/10 bg-brand-accent absolute top-0 left-0"></div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Status</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">Active</p>
                    <p className="text-xs text-brand-dark mt-2">All time records</p>
                </div>
            </div>

            <div className="px-6 md:px-12 pt-8 md:pt-12 hidden md:block">
                <div className="text-2xl font-bold">RECENT ANALYSES</div>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full h-15 border border-gray-200 rounded-md"></div>
                    <div className="w-full h-15 border border-gray-200 rounded-md"></div>
                    <div className="w-full h-15 border border-gray-200 rounded-md"></div>
                    <div className="w-full h-15 border border-gray-200 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
