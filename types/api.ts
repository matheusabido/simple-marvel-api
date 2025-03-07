export interface Paginated<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    };
    returned: number;
  };
  series: {
    available: number;
    items: {
      resourceURI: string;
      name: string;
    };
    returned: number;
  };
  // there are still some fields, but i only need these
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  variantDescription: string;
  description: string | null;
  pageCount: number;
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      }
    ];
  };
  // there are still some fields, but i only need these
}

export interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
  };
  series: {
    available: number;
  };
  stories: {
    available: number;
  };
  // there are still some fields, but i only need these
}

export interface Response<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Paginated<T>;
}
