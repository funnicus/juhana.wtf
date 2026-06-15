import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';
import type { ThemeSlug } from '$lib/blog/themes';

export const subscriberStatuses = ['pending', 'active', 'unsubscribed'] as const;
export const campaignStatuses = ['draft', 'queued', 'sending', 'sent', 'failed'] as const;
export const deliveryStatuses = ['queued', 'sending', 'sent', 'failed'] as const;

export type SubscriberStatus = (typeof subscriberStatuses)[number];
export type CampaignStatus = (typeof campaignStatuses)[number];
export type DeliveryStatus = (typeof deliveryStatuses)[number];

type Timestamp = ColumnType<Date, Date | string | undefined, Date | string>;
type NullableTimestamp = ColumnType<
	Date | null,
	Date | string | null | undefined,
	Date | string | null
>;

export interface SubscriberTable {
	id: Generated<number>;
	email: string;
	status: SubscriberStatus;
	created_at: Timestamp;
	updated_at: Timestamp;
	confirmed_at: NullableTimestamp;
	confirmation_token_hash: string | null;
	confirmation_expires_at: NullableTimestamp;
	unsubscribe_token_hash: string | null;
}

export interface SubscriberThemePreferenceTable {
	subscriber_id: number;
	theme_slug: ThemeSlug;
	created_at: Timestamp;
}

export interface SubscriberPendingThemePreferenceTable {
	subscriber_id: number;
	theme_slug: ThemeSlug;
	created_at: Timestamp;
}

export interface EmailCampaignTable {
	id: Generated<number>;
	post_slug: string;
	post_theme: ThemeSlug;
	subject: string;
	status: CampaignStatus;
	created_at: Timestamp;
	queued_at: NullableTimestamp;
	sent_at: NullableTimestamp;
}

export interface EmailDeliveryTable {
	id: Generated<number>;
	campaign_id: number;
	subscriber_id: number;
	status: DeliveryStatus;
	attempt_count: Generated<number>;
	claimed_at: NullableTimestamp;
	sent_at: NullableTimestamp;
	provider_message_id: string | null;
	error: string | null;
	created_at: Timestamp;
	updated_at: Timestamp;
}

export interface Database {
	subscribers: SubscriberTable;
	subscriber_theme_preferences: SubscriberThemePreferenceTable;
	subscriber_pending_theme_preferences: SubscriberPendingThemePreferenceTable;
	email_campaigns: EmailCampaignTable;
	email_deliveries: EmailDeliveryTable;
}

export type Subscriber = Selectable<SubscriberTable>;
export type NewSubscriber = Insertable<SubscriberTable>;
export type SubscriberUpdate = Updateable<SubscriberTable>;

export type SubscriberThemePreference = Selectable<SubscriberThemePreferenceTable>;
export type NewSubscriberThemePreference = Insertable<SubscriberThemePreferenceTable>;

export type SubscriberPendingThemePreference = Selectable<SubscriberPendingThemePreferenceTable>;
export type NewSubscriberPendingThemePreference = Insertable<SubscriberPendingThemePreferenceTable>;

export type EmailCampaign = Selectable<EmailCampaignTable>;
export type NewEmailCampaign = Insertable<EmailCampaignTable>;
export type EmailCampaignUpdate = Updateable<EmailCampaignTable>;

export type EmailDelivery = Selectable<EmailDeliveryTable>;
export type NewEmailDelivery = Insertable<EmailDeliveryTable>;
export type EmailDeliveryUpdate = Updateable<EmailDeliveryTable>;
