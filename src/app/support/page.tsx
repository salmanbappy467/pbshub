export default function SupportPage() {
  return (
    <div className="container" style={{ padding: '40px 20px', lineHeight: '1.8' }}>
      <style>{`
        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #25D366;
          color: white;
          text-decoration: none;
          padding: 10px 15px;
          border-radius: 6px;
          font-weight: 600;
          margin-top: 15px;
          transition: background-color 0.2s;
        }
        .whatsapp-btn:hover { background-color: #1ebc5a; }
      `}</style>

      <div className="glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px' }}>Support Center</h1>
        <p>Need help? Contact our technical support team.</p>

        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div className="glass-card">
            <h3>Email Support</h3>
            <p>shalmanb@gmail.com</p>
          </div>

          <div className="glass-card">
            <h3>Community Help</h3>
            <div style={{
              border: '1px solid #e0e0e0',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '300px',
              textAlign: 'center',
              margin: '0 auto',
            }}>
              <h3>Need Quick Help?</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Join our community support group for real-time updates and assistance.
              </p>
              <a
                href="https://chat.whatsapp.com/LOOPfcyuOmj1eeERFEwwNy"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <svg width="20" height="20" viewBox="0 0 448 512" style={{ marginRight: '10px', fill: 'white' }} aria-hidden="true">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                Chat Support
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
