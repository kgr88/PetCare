import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    } 
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    } 
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/register', {
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
        setSuccess('Registration successful! You can now log in.');
        // Optionally redirect to login page
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Parse error response
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          const errorMessages = Object.values(parsedError.errors || {}).flat();
          setError(errorMessages.length > 0 ? errorMessages.join(', ') : 'Registration failed.');
        } catch {
          setError(`Registration failed. ${errorData || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="containerbox">
      <h3>Register</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
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
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
        <div>
          <button type="button" onClick={handleLoginClick}>Go to Login</button>
        </div>
      </form>

      {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      {success && <p className="success" style={{color: 'green'}}>{success}</p>}
    </div>
  );
}
