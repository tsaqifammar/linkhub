import axios from "@/lib/axios";
import { AnalyticsData, LinksFormProps, SettingsProps } from "./schema";

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

export async function incrementLinkView(username: string, index: number, url: string) {
  await axios.put("/analytics/increment-link-view", {
    username,
    index,
    url
  });
}

export async function incrementLinkhubVisit(username: string) {
  await axios.put("/analytics/increment-linkhub-visit", { username });
}

export async function getSettings(username: string) {
  const response = await axios.get<SettingsProps>(`/settings/${username}`);
  const settingsInfo = response.data;
  settingsInfo.name = settingsInfo.name || "";
  return settingsInfo;
}

export async function updateSettings(data: SettingsProps) {
  return await axios.put<SettingsProps>(`/settings/update`, data);
}
