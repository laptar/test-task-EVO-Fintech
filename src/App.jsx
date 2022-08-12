import { WalletList } from 'components/WalletList/WalletList';
import { CardEditor } from 'components/CardEditor/CardEditor';
import { CashEditor } from 'components/CashEditor/CashEditor';
// import { AddCard } from 'components/AddCard/AddCard';
// import { AddCash } from 'components/AddCash/AddCash';
export const App = () => {
  return (
    <section>
      <WalletList />
      <CardEditor />
      <CashEditor />
    </section>
  );
};
