import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import ProductReducer from "./ProductReducer";
import BrandReducer from "./BrandReducer";
import TestimonialReducer from "./TestimonialReducer";
import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import NewsletterReducer from "./NewsletterReducer";
import ContactusReducer from "./ContactusReducer";

export default combineReducers({
  MaincategoryStateData: MaincategoryReducer,
  SubcategoryStateData: SubcategoryReducer,
  ProductStateData: ProductReducer,
  BrandStateData: BrandReducer,
  TestimonialStateData: TestimonialReducer,
  CartStateData: CartReducer,
  WishlistStateData: WishlistReducer,
  CheckoutStateData: CheckoutReducer,
  NewsletterStateData: NewsletterReducer,
  ContactusStateData: ContactusReducer,
});
