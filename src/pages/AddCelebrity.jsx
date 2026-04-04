import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCelebrities } from '../context/CelebrityContext';

export default function AddCelebrity() {
  const { addCelebrity } = useCelebrities();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addCelebrity({ name: name.trim(), profession: profession.trim() });
    navigate('/');
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Celebrity</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
            placeholder="e.g. Actor, Musician, Athlete"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Add Celebrity
        </button>
      </form>
    </div>
  );
}
