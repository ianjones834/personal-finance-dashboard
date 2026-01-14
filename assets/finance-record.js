class FinanceRecord {
  static records_list = {};
  static cur_year = 0;
  static cur_month = 0;


  static new_record = (type) => {
    const record = {};
    let id = -1;

    let records = this.get_records_table(type);

    for (const element of $(`#${type}-modal`).find('input,select')) {
      const name = element.id.split('-')[1];

      if (name == 'id') {
        id = element.value;
      }
      else {
        if (element.type === 'number') {
          record[element.id.split('-')[1]] = Number.parseFloat(element.value);
        }
        else {
          record[element.id.split('-')[1]] = element.value;
        }
      }
    }

    if (id == -1) {
      records.push(record);
    }
    else {
      records[id] = record;
    }

    reset_form(type);
    refresh_table(type);
  }

  static edit_record = (type, id) => {
    const record = this.get_records_table(type)[id];
    $(`#${type}-id`).val(id);

    for (const [key, value] of Object.entries(record)) {
      const element = $(`#${type}-${key}`);

      if (element[0].nodeName.toLowerCase() == 'input') {
        element.val(value);
      }
      else if (element[0].nodeName.toLowerCase() == 'select') {
        element.find(`[value=${value}]`).prop('selected', true)
      }
    }

    $(`#${type}-modal`).modal('show');
  };

  static delete_record = (type, id) => {
    let records = this.records_list[this.cur_year][this.cur_month][type];
    let n = records.length;

    for (let i = id + 1; i < n; i++) {
      records[i - 1] = records[i];
    }

    records = records.splice(n - 1);

    refresh_table(type);
  }

  static get_records_table = (table_name) => {
    return this.records_list[this.cur_year][this.cur_month][table_name];
  }

  static new_year = () => {
    const year_val = $('#year').val();
    const year = {};

    for (let i = 0; i < 12; i++) {
      year[i] = { income: [], expenses: [], assets: [], accounts: [], loans: [] };
    }

    this.records_list[year_val] = year;

    $('#year-select').append(`<option value=${year_val} selected>${year_val}</option>`);

    this.cur_year = year_val;

    this.sort_years();
    $('#year-select').trigger('change');
  };

  static export_year = () => {
    const json = JSON.stringify({ year: this.cur_year, data: this.records_list[this.cur_year] });
    const blob = new Blob([json], { type: 'text/string' });
    const download = document.createElement('a');

    download.href = URL.createObjectURL(blob);
    download.download = 'personal_finance_sheet_' + this.cur_year + '.json';
    download.click();

    URL.revokeObjectURL(download.href);
  };

  static import_year = () => {
    const file = $('#import-year')[0].files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const data = JSON.parse(e.target.result);

      if (FinanceRecord.records_list[data.year] === undefined) {
        $('#year-select').append(`<option value=${data.year}>${data.year}</option>`);
      }

      FinanceRecord.records_list[data.year] = data.data;

      this.cur_year = data.year;

      this.sort_years();
      $('#year-select').trigger('change');
    });

    reader.readAsText(file);
  };

  static sort_years = () => {
      const sorted_years = $('#year-select').children().toArray().sort((a, b) => a.value < b.value);
      $('#year-select').html('');
      $('#year-select').append(sorted_years);
      $('#year-select option').prop('selected', false);
      $('#year-select').find(`[value=${this.cur_year}]`).prop('selected', true);
  }
};