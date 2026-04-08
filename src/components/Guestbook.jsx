import { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function Guestbook() {
  const [entries, setEntries] = useState([
    { name: 'Visitor', message: 'Cool portfolio!', date: '2026-03-15' }
  ]);
  const [form, setForm] = useState({ name: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([{ ...form, date: new Date().toLocaleDateString() }, ...entries]);
    setForm({ name: '', message: '' });
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
          <ListGroup.Item key={i}>
            <strong>{entry.name}</strong> <small className="text-muted">· {entry.date}</small>
            <p className="mb-0 small">{entry.message}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Guestbook;