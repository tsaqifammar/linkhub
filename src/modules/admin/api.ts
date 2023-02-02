import axios from "@/lib/axios";
import { AnalyticsData } from "./schema";

export async function getAnalytics() {
  return await axios.get<AnalyticsData>("/analytics");
}
