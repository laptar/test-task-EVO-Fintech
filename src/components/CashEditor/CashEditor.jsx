import { useState } from 'react';

import { AddCash } from 'components/AddCash/AddCash';
import { CashElement } from 'components/CashElement/CashElement';
import { CardElement } from 'components/CardElement/CardElement';
import { useGetCashQuery } from 'redux/walletApi';

export const CashEditor = () => {
  const { data: cashList = [] } = useGetCashQuery();
  const [showAddCash, setShowAddCash] = useState(false);
  const handleTogleAddCard = () => {
    setShowAddCash(prev => !prev);
  };

  return (
    <div>
      {!showAddCash && (
        <button type="button" onClick={handleTogleAddCard}>
          Додати картку
        </button>
      )}
      {showAddCash && <AddCash onTogle={handleTogleAddCard} />}

      <ul>
        {cashList.map(el => (
          <CashElement key={el.id} {...el} />
        ))}
      </ul>
    </div>
  );
};
