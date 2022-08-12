import { CardList } from 'components/CardList/CardList';
import { CashList } from 'components/CashList/CashList';
import { TotalList } from 'components/TotalList/TotalList';
export const WalletList = () => {
  return (
    <div>
      <div>
        <h3>Баланс</h3>
        <TotalList />
      </div>
      <div>
        <h3>Готівка</h3>
        <CashList />
      </div>
      <div>
        <h3>Мої картки</h3>
        <CardList />
      </div>
    </div>
  );
};
