import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    //getting user data from database without password and updatedAt field
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in loginUser: ", err.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("biscuits", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in loginUser: ", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToMOdify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ message: "You cannot follow/unfollow yourself" });

    if (!userToMOdify || !currentUser)
      return res.status(400).json({ message: "User not found" });
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //unfollow user
      // Modify current user following, modify followers of userToModify

      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "user unfollowed successfully" });
    } else {
      //follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "user followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in folloUnFollowUser: ", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, username, email, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found" });
    const { id } = req.params;
    console.log("req.params.id: ", id);
    console.log("userId: ", userId.toString());

    if (id !== userId.toString())
      return res
        .status(400)
        .json({ message: "you cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    res
      .status(200)
      .json({ message: "user profile updated successfully, ", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};

export { signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile };
