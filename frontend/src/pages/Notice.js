import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy,
          title,
          description,
          date: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      setNotices([...notices, data]);
      setTitle('');
      setDescription('');
      setPostedBy('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/notices/${id}`, {
        method: 'DELETE',
      });
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setShowPopup(true);
  };

  const handleUpdateNotice = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/notices/${editingNotice._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postedBy: editingNotice.postedBy,
            title: editingNotice.title,
            description: editingNotice.description,
            date: editingNotice.date,
          }),
        }
      );
      const data = await response.json();
      const updatedNotices = notices.map((notice) =>
        notice._id === data._id ? data : notice
      );
      setNotices(updatedNotices);
      setEditingNotice(null);
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingNotice(null);
    setShowPopup(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const filterNotices = () => {
    if (searchQuery) {
      const filtered = notices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.date.includes(searchQuery)
      );
      setFilteredNotices(filtered);
    } else {
      setFilteredNotices(notices);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      {location.state ? (
        <div className="w-4/5 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-center text-orange-500">Notices</h1>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate('/')}
            >
              General Notices
            </button>
          </div>
          <form onSubmit={handleCreateNotice} className="mt-2">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <input
                type="text"
                placeholder="Posted By"
                value={postedBy}
                onChange={(e) => setPostedBy(e.target.value)}
                className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-4"
              >
                Create Notice
              </button>
            </div>
          </form>
          <motion.h1
            className="text-4xl font-bold text-center text-orange-500 mb-6 mt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            View and Search Notices
          </motion.h1>
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
            {filteredNotices.map((notice) => (
              <motion.li
                key={notice._id}
                className="bg-gray-800 rounded-lg shadow-md p-4 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-bold text-green-500 mb-2">{notice.title}</h2>
                <p className="text-gray-400 mb-2">{notice.description}</p>
                <p className="text-gray-500 mb-2">Posted by
: {notice.postedBy}</p>
                <p className="text-gray-500 mb-2">Date: {notice.date}</p>
                <div className="flex space-x-2 justify-center" >
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleDeleteNotice(notice._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleEditNotice(notice)}
                  >
                    Edit
                  </button>
                </div>
                {editingNotice?._id === notice._id && showPopup && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="text-lg font-bold mb-2">Edit Notice</h3>
                      <input
                        type="text"
                        placeholder="Title"
                        value={editingNotice.title}
                        onChange={(e) =>
                          setEditingNotice({ ...editingNotice, title: e.target.value })
                        }
                        className="border border-gray-700 rounded-md py-2 px-3 mb-2 w-full"
                      />
                      <textarea
                        placeholder="Description"
                        value={editingNotice.description}
                        onChange={(e) =>
                          setEditingNotice({ ...editingNotice, description: e.target.value })
                        }
                        className="border border-gray-700 rounded-md py-2 px-3 mb-2 w-full"
                      ></textarea>
                      <input
                        type="text"
                        placeholder="Posted By"
                        value={editingNotice.postedBy}
                        onChange={(e) =>
                          setEditingNotice({ ...editingNotice, postedBy: e.target.value })
                        }
                        className="border border-gray-700 rounded-md py-2 px-3 mb-2 w-full"
                      />
                      <div className="flex justify-end">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
                          onClick={handleUpdateNotice}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Login First</div>
      )}
    </div>
  );
};

export default Notices;
