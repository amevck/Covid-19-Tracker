import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface TileProps {
  header: string;
  metric: number;
  type: string;
  icon: IconProp;
  dailyIcon: IconProp;
  daily: number;
}
