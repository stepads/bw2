export interface MetaAdsRecord {
  account_name: string;
  action_values_omni_purchase: number | null;
  actions_add_to_cart: number | null;
  actions_initiate_checkout: number | null;
  actions_offsite_conversion_fb_pixel_purchase: number | null;
  actions_video_view: number | null;
  ad_name: string;
  adset_name: string;
  campaign: string;
  cpc: number | null;
  cpm: number | null;
  datasource: string;
  date: string;
  impressions: number | null;
  link_clicks: number | null;
  source: string;
  spend: number | null;
  thumbnail_url: string | null;
  video_avg_time_watched_actions_video_view: number | null;
  video_continuous_2_sec_watched_actions_video_view: number | null;
  video_p25_watched_actions_video_view: number | null;
  video_p50_watched_actions_video_view: number | null;
  video_p75_watched_actions_video_view: number | null;
  video_p100_watched_actions_video_view: number | null;
  video_play_actions_video_view: number | null;
  video_thruplay_watched_actions_video_view: number | null;
  website_ctr_link_click: string | null;
  website_purchase_roas_offsite_conversion_fb_pixel_purchase: number | null;
}

export interface KPIData {
  roas: number;
  purchases: number;
  investment: number;
  impressions: number;
  frequency: number;
  ctr: number;
  costPerPurchase: number;
}

export interface WeeklyData {
  week: string;
  spend: number;
  revenue: number;
  roas: number;
}

export interface RetentionPoint {
  label: string;
  percentage: number;
  absolute: number;
}

export interface CreativeData {
  ad_name: string;
  adset_name: string;
  campaign: string;
  thumbnail_url: string | null;
  spend: number;
  roas: number;
  purchases: number;
  ctr: number;
  cpm: number;
  cpc: number;
  impressions: number;
}
