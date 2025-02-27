export default function LogoutPage() {
  localStorage.removeItem("tokenType");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");

  return <div className="card">You have been logged out.</div>;
}
