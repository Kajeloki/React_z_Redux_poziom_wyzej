import classes from './CartButton.module.css';
import {  useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
const qty = useSelector(state => state.cart.totalQty)
const dipatch = useDispatch();
const toggleHandler = (event)=>{
  event.preventDefault()
  dipatch(uiActions.toggle())
}
  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{qty}</span>
    </button>
  );
};

export default CartButton;
