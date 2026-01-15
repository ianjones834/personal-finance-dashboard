
class FinanceCalculator {
  constructor() {
    this.assets = { ian: 0, marty: 0, shared: 0 };
    this.debts = { ian: 0, marty: 0, shared: 0 };
  }

  get_total_income = () => {
    const income_records = FinanceRecord.get_records_table('income');

    const data = { ian: 0, marty: 0 };

    for (let record of income_records) {
      data[record.person] += record.amount;
    }

    return data;
  }

  get_expenses = () => {
    const expense_records = FinanceRecord.get_records_table('expenses');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of expense_records) {
      if (data[record.person][record.category] === undefined) {
        data[record.person][record.category] = 0;
      }

      data[record.person][record.category] += record.amount;
    }

    return data;
  }

  get_accounts = () => {
    const account_records = FinanceRecord.get_records_table('accounts');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of account_records) {
      if (data[record.person][record.name] === undefined) {
        data[record.person][record.name] = 0;
      }

      data[record.person][record.name] += record.amount;
      this.assets[record.person] += record.amount;
    }

    return data;
  }

  get_assets = () => {
    const assets_records = FinanceRecord.get_records_table('assets');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of assets_records) {
      if (data[record.person][record.name] === undefined) {
        data[record.person][record.name] = 0;
      }

      data[record.person][record.name] += record.amount
      this.assets[record.person] += record.amount;
    }

    return data;
  }

  get_loans = () => {
    const loans_records = FinanceRecord.get_records_table('loans');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of loans_records) {
      if (data[record.person][record.name] === undefined) {
        data[record.person][record.name] = 0;
      }

      data[record.person][record.name] += record.amount;
      this.debts[record.person] += record.amount;
    }

    return data;
  }

  get_combined_asset_totals = () => {
    return {
      ian: this.assets.ian,
      marty: this.assets.marty,
      shared: this.assets.shared,
      combined: this.assets.ian + this.assets.marty + this.assets.shared
    }
  }

  get_combined_debt_totals = () => {
    return {
      ian: this.debts.ian,
      marty: this.debts.marty,
      shared: this.debts.shared,
      combined: this.debts.ian + this.debts.marty + this.debts.shared
    }
  }

  get_net_worth = () => {
    return {
      ian: this.assets.ian - this.debts.ian,
      marty: this.assets.marty - this.debts.marty,
      shared: this.assets.shared - this.debts.shared,
      combined: this.assets.ian + this.assets.marty + this.assets.shared - this.debts.ian - this.debts.marty - this.debts.shared
    }
  }
}