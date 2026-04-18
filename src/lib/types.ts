export interface HeroImage {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  subcategory: string;
  tags: string[];
  heroImage: HeroImage;
  readingTime: number;
  featured: boolean;
  breaking: boolean;
}

export interface Article extends ArticleFrontmatter {
  body: string;
  filePath: string;
}

export interface AuthorFrontmatter {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio: string;
  expertise: string[];
  twitter?: string;
  linkedin?: string;
}

export interface Author extends AuthorFrontmatter {
  filePath: string;
}

export interface CategoryFrontmatter {
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  slug: string;
  description: string;
}

export interface Category extends CategoryFrontmatter {
  filePath: string;
}

export interface Tag {
  slug: string;
  label: string;
  count: number;
}

export interface ContentIndex {
  articles: Article[];
  authors: Author[];
  categories: Category[];
  tags: Tag[];
}
