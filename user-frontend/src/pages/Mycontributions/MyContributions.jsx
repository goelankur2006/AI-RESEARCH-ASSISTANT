import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const MyContribution = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">My Contributions</h2>
          <p className="text-gray-600">This page will show all the papers and comments you've submitted.</p>

        </main>
      </div>
    </div>
  );
};

export default MyContribution;
