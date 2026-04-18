import { readFileSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";

const SITE_DIR = join(process.cwd(), "content", "site");

export interface SitePage {
  slug: string;
  title: string;
  description: string;
  body: string;
}

export function loadSitePage(slug: string): SitePage | null {
  const filePath = join(SITE_DIR, `${slug}.md`);
  if (!existsSync(filePath)) return null;

  const raw = readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const body = marked(content) as string;

  return {
    slug,
    title: (data["title"] as string | undefined) ?? slug,
    description: (data["description"] as string | undefined) ?? "",
    body,
  };
}
