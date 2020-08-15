import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import map from '@highcharts/map-collection/custom/world.geo.json';

HighchartsMap(Highcharts);

const ACTIVE_CASE_PER_RED = 200000;

const getColor = (value: number) => {
  const hue = (1 - (value > 1 ? 1 : value)) * 100;
  return ['hsl(', hue, ',100%,50%)'].join('');
};

export default (props: any) => {
  const getMapData = (items: any[]) => {
    return items.map((item) => {
      return {
        code3: item.countryInfo?.iso3,
        z: item.cases,
        color: getColor(item.active / ACTIVE_CASE_PER_RED),
        iso2: item.countryInfo?.iso2,
      };
    });
  };

  let options = {
    chart: {
      map: map,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: 'Active Cases',
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    series: [
      {
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: false,
      },
      {
        name: 'COVID-19',
        joinBy: ['iso-a3', 'code3'],
        data: getMapData(props.data),
        minSize: 4,
        maxSize: '12%',
        tooltip: {
          pointFormat: '{point.properties.hc-a2}: {point.z}',
        },
      },
    ],
  };

  return (
    <div className={'card col-12'}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={'mapChart'}
      />
    </div>
  );
};
