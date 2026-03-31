'use client';
import { useState } from 'react';

interface EditHubModalProps {
  note: any;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditHubModal({ note, onClose, onSaved }: EditHubModalProps) {
  const [form, setForm] = useState({
    title: note.title || '',
    icon: note.icon || '',
    item: note.item || '',
    type: note.type || '',
    details: note.details || '',
    category: note.category || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) return setError('Title is required');
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/notes/${note._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const d = await res.json();
        setError(d.error || 'Failed to save');
      }
    } catch {
      setError('Network error');
    }
    setSaving(false);
  };

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <h3>Edit Hub Info</h3>
          <button className="btn-close-modal" onClick={onClose}>×</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group-custom">
            <label>Title *</label>
            <input className="modal-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Hub title" />
          </div>
          <div className="form-group-custom">
            <label>Icon (emoji or URL)</label>
            <input className="modal-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📟 or https://..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group-custom">
              <label>Item / Model</label>
              <input className="modal-input" value={form.item} onChange={e => set('item', e.target.value)} placeholder="e.g. Hexing HXE310" />
            </div>
            <div className="form-group-custom">
              <label>Type</label>
              <input className="modal-input" value={form.type} onChange={e => set('type', e.target.value)} placeholder="e.g. Single Phase" />
            </div>
          </div>
          <div className="form-group-custom">
            <label>Details</label>
            <textarea className="modal-input" rows={3} value={form.details} onChange={e => set('details', e.target.value)} placeholder="Short description..." style={{ resize: 'vertical' }} />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save-modal" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
