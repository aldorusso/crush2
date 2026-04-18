import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type {
  Article,
  Author,
  Category,
  Tag,
  ContentIndex,
  ArticleFrontmatter,
  AuthorFrontmatter,
  CategoryFrontmatter,
} from "./types";

const CONTENT_DIR = join(process.cwd(), "content");

function readMarkdown<T>(filePath: string): { data: T; body: string } {
  const raw = readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const body = marked(content) as string;
  return { data: data as T, body };
}

function walkDir(dir: string, ext = ".md"): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return walkDir(full, ext);
    if (e.isFile() && e.name.endsWith(ext)) return [full];
    return [];
  });
}

export function loadArticles(): Article[] {
  const files = walkDir(join(CONTENT_DIR, "articles"));
  return files
    .map((filePath) => {
      const { data, body } = readMarkdown<ArticleFrontmatter>(filePath);
      return { ...data, body, filePath };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function loadAuthors(): Author[] {
  const files = walkDir(join(CONTENT_DIR, "authors"));
  return files.map((filePath) => {
    const raw = readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as AuthorFrontmatter;
    return { ...fm, bio: fm.bio ?? content.trim(), filePath };
  });
}

export function loadCategories(): Category[] {
  const files = walkDir(join(CONTENT_DIR, "categories"));
  return files.map((filePath) => {
    const { data } = readMarkdown<CategoryFrontmatter>(filePath);
    return { ...data, filePath };
  });
}

export function buildTagIndex(articles: Article[]): Tag[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({
      slug,
      label: slug.replace(/-/g, " "),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

let _index: ContentIndex | null = null;

export function getContentIndex(): ContentIndex {
  if (_index) return _index;
  const articles = loadArticles();
  const authors = loadAuthors();
  const categories = loadCategories();
  const tags = buildTagIndex(articles);
  _index = { articles, authors, categories, tags };
  return _index;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getContentIndex().articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getContentIndex().articles.filter((a) => a.category === category);
}

export function getArticlesBySubcategory(
  category: string,
  subcategory: string,
): Article[] {
  return getContentIndex().articles.filter(
    (a) => a.category === category && a.subcategory === subcategory,
  );
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getContentIndex().authors.find((a) => a.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getContentIndex().categories.find((c) => c.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 6): Article[] {
  const all = getContentIndex().articles.filter(
    (a) => a.slug !== article.slug,
  );
  const scored = all.map((a) => {
    let score = 0;
    const sharedTags = a.tags.filter((t) => article.tags.includes(t)).length;
    if (a.subcategory === article.subcategory && sharedTags >= 2) score += 10;
    else if (a.subcategory === article.subcategory) score += 6;
    if (sharedTags >= 2) score += sharedTags * 2;
    if (a.author === article.author) score += 3;
    if (a.category === article.category) score += 1;
    return { article: a, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

export function getFeaturedArticles(limit = 5): Article[] {
  return getContentIndex()
    .articles.filter((a) => a.featured)
    .slice(0, limit);
}

export function getArticlesByTag(tag: string): Article[] {
  return getContentIndex().articles.filter((a) => a.tags.includes(tag));
}

export function getArticleByPath(
  category: string,
  subcategory: string,
  slug: string,
): Article | undefined {
  return getContentIndex().articles.find(
    (a) =>
      a.category === category &&
      a.subcategory === subcategory &&
      a.slug === slug,
  );
}

export function invalidateContentCache(): void {
  _index = null;
}
