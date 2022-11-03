import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import Category from "./Components/Categories/Category";
import ProductPage from "./Components/ProductPage/ProductPage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import OnlyAuthUser from "./guard/OnlyAuthUser";
import MainLayout from "./Layout/MainLayout";
import UnAuth from "./guard/UnAuth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <MainLayout>
              <Category />
            </MainLayout>
          }
        />
        <Route
          path="/categories/:productID"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UnAuth>
              <MainLayout>
                <Login />
              </MainLayout>
            </UnAuth>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuth>
              <MainLayout>
                <Register />
              </MainLayout>
            </UnAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <OnlyAuthUser>
              <MainLayout>
                <Cart />
              </MainLayout>
            </OnlyAuthUser>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
