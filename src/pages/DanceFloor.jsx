import { useState, useEffect, useMemo } from 'react';
import { Search, X, Sparkles, Eye } from 'lucide-react';
import { useCelebrities } from '../context/CelebrityContext';
import IncidentModal from '../components/IncidentModal';
import DanceCharacter from '../components/DanceCharacter';

const AVATAR_COLORS = [
  ['#ff2d95', '#b24bf3'],
  ['#b24bf3', '#00e5ff'],
  ['#00e5ff', '#c6f135'],
  ['#ff6b35', '#ffe156'],
  ['#c6f135', '#00e5ff'],
  ['#ffe156', '#ff2d95'],
  ['#ff2d95', '#ff6b35'],
  ['#b24bf3', '#ff2d95'],
];

const DANCE_MOVES = [
  'dance-bounce',
  'dance-spin',
  'dance-sway',
  'dance-jump',
  'dance-wobble',
  'dance-groove',
];

const PROFESSIONS_EMOJI = {
  Actor: '🎬',
  'Music Artist': '🎤',
  Musician: '🎤',
  Athlete: '⚽',
  Influencer: '📱',
  Billionaire: '💰',
  Popstar: '🌟',
  default: '✨',
};

export default function DanceFloor() {
  const { celebrities, loading } = useCelebrities();
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const celebPositions = useMemo(() => {
    return celebrities.map((celeb, i) => {
      const seed = hashString(celeb.id || celeb.name);
      const cols = Math.ceil(Math.sqrt(celebrities.length + 2));
      const row = Math.floor(i / cols);
      const col = i % cols;
      const cellW = 100 / cols;
      const cellH = 100 / Math.ceil(celebrities.length / cols);

      return {
        ...celeb,
        x: cellW * col + cellW * 0.15 + (seededRandom(seed) * cellW * 0.4),
        y: cellH * row + cellH * 0.1 + (seededRandom(seed + 1) * cellH * 0.4),
        colors: AVATAR_COLORS[i % AVATAR_COLORS.length],
        dance: DANCE_MOVES[i % DANCE_MOVES.length],
        delay: (seededRandom(seed + 2) * 2).toFixed(2),
        charSize: 50 + seededRandom(seed + 3) * 20,
        emoji: PROFESSIONS_EMOJI[celeb.profession] || PROFESSIONS_EMOJI.default,
      };
    });
  }, [celebrities]);

  const filteredCelebs = searchQuery
    ? celebPositions.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : celebPositions;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === '/' && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSelectedCeleb(null);
        setSearchQuery('');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-y2k-pink animate-spin mx-auto mb-3" />
          <p className="text-white/40 font-body text-sm">Loading the party...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Dance floor background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-y2k-darker via-y2k-dark to-y2k-darker" />
        {/* Grid floor */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(178,75,243,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(178,75,243,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'top',
          }}
        />
        {/* Rotating spotlight */}
        <div
          className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 animate-[spotlight_8s_linear_infinite]"
          style={{ background: 'conic-gradient(from 0deg, #ff2d95, #b24bf3, #00e5ff, #c6f135, #ff2d95)' }}
        />
        {/* Disco ball */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_60px_30px_rgba(255,255,255,0.15)] animate-pulse" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-y2k-pink to-y2k-purple flex items-center justify-center shadow-[0_0_20px_rgba(255,45,149,0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold bg-gradient-to-r from-y2k-pink via-y2k-purple to-y2k-cyan bg-clip-text text-transparent leading-tight">
              Not So Innocent
            </h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-body">The Celebrity Dance Floor of Shame</p>
          </div>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-body hover:border-y2k-pink/30 hover:text-white/60 transition-all"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/30 ml-1">/</kbd>
        </button>
      </div>

      {/* Instruction */}
      <div className="relative z-10 text-center mt-1 mb-2">
        <p className="text-white/20 text-xs font-body animate-pulse">
          <Eye className="w-3 h-3 inline mr-1" />
          Click on a character to see their accusations
        </p>
      </div>

      {/* Dance floor with characters */}
      <div className="relative z-10 mx-auto" style={{ width: '92vw', maxWidth: '1100px', height: '68vh', minHeight: '450px' }}>
        {celebPositions.map((celeb) => {
          const isSearchMatch = searchQuery && celeb.name.toLowerCase().includes(searchQuery.toLowerCase());
          const isDimmed = searchQuery && !isSearchMatch;
          const isHovered = hoveredId === celeb.id;
          const incidentCount = celeb.incidents?.length || 0;

          return (
            <div
              key={celeb.id}
              className={`absolute cursor-pointer transition-all duration-500 ${isDimmed ? 'opacity-10 scale-75' : 'opacity-100'} ${isSearchMatch ? 'z-30 scale-110' : ''}`}
              style={{
                left: `${celeb.x}%`,
                top: `${celeb.y}%`,
                animationDelay: `${celeb.delay}s`,
              }}
              onClick={() => setSelectedCeleb(celeb)}
              onMouseEnter={() => setHoveredId(celeb.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Hover glow under character */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full transition-opacity duration-300 ${isHovered || isSearchMatch ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  background: `radial-gradient(circle, ${celeb.colors[0]}30, transparent 70%)`,
                  filter: 'blur(8px)',
                }}
              />

              {/* The dancing character */}
              <DanceCharacter
                name={celeb.name}
                colors={celeb.colors}
                dance={celeb.dance}
                size={celeb.charSize}
                emoji={celeb.emoji}
              />

              {/* Incident count badge */}
              {incidentCount > 0 && (
                <span
                  className="absolute z-20 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  style={{ top: 0, right: -2 }}
                >
                  {incidentCount}
                </span>
              )}

              {/* Name label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                  isHovered || isSearchMatch
                    ? 'opacity-100 bg-black/50 text-white backdrop-blur-sm border border-white/10 shadow-[0_0_10px_rgba(255,45,149,0.2)]'
                    : 'opacity-60 text-white/50'
                }`}
                style={{ bottom: -8 }}
              >
                {celeb.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="glass-card rounded-2xl p-2 shadow-[0_0_60px_rgba(255,45,149,0.2)]">
              <div className="flex items-center gap-3 px-4 py-2">
                <Search className="w-5 h-5 text-y2k-pink" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search celebrities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white text-lg font-body placeholder-white/30 focus:outline-none"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-white/30 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {searchQuery && (
                <div className="border-t border-white/10 mt-1 pt-1 max-h-60 overflow-y-auto">
                  {filteredCelebs.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-white/30 font-body">No one found on the dance floor...</p>
                  ) : (
                    filteredCelebs.map((celeb) => (
                      <button
                        key={celeb.id}
                        onClick={() => {
                          setSelectedCeleb(celeb);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-heading font-bold text-xs"
                          style={{ background: `linear-gradient(135deg, ${celeb.colors[0]}, ${celeb.colors[1]})` }}
                        >
                          {celeb.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-heading font-bold text-white">{celeb.name}</p>
                          <p className="text-xs text-white/40 font-body">{celeb.profession}</p>
                        </div>
                        <div className="text-xs text-y2k-yellow font-bold">
                          {celeb.incidents?.length || 0} incidents
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Incident Modal */}
      {selectedCeleb && (
        <IncidentModal celebrity={selectedCeleb} onClose={() => setSelectedCeleb(null)} />
      )}

      {/* Bottom status bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-y2k-darker/80 backdrop-blur-xl border-t border-white/5 px-6 py-2 flex items-center justify-between">
        <p className="text-[10px] text-white/20 font-body">
          {celebrities.length} celebrities on the floor
        </p>
        <p className="text-[10px] text-white/20 font-body">
          {celebrities.reduce((sum, c) => sum + (c.incidents?.length || 0), 0)} total incidents tracked
        </p>
      </div>
    </div>
  );
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
