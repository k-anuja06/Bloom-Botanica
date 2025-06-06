import Wishlist from "../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const alreadyExists = await Wishlist.findOne({ userId, productId });
    if (alreadyExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const wishlistItem = await Wishlist.create({ userId, productId });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    await Wishlist.findOneAndDelete({ userId, productId });
    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id }).populate("productId");
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
