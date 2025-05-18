import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/comments/CommentSection';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/post');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/post/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (err) {
      setError('Failed to like post');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Recent Posts</h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          No posts yet. Be the first to create one!
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={post.author.avatar || 'https://via.placeholder.com/40'}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {user && (user._id === post.author._id || user.isAdmin) && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="max-h-96 rounded-lg mb-4"
                />
              )}
              <div className="flex items-center space-x-4 text-gray-500">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center space-x-1 hover:text-blue-500 ${
                    user && post.likes.includes(user._id) ? 'text-blue-500' : ''
                  }`}
                >
                  <span>👍</span>
                  <span>{post.likes.length}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <CommentSection postId={post._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 