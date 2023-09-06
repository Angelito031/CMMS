export const authUserLevel = async (req, res, next) => {
  try {
    const userLevel = await req.user.userLevel;

    if (userLevel !== 1) {
      return res
        .status(400)
        .json({ message: "Not Authorized, Invalid user level" });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "An error has occurred while authenticating your user level",
    });
  }
};
