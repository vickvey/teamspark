
export interface Video {
  id: string;
  title: string;
  description: string;
}

export interface Category {
  title: string;
  icon: string;
  videos: Video[];
}
