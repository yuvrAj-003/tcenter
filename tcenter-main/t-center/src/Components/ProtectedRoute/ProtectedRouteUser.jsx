import { Navigate } from "react-router";
function ProtectedRouteAdmin({children}) {
  const user = JSON.parse(localStorage.getItem('users'));

  if(user?.role === 'user') {
    return children
  }
  else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRouteAdmin;