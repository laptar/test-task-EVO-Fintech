import { useState } from 'react';

import { AddCard } from 'components/AddCard/AddCard';
import { CardElement } from 'components/CardElement/CardElement';
import { useGetCardsQuery } from 'redux/walletApi';

export const CardEditor = () => {
  const { data: cardList = [] } = useGetCardsQuery();
  const [showAddCard, setShowAddCard] = useState(false);
  const handleTogleAddCard = () => {
    setShowAddCard(prev => !prev);
  };

  return (
    <div>
      {!showAddCard && (
        <button type="button" onClick={handleTogleAddCard}>
          Додати картку
        </button>
      )}
      {showAddCard && <AddCard onTogle={handleTogleAddCard} />}

      <ul>
        {cardList.map(el => (
          <CardElement key={el.id} {...el} />
        ))}
      </ul>
    </div>
  );
};
