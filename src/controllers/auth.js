import { registerUser, loginUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { token, user } = await loginUser(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);
  res.status(204).send();
};

export const getCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};
