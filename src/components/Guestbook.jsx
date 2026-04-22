import { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

const STORAGE_KEY = 'p176:guestbook';
const SEED_ENTRIES = [
  { id: 'seed-0', name: 'Visitor', message: 'Cool portfolio!', date: '2026-03-15' }
];

function Guestbook() {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return SEED_ENTRIES;
  });
  const [form, setForm] = useState({ name: '', message: '' });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `u-${Date.now()}`,
      ...form,
      date: new Date().toLocaleDateString(),
      mine: true,
    };
    setEntries([newEntry, ...entries]);
    setForm({ name: '', message: '' });
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <>
      <h5>Guestbook</h5>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control placeholder="Your name" className="mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <Form.Control placeholder="Leave a note!" className="mb-2" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
        <Button type="submit" variant="outline-primary" size="sm">Post</Button>
      </Form>
      <ListGroup variant="flush">
        {entries.map((entry, i) => (
          <ListGroup.Item key={entry.id || i} className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <strong>{entry.name}</strong> <small className="text-muted">· {entry.date}</small>
              <p className="mb-0 small">{entry.message}</p>
            </div>
            {entry.mine && entry.id && (
              <Button
                variant="link"
                size="sm"
                className="text-muted p-0 ms-2 delete-btn"
                onClick={() => handleDelete(entry.id)}
                aria-label="Delete your post"
                title="Delete your post"
              >
                <Trash2 />
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Guestbook;
