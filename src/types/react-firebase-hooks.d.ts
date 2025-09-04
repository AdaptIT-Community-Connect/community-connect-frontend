declare module 'react-firebase-hooks/auth' {
  import { Auth, User } from 'firebase/auth';
  import { UseState } from 'react';

  export function useAuthState(auth: Auth): [User | null | undefined, boolean, Error | undefined];
  export function useCreateUserWithEmailAndPassword(auth: Auth, email: string, password: string): any;
  export function useSignInWithEmailAndPassword(auth: Auth, email: string, password: string): any;
  export function useSignInWithGoogle(auth: Auth): any;
}
