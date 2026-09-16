export type Asset = {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  model: string;
  prompt: string;
  src: string;
  alt: string;
};

export type SidebarTypes = {
  assets: Asset[];
  category: string;
  collapsed: boolean;
  countFor: (name: string) => number;
  favorites: string[];
  setCategoryAndScroll: (val: string) => void;
  setCollapsed: (bool: boolean) => void;
  setToast: (val: string) => void;
};
