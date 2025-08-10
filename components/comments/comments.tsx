// components/Comments.tsx
import CommentsList from "./comments-list";
import CommentForm from "./comment-form";

export default async function Comments({ postId }: { postId: number }) {
  const url = `${process.env.WORDPRESS_API_URL}/comments?post=${postId}&per_page=100&_fields=id,author_name,author_email,date,content,parent`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const comments: Array<{
    id: number;
    author_name: string;
    date: string;
    content: { rendered: string };
    parent: number;
  }> = res.ok ? await res.json() : [];

  // Düz listeyi küçük bir ağaç yapısına çevir
  const byParent: Record<number, typeof comments> = {};
  comments.forEach(c => {
    const p = c.parent || 0;
    byParent[p] = byParent[p] || [];
    byParent[p].push(c);
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Yorumlar</h3>
      <CommentsList byParent={byParent} parentId={0} />
      <div className="mt-10">
        <h4 className="text-lg font-medium mb-4">Yorum Yaz</h4>
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}