import React from "react";
import { Item } from "./Item";
import styles from './Wallet.module.css';

const Items = (props) => {
  const itemData = props.itemData;
  return (
    <div className={styles.interactionsCard}>
      {itemData.map((oneItem) => {
        return (
          <Item key={oneItem.id} id={oneItem.id} name={oneItem.name} 
                price={oneItem.price} pict={oneItem.pict} contract={props.contract}
                updateBalance={props.updateBalance}></Item>
        );
      })}
    </div>
  );
};

export { Items };