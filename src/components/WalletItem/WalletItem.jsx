import s from './WalletItem.module.css';

export const WalletItem = ({ bankName, amount, currency }) => {
  return (
    <li className={s.item}>
      {bankName && <p>{bankName}</p>}
      <p>{amount}</p>
      <p>{currency}</p>
    </li>
  );
};
