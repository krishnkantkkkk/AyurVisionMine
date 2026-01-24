import { ArrowRight } from 'lucide-react';
const GetStartedButton = () => {
  return (
    <>
        <button className="group flex items-center gap-4 bg-brand-accent text-white pl-2 pr-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-accentDark transition-all transform hover:-translate-y-0.5">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <ArrowRight size={16} className="text-brand-accent transition-transform" />
            </div>
            <span className="font-medium text-sm">Get Started</span>
        </button>
    </>
  )
}

export default GetStartedButton