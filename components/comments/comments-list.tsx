// components/CommentsList.tsx
export default function CommentsList({
    byParent,
    parentId,
  }: {
    byParent: Record<number, any[]>;
    parentId: number;
  }) {
    const items = byParent[parentId] || [];
    if (!items.length && parentId === 0) {
      return <p className="text-gray-500">Henüz yorum yok. İlk yorumu siz yazın!</p>;
    }
  
    return (
      <ul className={parentId === 0 ? "space-y-6" : "space-y-4 pl-6 border-l" }>
        {items.map((c) => (
          <li key={c.id}>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-800">{c.author_name || "Ziyaretçi"}</span>{" "}
                · <time dateTime={c.date}>{new Date(c.date).toLocaleDateString("tr-TR")}</time>
              </div>
              <div
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: c.content?.rendered || "" }}
              />
            </div>
            {/* Cevaplar */}
            {byParent[c.id] && byParent[c.id].length > 0 && (
              <CommentsList byParent={byParent} parentId={c.id} />
            )}
          </li>
        ))}
      </ul>
    );
  }