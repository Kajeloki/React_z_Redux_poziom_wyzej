import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = ()=>{
    return async dispatch => {
        const fetchData = async()=>{
            const response = await fetch('https://redux1-5f508-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok)
            throw new Error("Could not fetch data!");

            const data= await response.json();  
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQty: cartData.totalQty
            }))
        }catch(error)
        {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching data failed!'
              }))
        }
    }
}

export const sendCartData = (cart)=>{
    return async (dispatch)=>{
        dispatch(uiActions.setNotification({
            status: 'pending',
            title: 'sending...',
            message: 'Sending cart data!'
          }));
          const sendRequest=async ()=>{
            const response = await fetch('https://redux1-5f508-default-rtdb.firebaseio.com/cart.json',{method: 'PUT', body: JSON.stringify(cart)});
            if(!response.ok){
                throw new Error("Sending data failed");
            }
          }
          try{
            await sendRequest();
            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sending cart data succesfully!'
              }))
          }catch(error)
          {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed!'
              }))
          }
      

    };
}