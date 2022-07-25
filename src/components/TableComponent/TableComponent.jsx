import React, { Component, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { Pagination } from 'react-bootstrap';

const TableComponent = ({ datatable, coltable, key_field }) => {
  return (
    <React.Fragment>
      <BootstrapTable
        bootstrap4
        keyField={key_field}
        pagination={paginationFactory({})}
        filter={filterFactory({})}
        data={datatable}
        columns={coltable}
        striped
        bordered
        hover
      />
      <Pagination size={'sm'} />
    </React.Fragment>
  );
};

export default TableComponent;
