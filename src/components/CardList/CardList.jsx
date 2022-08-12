import { useGetCardsQuery } from 'redux/walletApi';

import { WalletItem } from 'components/WalletItem/WalletItem';
export const CardList = () => {
  const { data: cardList = [] } = useGetCardsQuery();

  return (
    <ul>
      {cardList.length ? (
        cardList.map(el => <WalletItem key={el.id} {...el} />)
      ) : (
        <p>Карток немає</p>
      )}
    </ul>
  );
};
