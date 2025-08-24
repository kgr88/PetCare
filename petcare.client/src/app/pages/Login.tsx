import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'rememberme')
      setRememberMe(type === 'checkbox' ? checked : false);
  };

  const handleRegisterClick = () => {
    navigate('/register-page');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // ASP.NET Core Identity API endpoints
      const loginUrl = rememberMe
        ? '/login?useCookies=true'
        : '/login?useSessionCookies=true';

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Success - navigate using React Router
        navigate('/');
      } else {
        // Parse error response
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          const errorMessages = Object.values(parsedError.errors || {}).flat();
          setError(
            errorMessages.length > 0
              ? errorMessages.join(', ')
              : 'Invalid email or password.'
          );
        } catch {
          setError(
            `Login failed. ${errorData || 'Invalid email or password.'}`
          );
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerbox">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="forminput" htmlFor="email">
            Email:
          </label>
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="rememberme"
            name="rememberme"
            checked={rememberMe}
            onChange={handleChange}
            disabled={loading}
          />
          <span>Remember Me</span>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={handleRegisterClick}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
      {error && (
        <p className="error" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
}
