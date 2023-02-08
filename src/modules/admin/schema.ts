import { z } from "zod";

export type AnalyticsData = {
  visitCount: number;
  totalLinkViews: number;
};

export const LinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url(),
  title: z.string(),
  enabled: z.boolean(),
  viewCount: z.number().optional(),
});

export const AppearanceSchema = z.object({
  colorMode: z.string(),
  linkhubBackgroundColor1: z.string(),
  linkhubBackgroundColor2: z.string().optional(),
  linkhubTextColor: z.string(),
})
// .refine(({ colorMode, linkhubBackgroundColor2 }) => colo);

export const LinksFormSchema = z.object({
  links: z.array(LinkSchema),
  appearance: AppearanceSchema,
});

export type LinkProps = z.infer<typeof LinkSchema>;
export type AppearanceProps = z.infer<typeof AppearanceSchema>;
export type LinksFormProps = z.infer<typeof LinksFormSchema>;
