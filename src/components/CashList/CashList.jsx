import { useGetCashQuery } from 'redux/walletApi';

import { WalletItem } from 'components/WalletItem/WalletItem';
export const CashList = () => {
  const { data: cashList = [] } = useGetCashQuery();

  return (
    <ul>
      {cashList.length ? (
        cashList.map(el => <WalletItem key={el.id} {...el} />)
      ) : (
        <p>Карток немає</p>
      )}
    </ul>
  );
};
