// pages/auth/signin.tsx
import { getProviders, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

type Props = {
  providers: any;
};

const SignIn = ({ providers }: Props) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sign in with credentials (phone)
    signIn('credentials', { phone, password });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in with Phone</button>
      </form>

      <h3>Or sign in with</h3>
      <div>
        {Object.values(providers).map((provider: any) => {
          if (provider.id !== 'credentials') {
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            );
          }
        })}
      </div>

      <div>
        <h4>Or sign in with Email</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn('email', { email });
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button type="submit">Send magic link</button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
