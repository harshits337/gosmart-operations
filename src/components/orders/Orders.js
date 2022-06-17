import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { orderStateActions } from '../../store';
import { getAllOrders } from './orders.http';

export const Orders = () => {

  const orders = useSelector(state=> state.orderState.orders);
  const dispatch = useDispatch();
  useEffect( ()=>{
    (async () =>{
      let orders = await getAllOrders();
      if(orders.status === 200){
        dispatch(orderStateActions.setOrders(orders.data));
      }
    })();
  },[])

  return (
    <div>Orders</div>
  )
}
