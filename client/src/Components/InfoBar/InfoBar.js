import React, { useState, useEffect } from 'react';
import InfoItem from '../InfoItem/InfoItem.js';
import css from './InfoBar.module.css';
import { formatToRealCurrency } from '../../Helpers/formatHelpers.js';

export default function InfoBar(props) {
  const { launchCount, launchArray } = props;

  const [currRevenue, setCurrRevenue] = useState(0);
  const [currExpense, setCurrExpense] = useState(0);
  const [currBalance, setCurrBalance] = useState(0);

  useEffect(() => {
    // efeito para atualizar despesa,receita e saldo
    async function expenseSum() {
      let sum = await launchArray.reduce((acc, { type, value }) => {
        if (type === '-') {
          return (acc += value);
        }
        return acc;
      }, 0);

      await setCurrExpense(sum);
    }

    async function revenueSum() {
      let sum = await launchArray.reduce((acc, { type, value }) => {
        if (type === '+') {
          return (acc += value);
        }
        return acc;
      }, 0);
      await setCurrRevenue(sum);
    }

    async function balanceCalc() {
      let balance = currRevenue - currExpense;
      await setCurrBalance(balance);
    }

    expenseSum();
    revenueSum();
    balanceCalc();
  }, [launchArray, currExpense, currRevenue]);

  const changeSaldoColor = () => {
    if (currBalance < 0) {
      return 'var(--red)';
    }
    return 'var(--green)';
  };

  return (
    <div className={[css.flexRow, css.block].join(' ')}>
      <InfoItem label="Lançamentos" value={launchCount} bold={false} />
      <InfoItem
        label="Receitas"
        color="var(--green)"
        value={formatToRealCurrency(currRevenue)}
      />
      <InfoItem
        label="Despesas"
        color="var(--red)"
        value={formatToRealCurrency(currExpense)}
      />
      <InfoItem
        label="Saldo"
        color={changeSaldoColor()}
        value={formatToRealCurrency(Math.abs(currBalance))}
      />
    </div>
  );
}
