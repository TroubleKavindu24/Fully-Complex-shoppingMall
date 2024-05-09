import "./App.css";
import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  useState,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { CartProvider } from "react-use-cart";
import SignIn from "./screen/user-management/Signin";
import Signup from "./screen/user-management/SignUp";
import ProfilePage from "./components/ProfilePage";
import { initialState, reducer } from "../src/components/reducers/userReducer";
/*
  Dashboards
*/
import { CustomerDashBoard } from "./screen/dashboard/CustomerDashBoard";
import AdminDashboard from "./screen/dashboard/AdminDashboard";
import SellerDashboard from "./screen/dashboard/SellerDashboard";

/*
  customer pages
*/
import Home from "./screen/customer/home";
import Login from "./screen/customer/login";
import Register from "./screen/customer/register";
import Profile from "./screen/customer/profile";

/*
  shop pages 
*/
import ShopPage from "./components/ShopPage";

/*
  shop pages
  permanent shop pages
*/
import PermanentShopDashboard from "./screen/shop/permanent_shop/ShopTable";
import PermenentShopHome from "./screen/shop/permanent_shop/shop";
import PermenentsPage from "./components/PermenentsPage";

/*
  shop pages
  temporary shop pages
*/
import TemporaryShopDashboard from "./screen/shop/temporary_shop/ShopTable";
import TemporaryShopHomePage from "./screen/shop/temporary_shop/ShopList";

/*
  seller pages
*/
import SellerTable from "./screen/seller/SellerTable";
import SellerForm from "./screen/seller/sellerForm";

/*
  Stall seeker pages
*/
import StallSeekerTable from "./screen/stallSeeker/StallSeekerTable";

/*
  cart pages
*/
import CartViewPage from "./components/CartViewPage";

/*
  Event pages
*/
import InteractiveMallEventDashboard from "./screen/event/eventTable";
import InteractiveMallEventHomePage from "./screen/event/eventList";

/*
  item pages
*/
import ItemHome from "./screen/shop/ItemTable";
import ItemView from "./screen/item/ItemView";
import HomePage from "./components/Home";

import CardDeals from "./components/CardDeals";
import OrderPage from "./components/OrderPage";
import HomeOrder from "./screen/order-Management/HomeOrder";
import EditOrder from "./screen/order-Management/EditOrder";
import OrderPost from "./screen/order-Management/OrderPost";
import OrderReport from "./screen/order-Management/OrderReport";
import MeetAtMallPage from "./components/MeetAtMallPage";
import GridPage from "./components/GridPage";
import Stall from "./BookAStall/Stall";
import TemporaryPage from "./components/TemporaryShop";
import Grid from "./BookAStall/Grid";
import MeetAtMallHome from "./MeetAtMall/MeetAtMallHome";
import HomeProductShops from "./screen/cart/HomeProductShops";
import BookAStallHome from "./BookAStall/BookAStallHome";

export const UserContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(UserContext);
  return state ? children : <Navigate to="/signin" />;
};

const AuthChecker = ({ children }) => {
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or another suitable placeholder
  }

  return state ? children : <Navigate to="/signin" />;
};

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);
  return (
    <Routes>
       <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/slider" element={<CardDeals />} />
      <Route path="/customer" element={<CustomerDashBoard />} />
      <Route path="/shop_dashboard" element={<PermenentShopHome />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartViewPage />} />
      <Route path="/order/home" element={<HomeOrder />} />
      <Route path="/order/update/:id" element={<EditOrder />} />
      <Route path="/order/post/:id" element={<OrderPost />} />
      <Route path="/order/report" element={<OrderReport />} />
      <Route path="/shop/:id" element={<HomeProductShops />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/order" element={<OrderPage />} />
      <Route
        path="/meetAtMall"
        element={
          <ProtectedRoute>
            <MeetAtMallPage />
          </ProtectedRoute>
        }
      />
      <Route path="/gridPage" element={<GridPage />} />
      <Route path="/grid" element={<Grid />} />
      <Route path="/stall" element={<Stall />} />
      <Route path="/permenentshop" element={<PermenentShopHome />} />
      <Route path="/permenentshop_table" element={<PermanentShopDashboard />} />
      <Route path="/permenentshop_home" element={<PermenentsPage />} />
      <Route path="/temporyshop_table" element={<TemporaryShopDashboard />} />
      <Route path="/temporyshop_home" element={<TemporaryPage />} />
      <Route path="/seller_table" element={<SellerTable />} />
      <Route path="/add_seller" element={<SellerForm />} />
      <Route path="/stallseeker_table" element={<StallSeekerTable />} />
      <Route path="/event_table" element={<InteractiveMallEventDashboard />} />
      <Route path="/event_home" element={<InteractiveMallEventHomePage />} />
      <Route path="/item_table" element={<ItemHome />} />
      <Route path="/item/:id" element={<ItemView />} />
      <Route path="/meetAtMallHome" element={<MeetAtMallHome />} />
      <Route path="/bookAStallHome" element={<BookAStallHome />} />
    </Routes>
  );
};

/**
 * main application function
 * @returns App
 */
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <CartProvider>
            <main className="App">
              {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/slider" element={<CardDeals />} />
                <Route path="/customer" element={<CustomerDashBoard />} />
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                <Route path="/shop_dashboard" element={<PermenentShopHome />} />
                <Route path="/order" element={<CreateOrders />} />
                <Route path="/order/home" element={<HomeOrder />} />
                <Route path="/order/update/:id" element={<EditOrder />} />
                <Route path="/order/post/:id" element={<OrderPost />} />
                <Route path="/order/report" element={<OrderReport />} />
                <Route path="/meetAtMall" element={<MeetAtMall />} />
                <Route path="/grid" element={<Grid />} />
                <Route path="/stall" element={<Stall />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/shop" element={<ShopHomePage />} />

                <Route path="/permenentshop" element={<PermenentShopHome />} />
                <Route
                  path="/permenentshop_table"
                  element={<PermanentShopDashboard />}
                />
                <Route
                  path="/permenentshop_home"
                  element={<PermanentShopHomePage />}
                />

                <Route
                  path="/temporyshop_table"
                  element={<TemporaryShopDashboard />}
                />
                <Route
                  path="/temporyshop_home"
                  element={<TemporaryShopHomePage />}
                />

                <Route path="/seller_table" element={<SellerTable />} />
                <Route path="/add_seller" element={<SellerForm />} />

                <Route
                  path="/stallseeker_table"
                  element={<StallSeekerTable />}
                />

                <Route
                  path="/event_table"
                  element={<InteractiveMallEventDashboard />}
                />
                <Route
                  path="/event_home"
                  element={<InteractiveMallEventHomePage />}
                />

                <Route path="/item_table" element={<ItemHome />} />

                <Route path="/item/:id" element={<ItemView />} />

                <Route path="/cart" element={<CartPage />} />
              </Routes> */}
              <Routing />
            </main>
          </CartProvider>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
