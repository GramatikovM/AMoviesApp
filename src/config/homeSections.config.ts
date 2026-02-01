export type HomeSectionConfig = {
  id: string;
  title: string;
  category: string;
  layout: 'horizontal' | 'vertical';
  query: {
    s: string;
    type?: 'movie' | 'series';
  };
};

export const HOME_SECTIONS: HomeSectionConfig[] = [
  {
    id: 'trending',
    title: 'Trending',
    category: 'trending',
    layout: 'horizontal',
    query: {
      s: '2025',
    },
  },
  {
    id: 'action',
    title: 'Action Movies',
    category: 'action',
    layout: 'horizontal',
    query: {
      s: 'Action',
      type: 'movie',
    },
  },
  {
    id: 'series',
    title: 'Popular Series',
    category: 'series',
    layout: 'horizontal',
    query: {
      s: 'Life',
      type: 'series',
    },
  },
];
