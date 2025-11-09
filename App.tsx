import React from 'react';
import ReportCard from './components/ReportCard';
import ReportForm from './components/ReportForm';
// import Header from './components/Header';
import { useReportData } from './hooks/useReportData';

const App: React.FC = () => {
  const { data, handleInputChange, reportText } = useReportData();

  return (
    <div className="min-h-screen text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
      

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ReportForm data={data} onInputChange={handleInputChange} />
          
          <div className="lg:sticky top-8 self-start">
             <ReportCard reportText={reportText} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
