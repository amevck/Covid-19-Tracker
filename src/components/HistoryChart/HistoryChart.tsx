import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export default ({ data }: { data: any }) => {
  const getHistoricalData = (data: any) => {
    const { cases = {}, deaths = {}, recovered = {} } = data;
    const formatedCases: any[] = [];
    const formatedDeaths: any[] = [];
    const formatedRecovered: any[] = [];
    const categeries = Object.keys(cases).map((key) => {
      formatedCases.push(cases[key] || null);
      formatedDeaths.push(deaths[key] || null);
      formatedRecovered.push(recovered[key] || null);
      return key;
    });
    return {
      categeries,
      cases: formatedCases,
      deaths: formatedDeaths,
      recovered: formatedRecovered,
    };
  };

  const trendLine = getHistoricalData(data);

  const options = {
    title: {
      text: '',
    },
    chart: {
      type: 'line',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: trendLine.categeries,
    },
    tooltip: {
      pointFormat: 'Cases: <b>{point.y:.1f}</b>',
    },
    legend: {
      layout: 'horizontal',
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    series: [
      { name: 'Total Cases', data: trendLine.cases, color: 'black' },
      { name: 'Total Deaths', data: trendLine.deaths, color: '#FF0000' },
      { name: 'Total Recovered', data: trendLine.recovered, color: '#5fff00' },
    ],
  };

  return (
    <div className={'card'}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
