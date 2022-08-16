import { useContext } from 'react';
import { AuthContext } from 'src/context/FirebaseAuthContext';

export const useAuth = () => useContext(AuthContext);
