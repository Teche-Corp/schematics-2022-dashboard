import { useState } from 'react';

import Navbar from '@/components/Navbar';
import AdminSibebar from '@/components/AdminSidebar';

export default function DashboardAdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      <AdminSibebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='flex-1 overflow-auto focus:outline-none'>
        <Navbar setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}
