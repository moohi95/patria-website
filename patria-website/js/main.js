// Footer godina
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Učitavanje news-a iz data/news.json
async function loadNews() {
  const container = document.getElementById("news-list");
  if (!container) return;

  try {
    const response = await fetch("data/news.json");
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const data = await response.json();

    const items = Array.isArray(data.news) ? data.news : [];

    // sort po datumu (noviji prvi)
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    container.innerHTML = "";

    items.forEach(item => {
      const article = document.createElement("article");
      article.className = "card";

      const title = item.title || "Untitled";
      const body = item.body || "";
      const date = item.date ? new Date(item.date) : null;
      const pdf = item.pdf;
      const image = item.image;

      let dateLabel = "";
      if (!isNaN(date)) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        dateLabel = `${d}.${m}.${y}.`;
      }

      let html = "";
      html += `<h3>${title}</h3>`;
      if (dateLabel) {
        html += `<p style="font-size:0.85rem;color:#777;margin:0 0 .3rem;">${dateLabel}</p>`;
      }
      html += `<p>${body}</p>`;

      if (pdf) {
        html += `<a href="${pdf}" class="card-link" target="_blank" rel="noopener">Open document</a>`;
      }

      article.innerHTML = html;

      if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        article.appendChild(img);
      }

      container.appendChild(article);
    });
  } catch (err) {
    console.error("Failed to load news:", err);
  }
}

loadNews();
