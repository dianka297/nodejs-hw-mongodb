export const logoutUserController = async (req, res) => {
  // JWT logout is usually handled on the client or with token blacklists
  res.json({ message: 'Logout successful' });
};