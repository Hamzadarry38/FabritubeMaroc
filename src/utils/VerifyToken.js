import { jwtDecode } from 'jwt-decode';

const VerifyToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded.isAdmin;
}

export default VerifyToken;
