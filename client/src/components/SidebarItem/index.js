import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_SIDEBAR } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const SidebarItem = ({ item }) => {

  const [ dispatch ] = useStoreContext();

  const removeFromSidebar = item => {
    dispatch({
      type: REMOVE_FROM_SIDEBAR,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_SIDEBAR,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromSidebar(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;