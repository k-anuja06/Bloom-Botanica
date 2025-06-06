import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/Axios";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const res = await Axios.get("/wishlist");
  return res.data;
});

export const addWishlistItem = createAsyncThunk("wishlist/add", async (productId) => {
  const res = await Axios.post("/wishlist", { productId });
  return res.data;
});

export const removeWishlistItem = createAsyncThunk("wishlist/remove", async (productId) => {
  await Axios.delete(`/wishlist/${productId}`);
  return productId;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId._id !== action.payload);
      });
  }
});

export default wishlistSlice.reducer;
