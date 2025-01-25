// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Familjen_Grotesk } from 'next/font/google';
import { useAdmin } from '@/hooks/useAdmin';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

interface AccessCode {
  code: string;
  isUsed: boolean;
  usedBy: string | null;
  expiresAt: Date;
  createdAt: Date;
  attempts: number;
}

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function AdminDashboard() {
  const { logout } = useAdmin();
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filters
  const [filters, setFilters] = useState({
    status: 'all' as 'all' | 'used' | 'available',
    searchQuery: '',
  });
  
  // Generation form state
  const [amount, setAmount] = useState(5);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchCodes();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const session = localStorage.getItem('admin-session');
      const { token } = JSON.parse(session || '{}');

      const response = await fetch(`${API_URL}/admin/codes`, {
        headers: {
          'X-Admin-Token': token
        }
      });

      if (!response.ok) throw new Error('Failed to fetch codes');
      
      const data = await response.json();
      setCodes(data);
      showNotification('success', 'Codes loaded successfully');
    } catch (err) {
      setError('Failed to load access codes');
      showNotification('error', 'Failed to load codes');
    } finally {
      setLoading(false);
    }
  };

  const generateCodes = async () => {
    try {
      setGenerating(true);
      const session = localStorage.getItem('admin-session');
      const { token } = JSON.parse(session || '{}');

      const response = await fetch(`${API_URL}/admin/generate-codes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify({ amount, expiresInDays })
      });

      if (!response.ok) throw new Error('Failed to generate codes');
      
      const newCodes = await response.json();
      setCodes(prevCodes => [...newCodes, ...prevCodes]);
      showNotification('success', `Generated ${amount} new codes`);
    } catch (err) {
      setError('Failed to generate codes');
      showNotification('error', 'Failed to generate codes');
    } finally {
      setGenerating(false);
    }
  };

  const revokeCode = async (code: string) => {
    try {
      const session = localStorage.getItem('admin-session');
      const { token } = JSON.parse(session || '{}');

      const response = await fetch(`${API_URL}/admin/revoke-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) throw new Error('Failed to revoke code');
      
      setCodes(codes.filter(c => c.code !== code));
      showNotification('success', 'Code revoked successfully');
    } catch (err) {
      setError('Failed to revoke code');
      showNotification('error', 'Failed to revoke code');
    }
  };

  const exportCodes = (format: 'csv' | 'json') => {
    try {
      const data = format === 'csv' 
        ? codes.map(code => ({
            Code: code.code,
            Status: code.isUsed ? 'Used' : 'Available',
            UsedBy: code.usedBy || 'N/A',
            ExpiresAt: new Date(code.expiresAt).toLocaleDateString(),
            CreatedAt: new Date(code.createdAt).toLocaleDateString()
          }))
        : codes;

      const blob = new Blob(
        [format === 'csv' ? convertToCSV(data) : JSON.stringify(data, null, 2)],
        { type: format === 'csv' ? 'text/csv' : 'application/json' }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `access-codes.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('success', `Exported codes as ${format.toUpperCase()}`);
    } catch (err) {
      showNotification('error', 'Failed to export codes');
    }
  };

  // Filter and paginate codes
  const filteredCodes = codes.filter(code => {
    if (filters.status !== 'all' && 
        ((filters.status === 'used') !== code.isUsed)) {
      return false;
    }
    
    if (filters.searchQuery && 
        !code.code.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const paginatedCodes = filteredCodes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 p-4 rounded-lg ${
            notification.type === 'success' 
              ? 'bg-green-500/10 border-green-500' 
              : 'bg-red-500/10 border-red-500'
          } border`}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${familjenGrotesk.className}`}>
          Access Code Management
        </h1>
        <div className="flex gap-4">
          <motion.button
            onClick={() => exportCodes('csv')}
            className="px-4 py-2 bg-gray-800 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Export CSV
          </motion.button>
          <motion.button
            onClick={() => exportCodes('json')}
            className="px-4 py-2 bg-gray-800 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Export JSON
          </motion.button>
          <motion.button
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 text-red-500 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500 rounded-lg">
          {error}
        </div>
      )}

      {/* Generate Codes Section */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className={`text-xl font-bold mb-4 ${familjenGrotesk.className}`}>
          Generate New Codes
        </h2>
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-black border border-gray-700 rounded p-2"
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block mb-2">Expires In (Days)</label>
            <input
              type="number"
              value={expiresInDays}
              onChange={(e) => setExpiresInDays(Number(e.target.value))}
              className="bg-black border border-gray-700 rounded p-2"
              min="1"
            />
          </div>
        </div>
        <motion.button
          onClick={generateCodes}
          disabled={generating}
          className="px-6 py-2 bg-[#6FCB71] text-black rounded-full font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {generating ? 'Generating...' : 'Generate Codes'}
        </motion.button>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search codes..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              searchQuery: e.target.value 
            }))}
            className="flex-1 bg-black border border-gray-700 rounded p-2"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              status: e.target.value as 'all' | 'used' | 'available' 
            }))}
            className="bg-black border border-gray-700 rounded p-2"
          >
            <option value="all">All Status</option>
            <option value="used">Used</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      {/* Codes List */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg p-6">
        <h2 className={`text-xl font-bold mb-4 ${familjenGrotesk.className}`}>
          Access Codes ({filteredCodes.length} total)
        </h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {paginatedCodes.map((code) => (
                <div 
                  key={code.code}
                  className="flex justify-between items-center p-4 bg-black rounded-lg"
                >
                  <span className="font-mono">{code.code}</span>
                  <div className="flex items-center gap-4">
                    <span className={code.isUsed ? 'text-red-500' : 'text-green-500'}>
                      {code.isUsed ? 'Used' : 'Available'}
                    </span>
                    <span>
                      Expires: {new Date(code.expiresAt).toLocaleDateString()}
                    </span>
                    <motion.button
                      onClick={() => revokeCode(code.code)}
                      className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Revoke
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {Math.ceil(filteredCodes.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(filteredCodes.length / itemsPerPage)}
                className="px-4 py-2 bg-gray-800 rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function for CSV export
function convertToCSV(data: any[]) {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const rows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] ?? '')
      ).join(',')
    )
  ];
  
  return rows.join('\n');
}