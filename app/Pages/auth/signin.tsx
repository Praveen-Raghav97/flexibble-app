// pages/auth/signin.js
import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('linkedin')}>Sign in with LinkedIn</button>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        await signIn('credentials', { email, password });
      }}>
        <input type="text" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
