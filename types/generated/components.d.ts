import type { Schema, Struct } from '@strapi/strapi';

export interface PostAds extends Struct.ComponentSchema {
  collectionName: 'components_post_ads';
  info: {
    description: '';
    displayName: 'Ads';
  };
  attributes: {
    title: Schema.Attribute.Text & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PostFirstAdBanner extends Struct.ComponentSchema {
  collectionName: 'components_post_first_ad_banners';
  info: {
    description: '';
    displayName: 'firstAdBanner';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PostParagraph extends Struct.ComponentSchema {
  collectionName: 'components_post_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    ads: Schema.Attribute.Component<'post.ads', true>;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface PostSecondAdBanner extends Struct.ComponentSchema {
  collectionName: 'components_post_second_ad_banners';
  info: {
    description: '';
    displayName: 'secondAdBanner';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'post.ads': PostAds;
      'post.first-ad-banner': PostFirstAdBanner;
      'post.paragraph': PostParagraph;
      'post.second-ad-banner': PostSecondAdBanner;
    }
  }
}
