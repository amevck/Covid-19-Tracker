import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TileProps } from './interfaces';

export default ({ data }: { data: TileProps }) => {
  const { header, metric, type, daily, dailyIcon } = data;
  return (
    <div className={'card'}>
      <div className={'covid-title'}> {header}</div>
      <div className={'covid-detail'}> {metric}</div>
      <div className={'float-right text-' + type}>
        <FontAwesomeIcon icon={dailyIcon} /> {daily}
      </div>
    </div>
  );
};
