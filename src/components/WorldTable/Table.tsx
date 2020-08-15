import React from 'react';
import BootstrapTable, { SortOrder } from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Flag from './Flag';

type DefaultSorted = {
  dataField: any;
  order: SortOrder;
};
const columns = [
  {
    dataField: 'country',
    text: '',
    sort: true,
    filter: textFilter({ placeholder: 'Country' }),
    formatter: imageFormatter,
  },
  {
    dataField: 'todayCases',
    text: "Today's Cases",
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'cases',
    text: 'Total Cases',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'active',
    text: 'Active Cases',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'recovered',
    text: 'Recovered Cases',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'critical',
    text: 'Critical Cases',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'deaths',
    text: 'Deaths Cases',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'casesPerOneMillion',
    text: 'Cases/ MM',
    sort: true,
    formatter: numberFormatter,
  },
  {
    dataField: 'deathsPerOneMillion',
    text: 'Deaths/ MM',
    sort: true,
    formatter: numberFormatter,
  },
];

const defaultSorted: [DefaultSorted] = [
  {
    dataField: 'cases',
    order: 'desc',
  },
];

function numberFormatter(cell: any) {
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 12,
  }).format(cell);
}

function imageFormatter(cell: any, row: any) {
  return (
    <div>
      <Flag alt={row.country} src={row.countryInfo.flag} />
      &nbsp;&nbsp;
      <strong>{cell}</strong>
    </div>
  );
}

export default ({ data }: { data: any }) => {
  return (
    <div className={'card col-12'}>
      <br />
      <BootstrapTable
        keyField={'country'}
        columns={columns}
        data={data}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        striped
        hover
        wrapperClasses={'table-responsive'}
        condensed
      />
      <br />
    </div>
  );
};
