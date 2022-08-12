import { useState } from 'react';
import { useDeleteCashMutation } from 'redux/walletApi';
import { AddCard } from 'components/AddCard/AddCard';
import { AddCash } from 'components/AddCash/AddCash';
import s from './CashElement.module.css';
export const CashElement = props => {
  const { id, amount, currency } = props;
  const [deleteCash] = useDeleteCashMutation();
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
              <p>
                {amount} <span>{currency}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={s.btnList}>
          <button type="button" onClick={() => deleteCash(id)}>
            Видалити
          </button>
          <button type="button" onClick={handleTogleEditCard}>
            Редагувати
          </button>
        </div>
      </div>
      {showEditCard && <AddCash onTogle={handleTogleEditCard} cash={props} />}
    </li>
  );
};
