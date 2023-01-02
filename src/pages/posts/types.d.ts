export interface ICategory {
  id: number;
  title: string;
}

export interface FilterElementProps {
  value: any;
  onChange: (value: any) => void;
}

export interface IPost {
  id: number;
  title: string;
  status: 'published' | 'draft' | 'rejected';
  category: { id: number };
  createdAt: string;
}
