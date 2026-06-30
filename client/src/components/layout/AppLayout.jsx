import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: '32px 36px',
        minHeight: '100vh',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
