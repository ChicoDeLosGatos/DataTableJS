function DataTableJS(_target, _ajax, _columns, _defs, _options, _legend, _onCreate, _onInit) {
      this.dataTable_target = "#" + _target;
      var tmp_table = null;
      this.createCallback = function (row, data, index) {};
      this.initCallback = function () {};
      this.columnDefinitions = [];
      this.columns = [];
      this.ajax = {};
      this.options = {};

      if (_columns) this.columns = _columns;
      if (_defs) this.columnDefinitions = _defs;
      if (_onCreate) this.createCallback = _onCreate;
      if (_onInit) this.initCallback = _onInit;
      if (_options) this.options = _options;
      if (_ajax) this.ajax = _ajax;


      if (this.options.withButtons == true) {
        tmp_table = $(this.dataTable_target).DataTable({
          scrollY: this.options.scrollY,
          scrollCollapse: this.options.scrollCollapse,
          pageLength: this.options.pageLength,
          language: this.options.lang,
          ajax: this.ajax,
          order: this.options.order,
          columns: this.columns,
          columnDefs: this.columnDefinitions,
          createdRow: this.createCallback,
          dom: 'Blfrtip',
          buttons: [{
              extend: 'excelHtml5',
              exportOptions: {
                columns: ':visible'
              }
            },
            {
              extend: 'csvHtml5',
              exportOptions: {
                columns: ':visible'
              }
            },
          ]

        });
      } else {
        tmp_table = $(this.dataTable_target).DataTable({
          scrollY: this.options.scrollY,
          scrollCollapse: this.options.scrollCollapse,
          pageLength: this.options.pageLength,
          language: this.options.lang,
          ajax: this.ajax,
          order: this.options.order,
          columns: this.columns,
          columnDefs: this.columnDefinitions,
          createdRow: this.createCallback,
        });
      }

      this.table = tmp_table;
      this.legend = _legend;

      $(this.dataTable_target).on('init.dt', this.initCallback);

    }

    DataTableJS.prototype.draw = function () {
      this.table.draw();
    }

    DataTableJS.prototype.filter = function (lbl) {
      this.legend.filter(lbl);
    }

    DataTableJS.prototype.showColumns = function (joined) {
      var cols = [];
      this.columns.foreach(col => cols.push(col.data));
      return (joined) ? cols.join() : cols;
    }

    DataTableJS.prototype.showDefs = function () {
      return this.columnDefinitions;
    }

    DataTableJS.prototype.showCreateCallback = function () {
      return this.createCallback;
    }

    DataTableJS.prototype.showInitCallback = function () {
      return this.initCallback;
    }

    DataTableJS.prototype.showAjax = function () {
      return this.ajax;
    }

    DataTableJS.prototype.showOptions = function () {
      return this.options;
    }

    DataTableJS.prototype.setColumns = function (cols, defs) {
      this.columns = cols;
      this.columnDefinitions = defs;
      this.table.draw();
    }

    DataTableJS.prototype.setCreateCallback = function (callback) {
      this.createCallback = callback;
      this.table.draw();
    }

    DataTableJS.prototype.setInitCallback = function (callback) {
      this.initCallback = callback;
      this.table.draw();
    }

    DataTableJS.prototype.setAjax = function (ajax) {
      this.ajax = ajax;
      this.table.draw();
    }

    DataTableJS.prototype.setAjax = function (options) {
      this.options = options;
      this.table.draw();
    }
