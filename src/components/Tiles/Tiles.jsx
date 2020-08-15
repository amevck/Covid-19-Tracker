import React from 'react';
import Metric from './Tile';

export default ({ data }) => {
  const formatNumber = (num) =>
    new Intl.NumberFormat('en-US', { maximumSignificantDigits: 12 }).format(
      num
    );

  const tiles = [
    {
      header: 'Confirmed',
      metric: formatNumber(data.cases),
      type: 'info',
      icon: 'head-side-virus',
      dailyIcon: 'arrow-alt-circle-up',
      daily: formatNumber(data.todayCases),
    },
    {
      header: 'Recovered',
      metric: formatNumber(data.recovered),
      type: 'success',
      icon: 'head-side-mask',
      dailyIcon: 'ban',
      daily: formatNumber(data.todayRecovered),
    },
    {
      header: 'Active',
      metric: formatNumber(data.active),
      type: 'warning',
      icon: 'head-side-cough',
      dailyIcon: 'procedures',
      daily: formatNumber(data.critical),
    },
    {
      header: 'Death',
      metric: formatNumber(data.deaths),
      type: 'danger',
      icon: 'head-side-cough-slash',
      dailyIcon: 'arrow-alt-circle-up',
      daily: formatNumber(data.todayDeaths),
    },
  ];

  return (
    <div className={'row'}>
      {tiles.map((tile, i) => {
        return (
          <div key={i} className={'col-sm-12 col-md-6 col-lg-3'}>
            <Metric data={tile} />
            <br />
          </div>
        );
      })}
    </div>
  );
};
