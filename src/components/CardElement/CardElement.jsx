import { useState } from 'react';
import { useDeleteCardsMutation } from 'redux/walletApi';
import { AddCard } from 'components/AddCard/AddCard';
import s from './CardElement.module.css';
export const CardElement = props => {
  const {
    id,
    amount,
    currency,
    cardNumber,
    cardHolder,
    bankName,
    expDate,
    services,
    cardType,
  } = props;
  const [deleteCard] = useDeleteCardsMutation();
  const [showEditCard, setShowAddCard] = useState(false);

  const handleTogleEditCard = () => {
    setShowAddCard(prev => !prev);
  };
  return (
    <li>
      <div className={s.item}>
        <div className={s.card}>
          <div className={s.type}>
            <div>
              <p>{bankName}</p>
              <p>
                {amount} <span>{currency}</span>
              </p>
            </div>
            <div>
              <p>{services}</p>
              <p>{cardType}</p>
            </div>
          </div>
          <div>
            <p>{cardNumber}</p>
            <button>copy</button>
          </div>
          <div>
            <p>{expDate}</p>
            <p>{cardHolder}</p>
          </div>
        </div>
        <div className={s.btnList}>
          <button type="button" onClick={() => deleteCard(id)}>
            Видалити
          </button>
          <button type="button" onClick={handleTogleEditCard}>
            Редагувати
          </button>
        </div>
      </div>
      {showEditCard && <AddCard onTogle={handleTogleEditCard} card={props} />}
    </li>
  );
};
