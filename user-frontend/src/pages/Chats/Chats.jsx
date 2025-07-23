import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Chats = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          <p className="text-gray-600">Here you will be able to chat with researchers, contributors, or admins.</p>
          {/* Integrate chat system or messages UI here */}
        </main>
      </div>
    </div>
  );
};

export default Chats;
