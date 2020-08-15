import React, { useEffect, useState, useMemo } from 'react';
import Table from '../WorldTable/Table';
import WorldMap from '../WorldMap/WorldMap';
import Trends from '../HistoryChart/HistoryChart';
import Tiles from '../Tiles/Tiles';
import Select from 'react-select';
import uniqBy from 'lodash/unionBy';
import { Loader } from '../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Dashboard.css';

const BASE_API_URL = 'https://corona.lmao.ninja/v2';
const TABLE_DATA_URL = `${BASE_API_URL}/countries`;
const METRIC_DATA_URL = `${BASE_API_URL}/all`;
const HISTORY_DATA_URL = `${BASE_API_URL}/historical`;
const HISTORY_DATA_ALL_URL = `${HISTORY_DATA_URL}/all`;

const CASHING_PATH = 'covid-19-State';

type CountryOption = {
  value: string;
  label: string;
};

const initialEmptystate = [[], {}, [], []];

export default () => {
  const [table, setTable] = useState<any[]>([]);
  const [metric, setMetric] = useState<any>({});
  const [trend, setTrend] = useState<any[]>([]);
  const [worldTrend, setWorldTrend] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    value: 'World',
    label: 'World',
  });

  useEffect(() => {
    updateWithNewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateWithNewData() {
    setIsLoading(true);
    const [tableRes, metricRes, trendRes, worldTrendRes] = await fetchAllData();
    setTable(tableRes);
    setMetric(metricRes);
    setTrend(trendRes);
    setWorldTrend(worldTrendRes);
    setIsLoading(false);
  }

  async function fetchAllData() {
    try {
      const results: any[] = await Promise.all(
        [
          TABLE_DATA_URL,
          METRIC_DATA_URL,
          HISTORY_DATA_URL,
          HISTORY_DATA_ALL_URL,
        ].map((url) => fetch(url))
      );

      const reponses = await Promise.all(
        results.map((result) => result.json())
      );
      saveResponcesInLocall(reponses);
      return reponses;
    } catch (e) {
      return getResponcesFromLocal();
    }
  }

  const getResponcesFromLocal = () => {
    return localStorage.getItem(CASHING_PATH)
      ? JSON.parse(
          localStorage.getItem(CASHING_PATH) ||
            JSON.stringify(initialEmptystate)
        )
      : initialEmptystate;
  };

  const saveResponcesInLocall = (response: any[]) => {
    localStorage.setItem(CASHING_PATH, JSON.stringify(response));
  };

  const options = useMemo(() => {
    const opt = trend.map((trendForCountry) => {
      return {
        value: trendForCountry.country,
        label: `${trendForCountry.country} `,
      };
    });
    opt.push({ value: 'World', label: 'World' });
    return opt;
  }, [trend]);

  const getTrendForCountry = (country: string) => {
    if (country === 'World') {
      return worldTrend;
    }
    const data = trend.find(
      (trendForCountry) => trendForCountry.country === country
    );
    return data.timeline;
  };

  const getDataForCountry = (country: string) => {
    if (country === 'World') {
      return table;
    }
    const data = table.find(
      (dataForCountry) => dataForCountry.country === country
    );
    return [data];
  };

  const refetchData = isLoading ? (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <FontAwesomeIcon icon={'redo'} onClick={() => updateWithNewData()} />
  );

  const descriptionArea = (
    <div className="left-main-div">
      <div className={'col-12'}>
        <div className="logo">
          <img src="./covid-19-logo.png" alt="" />
        </div>
        <h1 className="h1">
          Corona Virus <span>(COVID-19)</span> Tracker
        </h1>
        <sup className="text-muted">
          {`Last Updated on: ${new Date(metric.updated).toLocaleString()}  `}
          {refetchData}
        </sup>
        <br />
      </div>
      <div className={'col-12 mt-4'}>
        <label>Search country</label>
        <Select
          options={uniqBy(options, 'value')}
          value={selectedCountry}
          //@ts-ignore
          onChange={(selected) => setSelectedCountry(selected)}
        />
      </div>
    </div>
  );

  return table.length > 0 ? (
    <div className={'container-fluid'}>
      <div className={'row viz-padding mt-4'}>
        <div className="dashboard col-md-12 col-lg-3 col-sm-12 pb-3">
          {descriptionArea}
        </div>

        <div className="col-md-12 col-lg-9 col-sm-12">
          <div className={'col-12'}>
            <Tiles
              data={
                selectedCountry.value === 'World'
                  ? metric
                  : getDataForCountry(selectedCountry.value)[0]
              }
            />
          </div>

          <div className="row m-0">
            <div className={'col-sm-12 col-md-12 col-lg-6'}>
              <WorldMap data={getDataForCountry(selectedCountry.value)} />
              <br />
            </div>
            <div className={'col-sm-12 col-md-12 col-lg-6'}>
              <Trends data={getTrendForCountry(selectedCountry.value)} />
              <br />
            </div>
          </div>
        </div>

        <div className={'col-12'}>
          <Table data={table} />
        </div>
      </div>
    </div>
  ) : (
    <Loader></Loader>
  );
};
