import path from "./ultils/path";
import { Route, Routes } from 'react-router-dom'
import { Public, Home, Login, Detail, Filter, RegisterResult, ResetPass, ForgotPass, CatalogDetail } from './pages/public'
import { Personal, Smember, BuyHistory, Wishlist, ChangePass, Order } from "./pages/smember";
import { System, ManageBrand, ManageCoupon, ManageProduct, ManageUser, Statitics, ManageBill } from "./pages/private";
import { Alert, Cart, Loading } from "./components";
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import actionTypes from "./store/actions/actionTypes";
import { ToastContainer } from 'react-toastify'


function App() {

  const dispatch = useDispatch()
  const { alert, isShowCart, isLoading } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(actions.getCatalogs())
    dispatch(actions.getBrands())
  }, [])


  return (
    <div className="relative h-screen">
      {alert && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Alert />
      </div>}
      {isLoading && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Loading />
      </div>}
      {isShowCart && <div
        className="fixed w-screen z-[1000] h-screen bg-overlay-70 flex justify-end"
        onClick={() => dispatch({ type: actionTypes.SHOW_CART, flag: false })}
      >
        <div
          className="bg-white shadow-lg w-[550px] animate-slide-left "
          onClick={e => e.stopPropagation()}
        >
          <Cart />
        </div>
      </div>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.SMEMBER} element={<Smember />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.BUY_HISTORY} element={<BuyHistory />} />
            <Route path={path.WISHLIST} element={<Wishlist />} />
            <Route path={path.CHANGE_PASS} element={<ChangePass />} />
            <Route path={path.BUY} element={<Order />} />
          </Route>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.RESET_PASS} element={<ResetPass />} />
          <Route path={path.FORGOT_PASS} element={<ForgotPass />} />
          <Route path={path.CATALOG__PR} element={<CatalogDetail />} />
          <Route path={path.FILTER} element={<Filter />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER_RS} element={<RegisterResult />} />
          <Route path={path.DETAIL} element={<Detail />} />
          <Route path={'*'} element={<Home />} />
        </Route>

        {/* Private routes */}
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.MANAGE_BRAND} element={<ManageBrand />} />
          <Route path={path.MANAGE_COUPON} element={<ManageCoupon />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.STATITICS} element={<Statitics />} />
          <Route path={path.MANAGE_Bill} element={<ManageBill />} />
          <Route path={'*'} element={<ManageProduct />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div >
  );
}

export default App;
