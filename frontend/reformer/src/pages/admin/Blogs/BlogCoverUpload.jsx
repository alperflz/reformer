// BlogCoverUpload.jsx
import { useRef, useState } from "react";

const MAX_MB = 5;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function BlogCoverUpload({
    value,          // preview url (string)
    onChangeFile,   // (file|null) => void
}) {
    const inputRef = useRef(null);
    const [drag, setDrag] = useState(false);

    const pickFile = () => inputRef.current?.click();

    const handleFile = (file) => {
        if (!file) return;

        if (!ALLOWED.includes(file.type)) {
            alert("Sadece JPG, PNG veya WEBP yüklenebilir.");
            return;
        }

        if (file.size > MAX_MB * 1024 * 1024) {
            alert(`Dosya boyutu en fazla ${MAX_MB} MB olabilir.`);
            return;
        }

        onChangeFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDrag(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    return (
        <div
            className={`admin-blog-cover-drop ${drag ? "is-drag" : ""}`}
            onClick={pickFile}
            onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {!value && (
                <>
                    <strong>Kapak Görseli Yükle</strong>
                    <span>Sürükle & bırak veya tıkla</span>
                    <span>JPG, PNG, WEBP · Max {MAX_MB}MB</span>
                </>
            )}

            {value && (
                <div className="admin-blog-cover-preview">
                    <img src={value} alt="Kapak Önizleme" />
                    <div className="admin-blog-cover-actions">
                        <button
                            type="button"
                            className="admin-blog-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChangeFile(null);
                            }}
                        >
                            Kaldır
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
