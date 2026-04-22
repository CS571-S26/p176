import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };


  
return (
    <>
      <h5>Send a Message</h5>
      {sent && <Alert variant="success">Message sent! (Demo only)</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="email" placeholder="Your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control as="textarea" rows={3} placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
        </Form.Group>
        <Button type="submit" variant="primary">Send</Button>
      </Form>
    </>
  );
}

export default ContactForm;