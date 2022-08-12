import { useGetCashQuery, useGetCardsQuery } from 'redux/walletApi';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';

import { WalletItem } from 'components/WalletItem/WalletItem';
export const TotalList = () => {
  const dispatch = useDispatch();

  const { data: cashList = [] } = useGetCashQuery();
  const { data: cardList = [] } = useGetCardsQuery();

  const totalList = Object.entries(
    useMemo(() => {
      if (cashList.length || cardList.length) {
        return [...cashList, ...cardList].reduce((acc, el) => {
          if (acc[el.currency]) {
            acc[el.currency] = acc[el.currency] + Number(el.amount);
            return acc;
          } else {
            acc[el.currency] = Number(el.amount);
            return acc;
          }
        }, {});
      } else {
        return {};
      }
    }, [cashList, cardList])
  );

  return (
    <ul>
      {totalList.length ? (
        totalList.map(el => (
          <WalletItem key={nanoid()} amount={el[1]} currency={el[0]} />
        ))
      ) : (
        <p>Карток немає</p>
      )}
    </ul>
  );
};
