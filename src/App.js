import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';
let initial=true;
function App() {

  const tog = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart)
  const notification= useSelector(state => state.ui.notification)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(()=>{
    

      if(initial){
        initial = false;
        return ;
      }
   
     if(cart.changed){
      dispatch(sendCartData(cart));
     }
      
   
  },[cart])
  return (
    <Fragment>
      {notification &&<Notification 
      status={notification.status} 
      title={notification.title}
      message={notification.message}/>}
    <Layout>
      {tog && <Cart />}
      <Products />
    </Layout>
    </Fragment>

  );
}

export default App;
