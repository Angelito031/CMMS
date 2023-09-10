import jwt from "jsonwebtoken";

export const setRefreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json({ message: "Invalid account token" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const accessToken = jwt.sign(
      { id: user._id, userLevel: user.userLevel },
      process.env.SECRET
    );
    res.json({ id: user.id, userLevel: user.userLevel, accessToken });
  });
};
