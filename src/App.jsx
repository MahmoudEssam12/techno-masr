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
import Transitions from "./Components/Transitions/Transitions";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Transitions>
                <Home />
              </Transitions>
            </MainLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <MainLayout>
              <Transitions>
                <Category />
              </Transitions>
            </MainLayout>
          }
        />
        <Route
          path="/categories/:productID"
          element={
            <MainLayout>
              <Transitions>
                <ProductPage />
              </Transitions>
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UnAuth>
              <MainLayout>
                <Transitions>
                  <Login />
                </Transitions>
              </MainLayout>
            </UnAuth>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuth>
              <MainLayout>
                <Transitions>
                  <Register />
                </Transitions>
              </MainLayout>
            </UnAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <OnlyAuthUser>
              <MainLayout>
                <Transitions>
                  <Cart />
                </Transitions>
              </MainLayout>
            </OnlyAuthUser>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
