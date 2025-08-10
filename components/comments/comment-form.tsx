"use client";
import { useState } from "react";

export default function CommentForm({ postId, parent = 0 }: { postId: number; parent?: number }) {
  const [values, setValues] = useState({ author_name: "", author_email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, post: postId, parent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Yorum gönderilemedi");
      setStatus("ok");
      setMessage("Yorumunuz alındı. Yayına alınmadan önce kontrol edilecektir.");
      setValues({ author_name: "", author_email: "", content: "" });
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          name="author_name"
          value={values.author_name}
          onChange={onChange}
          placeholder="Adınız"
          className="w-full rounded-md border px-3 py-2"
        />
        <input
          required
          type="email"
          name="author_email"
          value={values.author_email}
          onChange={onChange}
          placeholder="E-posta"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <textarea
        required
        name="content"
        value={values.content}
        onChange={onChange}
        placeholder="Yorumunuz"
        rows={4}
        className="w-full rounded-md border px-3 py-2"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
      {message && (
        <p className={`text-sm ${status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}