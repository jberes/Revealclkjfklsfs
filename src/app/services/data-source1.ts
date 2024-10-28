import { DashboardNames } from '../models/DataSource1/dashboard-names';
import { FetchApi } from './fetch-api';

const API_ENDPOINT = 'https://localhost:7219';

export async function getDashboardNamesList(): Promise<DashboardNames[]> {
  return await FetchApi.fetchApiResponse<DashboardNames[]>(`${API_ENDPOINT}/dashboards/names`, []);
}
