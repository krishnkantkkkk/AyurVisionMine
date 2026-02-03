import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Upload, History } from 'lucide-react';
import { UserDataContext } from '../contexts/UserContext';

const Dashboard = () => {
    const {user, diseasesList} = useContext(UserDataContext);
    return (
        <div className="w-full h-full flex flex-col overflow-y-auto pb-10">
            <div className="px-6 md:px-12 pt-8 md:pt-12 pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                            Welcome back, <span className=" text-black">{user.firstName.toUpperCase()}</span>
                        </h1>
                        <p className="text-sm md:text-base text-brand-dark">Track your health journey with AyurVision</p>
                    </div>
                    <Link 
                        to="/user/examine" 
                        className="mt-4 md:mt-0 px-6 py-3  text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-fit hover:scale-105 active:scale-95"
                    >
                        <Upload size={18} />
                        New Analysis
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className=" p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Total Analyses</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">{diseasesList.length||0}</p>
                    <p className="text-xs text-brand-dark mt-2">All time records</p>
                </div>

                <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Recent</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">{0}</p>
                    <p className="text-xs text-brand-dark mt-2">Last analyses</p>
                </div>

                <div className=" p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-brand-darker">Status</h3>
                    </div>
                    <p className="text-3xl font-bold text-brand-text">Active</p>
                    <p className="text-xs text-brand-dark mt-2">Account verified</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 md:px-12 mb-8">
                <h2 className="text-lg font-bold text-brand-text mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                        to="/user/examine"
                        className="p-6 border-2 border-brand-lighter rounded-2xl transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-lighter rounded-lg group-hover:bg-brand-accent group-hover:text-white transition-all">
                                <Upload size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-brand-text">Upload Image</h3>
                                <p className="text-xs text-brand-dark">Analyze a new skin image</p>
                            </div>
                        </div>
                    </Link>

                    <Link 
                        to="/user/history"
                        className="p-6 border-2 border-brand-lighter rounded-2xl transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-lighter rounded-lg group-hover:bg-brand-earth group-hover:text-white transition-all">
                                <History size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-brand-text">View History</h3>
                                <p className="text-xs text-brand-dark">Check past analyses</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;