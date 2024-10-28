import { useCallback, useEffect, useState } from 'react';
import { DashboardNames } from '../models/DataSource1/dashboard-names';
import { getDashboardNamesList } from '../services/data-source1';

export const useGetDashboardNamesList = () => {
  const [dashboardNames, setDashboardNames] = useState<DashboardNames[]>([]);

  const requestDashboardNames = useCallback(() => {
    let ignore = false;
    getDashboardNamesList()
      .then((data) => {
        if (!ignore) {
          setDashboardNames(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestDashboardNames();
  }, [requestDashboardNames]);

  return { requestDataSource1DashboardNames: requestDashboardNames, dataSource1DashboardNames: dashboardNames, setDataSource1DashboardNames: setDashboardNames };
}
