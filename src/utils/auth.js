// Helper function to check user roles
export const checkRole = (user, requiredRole) => {
  return user?.role === requiredRole;
};

// Example usage in components:
// if (!checkRole(currentUser, 'DATA_EDITOR')) { alert('Access denied!'); }
