import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        New Contact Form Submission
      </h1>
      <p style={{ fontSize: '16px', color: '#555' }}>
        You received a new message from your portfolio contact form.
      </p>
      <div style={{ marginTop: '20px' }}>
        <p style={{ margin: '5px 0' }}><strong>Name:</strong> {name}</p>
        <p style={{ margin: '5px 0' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#007bff' }}>{email}</a></p>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '4px' }}>
        <p style={{ margin: '0', fontSize: '16px', color: '#333' }}><strong>Message:</strong></p>
        <p style={{ margin: '10px 0 0', whiteSpace: 'pre-wrap', color: '#555' }}>{message}</p>
      </div>
      <p style={{ marginTop: '30px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        This email was sent from your portfolio website.
      </p>
    </div>
  </div>
);
