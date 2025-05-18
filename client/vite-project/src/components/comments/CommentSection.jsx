import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comment/${postId}`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch comments');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/comment',
        {
          content: newComment,
          postId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading comments...</div>;
  }

  return (
    <div className="mt-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Comment
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img
                src={comment.author.avatar || 'https://via.placeholder.com/32'}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{comment.author.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              {user && (user._id === comment.author._id || user.isAdmin) && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="ml-auto text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 