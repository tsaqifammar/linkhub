import axios from "@/lib/axios";
import { AnalyticsData, LinksFormProps } from "./schema";

export async function getAnalytics() {
  return await axios.get<AnalyticsData>("/analytics");
}

export async function updateLinks(data: LinksFormProps) {
  return await axios.put<LinksFormProps & { username: string }>(
    "/links/update",
    data
  );
}

export async function getLinks(username: string) {
  const response = await axios.get<LinksFormProps>(`/links/${username}`);
  const linksFormInfo = response.data;
  return linksFormInfo;
};
