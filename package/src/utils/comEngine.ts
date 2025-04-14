import retry from "async-retry";
import { promisify } from "util";
import { locator } from "./locator";
import { exec } from "child_process";
interface Comment {
  id: string;
  parent: string;
  text: string;
  like_count: number;
  author_id: string;
  author: string;
  author_thumbnail: string;
  author_is_uploader: boolean;
  author_is_verified: boolean;
  author_url: string;
  is_favorited: boolean;
  _time_text: string;
  timestamp: number;
  is_pinned: boolean;
}
interface CommentOutput {
  comments: Comment[];
}
function pComment(c: any): Comment {
  return {
    id: c.id as string,
    parent: c.parent as string,
    text: c.text as string,
    like_count: c.like_count as number,
    author_id: c.author_id as string,
    author: c.author as string,
    author_thumbnail: c.author_thumbnail as string,
    author_is_uploader: c.author_is_uploader as boolean,
    author_is_verified: c.author_is_verified as boolean,
    author_url: c.author_url as string,
    is_favorited: c.is_favorited as boolean,
    _time_text: c._time_text as string,
    timestamp: c.timestamp as number,
    is_pinned: c.is_pinned as boolean,
  };
}
export default async function comEngine({ sudo = false, query, useTor = false }: { query: string; sudo?: boolean; useTor?: boolean }): Promise<CommentOutput> {
  const cprobe = await locator().then(fp => fp.cprobe);
  let pLoc = `${cprobe}`;
  const config = { factor: 2, retries: 3, minTimeout: 1000, maxTimeout: 3000 };
  if (useTor) pLoc += ` --proxy "socks5://127.0.0.1:9050"`;
  pLoc += ` --write-comments --dump-single-json "${query}"`;
  pLoc += ` --no-check-certificate --prefer-insecure --no-call-home --skip-download --no-warnings --geo-bypass`;
  pLoc += ` --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"`;
  const metaCore = await retry(async () => {
    return await promisify(exec)(pLoc);
  }, config);
  const i = JSON.parse(metaCore.stdout.toString());
  return {
    comments: (i.comments || []).map(pComment),
  };
}
