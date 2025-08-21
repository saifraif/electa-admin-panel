// src/bootstrap/migrateToken.ts
// Ensures any legacy `token` key in localStorage is migrated to `admin_token`
export function migrateTokenKey() {
  const legacyToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin_token");

  if (legacyToken && !adminToken) {
    localStorage.setItem("admin_token", legacyToken);
    localStorage.removeItem("token"); // ✅ remove old key after migration
    console.info("[migrateTokenKey] migrated legacy token to admin_token");
  }
}
