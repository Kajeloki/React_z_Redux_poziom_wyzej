import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
let initial=true;
function App() {

  const tog = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart)
  const notification= useSelector(state => state.ui.notification)
  const dispatch=useDispatch();
  useEffect(()=>{
    const sendData =async()=>{

      if(initial){
        initial = false;
        return ;
      }
      dispatch(uiActions.setNotification({
        status: 'pending',
        title: 'sending...',
        message: 'Sending cart data!'
      }))
      const response = await fetch('https://redux1-5f508-default-rtdb.firebaseio.com/cart.json',{method: 'PUT', body: JSON.stringify(cart)});
      if(!response){
        dispatch(uiActions.setNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed!'
        }))
      }
      
      dispatch(uiActions.setNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sending cart data succesfully!'
      }))
    }
    sendData();
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
