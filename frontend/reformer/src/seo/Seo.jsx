import { useEffect } from "react";

const SITE_NAME = "Re:Form Akademi";
const SITE_URL = "https://www.reformakademi.com";

export function useSeo({
    title,
    description,
    canonical,
    image,
    noIndex = false,
    lang = "tr",
    type = "website",
}) {
    useEffect(() => {
        document.documentElement.lang = lang;

        if (title) {
            document.title = `${title} | ${SITE_NAME}`;
        }

        setMeta("description", description);
        setMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");

        if (canonical) {
            setLink("canonical", `${SITE_URL}${canonical}`);
        }

        setMeta("og:type", type);
        setMeta("og:site_name", SITE_NAME);
        setMeta("og:title", title);
        setMeta("og:description", description);
        setMeta("og:url", canonical ? `${SITE_URL}${canonical}` : SITE_URL);
        setMeta("og:image", image || `${SITE_URL}/og-default.jpg`);

        /* ========== TWITTER ========== */
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", title);
        setMeta("twitter:description", description);
        setMeta("twitter:image", image || `${SITE_URL}/og-default.jpg`);
    }, [
        title,
        description,
        canonical,
        image,
        noIndex,
        lang,
        type,
    ]);
}

/* ==================================================
   HELPERS
================================================== */

function setMeta(name, content) {
    if (!content) return;

    const isOG = name.startsWith("og:");

    let el = document.querySelector(
        isOG
            ? `meta[property="${name}"]`
            : `meta[name="${name}"]`
    );

    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(isOG ? "property" : "name", name);
        document.head.appendChild(el);
    }

    el.setAttribute("content", content);
}

function setLink(rel, href) {
    if (!href) return;

    let el = document.querySelector(`link[rel="${rel}"]`);

    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }

    el.setAttribute("href", href);
}
