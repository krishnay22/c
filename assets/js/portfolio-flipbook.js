pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

// Get current portfolio ID from URL
const urlParams = new URLSearchParams(window.location.search);
const portfolioId = urlParams.get("id");

// Load portfolio data
const currentPortfolio = portfolios[portfolioId];

// Select containers
const titleEl = document.getElementById("portfolio-title");
const descEl = document.getElementById("portfolio-description");
const moreContainer = document.getElementById("more-case-studies");

// Load PDF dynamically
async function loadPDF(url) {
  try {
    const pdfDoc = await pdfjsLib.getDocument(url).promise;
    const $flipbook = $(".flipbook");
    $flipbook.empty();

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/jpeg", 0.85);
      const $div = $("<div></div>").append(img);
      $flipbook.append($div);
    }

    $(".flipbook").turn();
  } catch (error) {
    console.error("Error loading PDF:", error);
    alert("Error loading PDF: " + error.message);
  }
}

// Load content dynamically
if (currentPortfolio && currentPortfolio.category === "flipbook") {
  titleEl.textContent = currentPortfolio.title;
  descEl.textContent = currentPortfolio.description;
  loadPDF(currentPortfolio.pdfUrl);

  // More case studies (same layout as blog "popular posts")
  Object.values(portfolios)
    .filter(
      (p) => p.category === "flipbook" && p.id != currentPortfolio.id
    )
    .forEach((p) => {
      const div = document.createElement("div");
      div.className = "col-lg-4";
      div.innerHTML = `
        <div class="item" data-id="${p.id}">
          <div class="img">
            <img src="${p.thumbnail}" alt="${p.title}">
          </div>
          <div class="cont">
            <h5>${p.title}</h5>
            <span>${p.category}</span>
          </div>
        </div>
      `;
      div.addEventListener("click", () => {
        window.location.href = `portfolio-flipbook-detail.html?id=${p.id}`;
      });
      moreContainer.appendChild(div);
    });
} else {
  titleEl.textContent = "Flipbook not found or invalid category.";
}
