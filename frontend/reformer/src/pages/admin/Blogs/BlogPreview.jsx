// BlogPreview.jsx
import { blocksToHtml } from "./BlogHtml";

export default function BlogPreview({
    title,
    author,
    category,
    blocks,
    coverUrl,
    rawHtml,
}) {
    const blockHtml = blocksToHtml(blocks);
    const htmlToRender = rawHtml?.trim() ? rawHtml : blockHtml;

    return (
        <div className="admin-blog-preview">
            <div className="admin-blog-preview-top">
                <div>Canlı Önizleme</div>
                <div className="admin-blog-help">
                    Blog sayfasında nasıl görünecekse aynısı
                </div>
            </div>

            <div className="admin-blog-preview-content">
                <h1>{title?.trim() || "Blog Başlığı"}</h1>

                <div className="admin-blog-help" style={{ marginBottom: 16 }}>
                    {author || "Re:Form Akademi"} · {category || "Kategori"}
                </div>

                {coverUrl && <img src={coverUrl} alt="" />}

                <div
                    dangerouslySetInnerHTML={{
                        __html: htmlToRender || "<p>İçerik ekleyin...</p>",
                    }}
                />
            </div>
        </div>
    );
}

