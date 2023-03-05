import { z } from "zod";

export type AnalyticsData = {
  visitCount: number;
  totalLinkViews: number;
};

export const LinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url(),
  title: z.string().min(1),
  enabled: z.boolean(),
  viewCount: z.number(),
});

export const AppearanceSchema = z.object({
  colorMode: z.string().min(1, "Please select a color mode"),
  linkhubBackgroundColor1: z.string(),
  linkhubBackgroundColor2: z.string().optional(),
  linkhubTextColor: z.string(),
});

export const LinksFormSchema = z.object({
  links: z.array(LinkSchema),
  appearance: AppearanceSchema,
});

export type LinkProps = z.infer<typeof LinkSchema>;
export type AppearanceProps = z.infer<typeof AppearanceSchema>;
export type LinksFormProps = z.infer<typeof LinksFormSchema>;
