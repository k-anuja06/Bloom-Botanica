import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

// Lazy load components
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const OtpVerification = lazy(() => import("../pages/OtpVerification"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const UserMenuMobile = lazy(() => import("../pages/UserMenuMobile"));
const Dashboard = lazy(() => import("../layouts/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const MyOrders = lazy(() => import("../pages/MyOrders"));
const Address = lazy(() => import("../pages/Address"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const SubCategoryPage = lazy(() => import("../pages/SubCategoryPage"));
const UploadProduct = lazy(() => import("../pages/UploadProduct"));
const ProductAdmin = lazy(() => import("../pages/ProductAdmin"));
const AdminPermision = lazy(() => import("../layouts/AdminPermision"));
const ProductListPage = lazy(() => import("../pages/ProductListPage"));
const ProductDisplayPage = lazy(() => import("../pages/ProductDisplayPage"));
const CartMobile = lazy(() => import("../pages/CartMobile"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const Success = lazy(() => import("../pages/Success"));
const Cancel = lazy(() => import("../pages/Cancel"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        ),
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "search",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchPage />
                    </Suspense>
                ),
            },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "register",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "forgot-password",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ForgotPassword />
                    </Suspense>
                ),
            },
            {
                path: "verification-otp",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <OtpVerification />
                    </Suspense>
                ),
            },
            {
                path: "reset-password",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ResetPassword />
                    </Suspense>
                ),
            },
            {
                path: "user",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserMenuMobile />
                    </Suspense>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                ),
                children: [
                    {
                        path: "profile",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Profile />
                            </Suspense>
                        ),
                    },
                    {
                        path: "myorders",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <MyOrders />
                            </Suspense>
                        ),
                    },
                    {
                        path: "address",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Address />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'category',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AdminPermision><CategoryPage /></AdminPermision>
                            </Suspense>
                        ),
                    },
                    {
                        path: "subcategory",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AdminPermision><SubCategoryPage /></AdminPermision>
                            </Suspense>
                        ),
                    },
                    {
                        path: 'upload-product',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AdminPermision><UploadProduct /></AdminPermision>
                            </Suspense>
                        ),
                    },
                    {
                        path: 'product',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AdminPermision><ProductAdmin /></AdminPermision>
                            </Suspense>
                        ),
                    }
                ],
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <ProductListPage />
                            </Suspense>
                        ),
                    }
                ],
            },
            {
                path: "product/:product",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductDisplayPage />
                    </Suspense>
                ),
            },
            {
                path: 'cart',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CartMobile />
                    </Suspense>
                ),
            },
            {
                path: "checkout",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CheckoutPage />
                    </Suspense>
                ),
            },
            {
                path: "success",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Success />
                    </Suspense>
                ),
            },
            {
                path: 'cancel',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Cancel />
                    </Suspense>
                ),
            }
        ],
    }
]);

export default router;
