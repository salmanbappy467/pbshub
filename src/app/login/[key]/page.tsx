'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoLoginPage({ params }: { params: Promise<{ key: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attemptLogin = async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: resolvedParams.key }),
        });

        const data = await res.json();
        if (res.ok) {
          router.replace('/dashboard');
        } else {
          setError(data.error || 'Authentication failed');
          setLoading(false);
          // Optionally redirect to login after a short delay
          setTimeout(() => {
            router.replace('/login');
          }, 3000);
        }
      } catch (err) {
        setError('An error occurred during login');
        setLoading(false);
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
      }
    };

    attemptLogin();
  }, [resolvedParams.key, router]);

  return (
    <div className="login-wrapper">
      <div className="login-card glass-card animate-fade">
        <div className="login-header">
           <h1 className="logo-accent">PBS DataHub</h1>
           <p className="login-subtitle">Connect with your PBS network ID</p>
        </div>

        {loading ? (
          <div className="auto-login-status">
            <div className="spinner"></div>
            <p>Authenticating automatically...</p>
          </div>
        ) : (
          <div className="auto-login-status error">
            <p className="error-msg">{error}</p>
            <p className="redirect-msg">Redirecting to login page...</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .login-wrapper {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 48px 32px;
          text-align: center;
          border-radius: 24px;
        }

        .login-header {
          margin-bottom: 32px;
        }

        .logo-accent {
          font-size: 2rem;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .login-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .auto-login-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(59, 130, 246, 0.1);
          border-left-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-msg {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          padding: 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 16px;
          border-left: 3px solid var(--danger);
          width: 100%;
        }

        .redirect-msg {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
