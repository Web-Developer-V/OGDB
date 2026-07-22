// export type PlatformsListType = {
//   id: string;
//   abbreviation: string;
//   alternative_name: string;
//   created_at: number;
//   generation: number;
//   name: string;
//   platform_logo: {
//     id: string;
//     image_id: string;
//   };
//   slug: string;
//   updated_at: number;
//   url: string;
// };

export type PlatformsListType = {
  id: number;
  slug: string;
  name: string;
  summary?: string;

  platform_logo: {
    id: number;
    image_id: string;
    width: number;
    height: number;
  };

  platform_family?: {
    name: string;
  };

  versions: {
    id: number;
    name: string;
    slug: string;
    summary?: string;
    url?: string;
    platform_version_release_dates: {
      id: number;
      date: number;
      release_region: {
        region: string;
      };
    }[];

    platform_logo: {
      image_id: string;
      width: number;
      height: number;
    };
  }[];
};

export type GameListType = {
  id: string;
  name: string;
  url: string;
};

export type FilteredGameListType = {
  platforms: {
    id: number;
  }[];
};

// export type PlatformsFamilyType = {
//   platform_family: {
//     id: number;
//     name: string;
//   };
// };

// export type PlatformsPcVersionType = {
//   id: number;
//   name: string;
//   platform_logo: {
//     id: number;
//     image_id: string;
//   };
// };

// export type PlatformType = {
//   id: number;
//   slug: string;
// };
