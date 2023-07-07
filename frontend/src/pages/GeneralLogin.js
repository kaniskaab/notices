import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GeneralNotices = () => {
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    filterNotices();
  }, [notices, searchQuery]);

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notices`, {
        method: 'GET',
      });
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterNotices = () => {
    if (searchQuery) {
      const filtered = notices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.date.includes(searchQuery)
      );
      setNotices(filtered);
    } else {
      fetchNotices();
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleCloseModal = () => {
    setSelectedNotice(null);
  };

  const handleAdminLogin = () => {
    history('/login');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-center text-orange-500">Notices</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleAdminLogin}
          >
            Admin Login
          </button>
        </div>
        <form className="mt-4">
          <input
            type="text"
            placeholder="Search by title, postedBy, or date"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-700 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </form>
        <ul className="mt-4 flex flex-col-reverse">
          {notices.map((notice) => (
            <motion.li
              key={notice.id}
              className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleNoticeClick(notice)}
            >
              <h2 className="text-lg font-bold text-green-500 mb-2">{notice.title}</h2>
              <p className="text-gray-500 mb-2">Posted by: {notice.postedBy}</p>
              <p className="text-gray-500 mb-2">Date: {notice.date}</p>
            </motion.li>
          ))}
        </ul>
        {selectedNotice && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-gray-900 bg-opacity-80 absolute inset-0"></div>
            <motion.div
              className="bg-gray-800 rounded-lg shadow-md p-4 w-4/5 max-w-lg z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-green-500 mb-4">{selectedNotice.title}</h2>
              <p className="text-gray-500 mb-2">Posted by: {selectedNotice.postedBy}</p>
              <p className="text-gray-500 mb-2">Date: {selectedNotice.date}</p>
              <p className="text-gray-400">{selectedNotice.description}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-4"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralNotices;
