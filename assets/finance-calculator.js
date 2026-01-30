
class FinanceCalculator {
  constructor() {
    this.assets = { ian: {start: 0, end: 0}, marty: {start: 0, end: 0}, shared: {start: 0, end: 0}};
    this.debts = { ian: {start: 0, end: 0}, marty: {start: 0, end: 0}, shared: {start: 0, end: 0}};
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
        data[record.person][record.name] = {start: 0, end: 0};
      }

      data[record.person][record.name].start += record.amount;
      data[record.person][record.name].end += record.endamount
      this.assets[record.person].start += record.amount;
      this.assets[record.person].end += record.endamount;
    }

    return data;
  }

  get_assets = () => {
    const assets_records = FinanceRecord.get_records_table('assets');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of assets_records) {
      if (data[record.person][record.name] === undefined) {
        data[record.person][record.name] = {start: 0, end: 0};
      }

      data[record.person][record.name].start += record.amount;
      data[record.person][record.name].end += record.endamount;
      this.assets[record.person].start += record.amount;
      this.assets[record.person].end += record.endamount;
    }

    return data;
  }

  get_loans = () => {
    const loans_records = FinanceRecord.get_records_table('loans');

    const data = { ian: {}, marty: {}, shared: {} };

    for (let record of loans_records) {
      if (data[record.person][record.name] === undefined) {
        data[record.person][record.name] = {start: 0, end: 0};
      }

      data[record.person][record.name].start += record.amount;
      data[record.person][record.name].end += record.endamount;
      this.debts[record.person].start += record.amount;
      this.debts[record.person].end += record.endamount;
    }

    return data;
  }

  get_combined_asset_totals = () => {
    return {
      ian: this.assets.ian,
      marty: this.assets.marty,
      shared: this.assets.shared,
      combined: {
        start: this.sum_obj_cat(this.assets, 'start'),
        end: this.sum_obj_cat(this.assets, 'end')
      }
    }
  }

  get_combined_debt_totals = () => {
    return {
      ian: this.debts.ian,
      marty: this.debts.marty,
      shared: this.debts.shared,
      combined: {
        start: this.sum_obj_cat(this.debts, 'start'),
        end: this.sum_obj_cat(this.debts, 'end')
      }
    }
  }

  get_net_worth = () => {
    return {
      ian: {
        start: this.assets.ian.start - this.debts.ian.start,
        end: this.assets.ian.end - this.debts.ian.end
      },
      marty: {
        start: this.assets.marty.start - this.debts.marty.start,
        end: this.assets.marty.end - this.debts.marty.end,
      },
      shared: {
        start: this.assets.shared.start - this.debts.shared.start,
        end: this.assets.shared.end - this.debts.shared.end
      },
      combined: {
        start: this.sum_obj_cat(this.assets, 'start') - this.sum_obj_cat(this.debts, 'start'),
        end: this.sum_obj_cat(this.assets, 'end') - this.sum_obj_cat(this.debts, 'end')
      }
    }
  }

  sum_obj_cat = (obj, cat) => {
    return Object.entries(obj).reduce((acc, cur) => acc + cur[1][cat], 0);
  }

  static loans_monthly_payments = () => {
    const loan_records = FinanceRecord.get_records_table('loans');

  }
}