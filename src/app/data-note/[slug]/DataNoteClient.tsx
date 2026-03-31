'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Category Specific Renderers
import MeterManualLayout from '@/components/notes/MeterManualLayout';
import EquipmentManualLayout from '@/components/notes/EquipmentManualLayout';
import GenericDataNoteLayout from '@/components/notes/GenericDataNoteLayout';

export default function DataNoteClient({ initialNote, slug }: { initialNote: any, slug: string }) {
  const [note, setNote] = useState<any>(initialNote);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(!initialNote);

  const fetchNote = async () => {
    try {
      const res = await fetch(`/api/notes/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setNote(data.note);
      }
    } catch (err) {
      console.error('Failed to fetch note', err);
    }
    setLoading(false);
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (!initialNote) {
      fetchNote();
    }
    fetchUser();
  }, [slug]);

  if (loading) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '20px',
      color: 'var(--text-muted)',
    }}>
      <div className="spinner"></div>
      <p>Loading Technical Data...</p>
    </div>
  );

  if (!note) return (
    <div className="container" style={{ padding: '100px 0', textAlign: 'center', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--primary-accent)' }}>404</h2>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Hub Not Found</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px' }}>
        The technical hub you are looking for might be pending approval or the link is incorrect.
      </p>
      <Link href="/dashboard" className="btn btn-primary" style={{ padding: '12px 30px', borderRadius: '30px' }}>
        Back to Dashboard
      </Link>
    </div>
  );

  const renderLayout = () => {
    switch (note.category) {
      case 'meter-manual':
        return <MeterManualLayout note={note} user={user} onUpdate={fetchNote} />;
      case 'equipment-manual':
        return <EquipmentManualLayout note={note} user={user} onUpdate={fetchNote} />;
      default:
        return <GenericDataNoteLayout note={note} user={user} onUpdate={fetchNote} />;
    }
  };

  return (
    <div className="note-page-wrapper animate-fade" style={{ padding: '20px 0 40px 0' }}>
      {renderLayout()}
    </div>
  );
}
