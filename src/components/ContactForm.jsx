import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Send } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdqpgzb';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const sending = status === 'sending';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <h5>Send a Message</h5>
      {status === 'success' && (
        <Alert variant="success" dismissible onClose={() => setStatus('idle')}>
          Thanks, your message was sent! I'll get back to you soon.
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="danger" dismissible onClose={() => setStatus('idle')}>
          Something went wrong sending your message. You can email me directly at{' '}
          <a href="mailto:jatinuppal55@gmail.com">jatinuppal55@gmail.com</a>.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            disabled={sending}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            disabled={sending}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            disabled={sending}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={sending}>
          {sending ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Sending…
            </>
          ) : (
            <>
              Send <Send size={16} className="ms-1" />
            </>
          )}
        </Button>
      </Form>
    </>
  );
}

export default ContactForm;
