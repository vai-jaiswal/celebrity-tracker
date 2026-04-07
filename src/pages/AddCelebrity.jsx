import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useCelebrities } from '../context/CelebrityContext';

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-y2k-pink/50 focus:shadow-[0_0_15px_rgba(255,45,149,0.15)] transition-all font-body';

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
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-y2k-pink to-y2k-purple shadow-[0_0_30px_rgba(255,45,149,0.4)] mb-4">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-heading font-extrabold bg-gradient-to-r from-y2k-pink via-y2k-purple to-y2k-cyan bg-clip-text text-transparent">
          Add Celebrity
        </h1>
        <p className="text-white/40 text-sm font-body mt-1">Add someone to the watchlist</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-heading font-bold text-white/50 uppercase tracking-wider mb-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-bold text-white/50 uppercase tracking-wider mb-2">Profession</label>
          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
            placeholder="e.g. Actor, Musician, Athlete"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="neon-btn w-full py-3 rounded-xl text-sm font-heading font-bold"
        >
          Add Celebrity
        </button>
      </form>
    </div>
  );
}
