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
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromSidebar(item)}
          >
            Remove from your list
          </span>
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;