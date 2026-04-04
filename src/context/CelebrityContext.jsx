import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CelebrityContext = createContext();

export function CelebrityProvider({ children }) {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCelebrities();
  }, []);

  async function fetchCelebrities() {
    setLoading(true);
    const { data: celebs } = await supabase
      .from('celebrities')
      .select('*')
      .order('name');

    const { data: incidents } = await supabase
      .from('incidents')
      .select('*')
      .order('date', { ascending: false });

    const merged = (celebs || []).map((c) => ({
      ...c,
      incidents: (incidents || []).filter((i) => i.celebrity_id === c.id),
    }));

    setCelebrities(merged);
    setLoading(false);
  }

  async function addCelebrity(celebrity) {
    const { data, error } = await supabase
      .from('celebrities')
      .insert({ name: celebrity.name, profession: celebrity.profession })
      .select()
      .single();

    if (!error && data) {
      setCelebrities((prev) => [...prev, { ...data, incidents: [] }]);
    }
    return { data, error };
  }

  async function addIncident(celebrityId, incident) {
    const { data, error } = await supabase
      .from('incidents')
      .insert({
        celebrity_id: celebrityId,
        title: incident.title,
        category: incident.category,
        severity: incident.severity,
        status: incident.status,
        verified: incident.verified,
        date: incident.date,
        source: incident.source,
        source_name: incident.sourceName,
        description: incident.description,
      })
      .select()
      .single();

    if (!error && data) {
      setCelebrities((prev) =>
        prev.map((c) =>
          c.id === celebrityId
            ? { ...c, incidents: [data, ...c.incidents] }
            : c
        )
      );
    }
    return { data, error };
  }

  async function updateIncident(celebrityId, incidentId, updates) {
    const { error } = await supabase
      .from('incidents')
      .update(updates)
      .eq('id', incidentId);

    if (!error) {
      setCelebrities((prev) =>
        prev.map((c) =>
          c.id === celebrityId
            ? {
                ...c,
                incidents: c.incidents.map((i) =>
                  i.id === incidentId ? { ...i, ...updates } : i
                ),
              }
            : c
        )
      );
    }
  }

  async function deleteIncident(celebrityId, incidentId) {
    const { error } = await supabase
      .from('incidents')
      .delete()
      .eq('id', incidentId);

    if (!error) {
      setCelebrities((prev) =>
        prev.map((c) =>
          c.id === celebrityId
            ? { ...c, incidents: c.incidents.filter((i) => i.id !== incidentId) }
            : c
        )
      );
    }
  }

  return (
    <CelebrityContext.Provider
      value={{ celebrities, loading, addCelebrity, addIncident, updateIncident, deleteIncident }}
    >
      {children}
    </CelebrityContext.Provider>
  );
}

export function useCelebrities() {
  return useContext(CelebrityContext);
}
