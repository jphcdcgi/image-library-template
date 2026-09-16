export type AssetProps = {
  alt: string;
  category: string;
  id: string;
  model: string;
  prompt: string;
  src: string;
  title: string;
  type: 'image' | 'video';
};

export type GalleryProps = {
  faves: any[];
  filtered: AssetProps[];
  setFaves: (input: any[]) => void;
  setToast: (message: string) => void;
};

export type ToolbarProps = {
  filtered: any[];
  query: string;
  setQuery: (val: string) => void;
  setSortOldest: (val: boolean) => void;
  sortOldest: boolean;
};

export type SidebarProps = {
  assets: AssetProps[];
  category: string;
  collapsed: boolean;
  countFor: (name: string) => number;
  faves: any[];
  setCategoryAndScroll: (val: string) => void;
  setCollapsed: (bool: boolean) => void;
  setToast: (val: string) => void;
};
