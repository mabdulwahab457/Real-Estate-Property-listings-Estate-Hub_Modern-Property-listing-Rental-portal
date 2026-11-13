const PROPS = [
  { t: "Modern Family Villa", p: "$285,000", s: "sale", type: "House", loc: "DHA Phase 6, Lahore", b: 5, ba: 4, a: "10 Marla", img: "villa.jpg" },
  { t: "Luxury City Apartment", p: "$850/mo", s: "rent", type: "Apartment", loc: "Gulberg III, Lahore", b: 2, ba: 2, a: "1,200 sqft", img: "apartment.jpg" },
  { t: "Prime Residential Plot", p: "$120,000", s: "sale", type: "Plot", loc: "Bahria Town, Lahore", b: 0, ba: 0, a: "1 Kanal", img: "plot.jpg" },
  { t: "Cozy Townhouse", p: "$190,000", s: "sale", type: "House", loc: "Model Town, Lahore", b: 3, ba: 3, a: "5 Marla", img: "townhouse.jpg" },
  { t: "Commercial Office Space", p: "$1,400/mo", s: "rent", type: "Commercial", loc: "MM Alam Road, Lahore", b: 0, ba: 2, a: "2,000 sqft", img: "office.jpg" },
  { t: "Penthouse with a View", p: "$340,000", s: "sale", type: "Apartment", loc: "Defence, Lahore", b: 4, ba: 4, a: "3,100 sqft", img: "penthouse.jpg" },
  { t: "Garden Studio Flat", p: "$450/mo", s: "rent", type: "Apartment", loc: "Johar Town, Lahore", b: 1, ba: 1, a: "650 sqft", img: "studio.jpg" },
  { t: "Corner Shop Unit", p: "$95,000", s: "sale", type: "Commercial", loc: "Liberty Market, Lahore", b: 0, ba: 1, a: "900 sqft", img: "shop.jpg" },
  { t: "Spacious Rental House", p: "$1,100/mo", s: "rent", type: "House", loc: "Wapda Town, Lahore", b: 4, ba: 3, a: "1 Kanal", img: "house.jpg" }];
const SERVICES = [
  ["key", "Buy Property", "Search verified listings and get guided from viewing to ownership."],
  ["cash-coin", "Sell Property", "List in minutes, reach thousands of buyers and get the best price."],
  ["house-heart", "Rent Property", "Find homes and offices for short or long term, hassle free."],
  ["shield-check", "Legal Support", "Documentation, verification and paperwork handled by experts."],
  ["graph-up-arrow", "Valuation", "Accurate market valuation backed by local data and experts."],
  ["tools", "Property Management", "We handle tenants, maintenance and rent collection for you."]];

const page = location.pathname.split("/").pop() || "index.html";
const links = [["index.html", "Home"], ["properties.html", "Properties"], ["services.html", "Services"], ["about.html", "About"], ["contact.html", "Contact"]];

// shared navbar + footer
document.getElementById("nav-slot").innerHTML = `<nav class="navbar navbar-expand-lg fixed-top"><div class="container">
<a class="navbar-brand fw-bold d-flex align-items-center" href="index.html"><img src="images/logo.png" class="brand-logo" alt="">Estate Hub</a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav mx-auto">
${links.map(([h, n]) => `<li class="nav-item"><a class="nav-link ${h === page ? "active" : ""}" href="${h}">${n}</a></li>`).join("")}
</ul><a href="contact.html" class="btn btn-eh">List Your Property</a></div></div></nav>`;
document.getElementById("footer-slot").innerHTML = `<footer><div class="container"><div class="row g-4">
<div class="col-md-5"><h5 class="text-white"><i class="bi bi-building me-2"></i>Estate Hub</h5><p class="small">Your trusted partner for buying, selling and renting property.</p></div>
<div class="col-6 col-md-3"><h6 class="text-white">Quick Links</h6><ul class="list-unstyled small">${links.map(([h, n]) => `<li><a href="${h}">${n}</a></li>`).join("")}</ul></div>
<div class="col-6 col-md-4"><h6 class="text-white">Follow us</h6><div class="fs-4 d-flex gap-3"><a href="#"><i class="bi bi-facebook"></i></a><a href="#"><i class="bi bi-instagram"></i></a><a href="#"><i class="bi bi-twitter-x"></i></a><a href="#"><i class="bi bi-linkedin"></i></a></div></div></div>
<hr class="border-secondary mt-4"><p class="text-center small mb-0">© 2026 Estate Hub. All rights reserved.</p></div></footer>
<button id="topBtn" title="Back to top"><i class="bi bi-arrow-up"></i></button>`;

// property cards
const card = (p, n) => `<div class="col-md-6 col-lg-4 reveal"><div class="prop-card"><div class="prop-img"><img src="images/properties/${p.img}" alt="${p.t}" loading="lazy"><span class="badge-tag">${p.s === "sale" ? "For Sale" : "For Rent"}</span></div>
<div class="p-4"><div class="price">${p.p}</div><h5 class="mt-1">${p.t}</h5><p class="text-secondary small mb-3"><i class="bi bi-geo-alt"></i> ${p.loc}</p>
<div class="meta">${p.b ? `<span><i class="bi bi-door-open"></i> ${p.b} Beds</span>` : ""}<span><i class="bi bi-droplet"></i> ${p.ba} Baths</span><span><i class="bi bi-aspect-ratio"></i> ${p.a}</span></div></div></div></div>`;
const grid = document.getElementById("prop-grid");
let mode = "all";
function render() {
  if (!grid) return;
  const limit = +grid.dataset.limit || 99;
  const q = (document.getElementById("q")?.value || "").toLowerCase();
  const ty = document.getElementById("type")?.value || "all";
  const list = PROPS.filter(p => (mode === "all" || p.s === mode) && (ty === "all" || p.type === ty) && (p.t + p.loc).toLowerCase().includes(q)).slice(0, limit);
  grid.innerHTML = list.length ? list.map(card).join("") : `<p class="text-center text-secondary">No properties match your search.</p>`;
  observe();
}
document.querySelectorAll(".filter-btn").forEach(b => b.onclick = () => {
  document.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); mode = b.dataset.f; render();
});
["q", "type"].forEach(id => document.getElementById(id)?.addEventListener("input", render));

// services
const sg = document.getElementById("service-grid");
if (sg) { const n = +sg.dataset.limit || 99; sg.innerHTML = SERVICES.slice(0, n).map(([i, t, d]) => `<div class="col-md-6 col-lg-${n > 4 ? 4 : 3} reveal"><div class="service"><div class="icon-box"><i class="bi bi-${i}"></i></div><h5>${t}</h5><p class="text-secondary small mb-0">${d}</p></div></div>`).join(""); }

// hero search -> properties page
document.getElementById("heroSearch")?.addEventListener("submit", e => { e.preventDefault(); location.href = "properties.html"; });

// scroll reveal
let io;
function observe() {
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal:not(.show)").forEach(el => io.observe(el));
}

// animated counters
document.querySelectorAll("[data-count]").forEach(el => {
  const end = +el.dataset.count;
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect();
    let n = 0; const step = Math.ceil(end / 60);
    const t = setInterval(() => { n = Math.min(n + step, end); el.textContent = n.toLocaleString() + "+"; if (n >= end) clearInterval(t); }, 25);
  }).observe(el);
});

// contact form validation
const form = document.getElementById("contactForm");
form?.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
  form.reset(); form.classList.remove("was-validated");
  document.getElementById("ok").classList.remove("d-none");
});

// navbar shadow + back to top
const nb = document.querySelector(".navbar"), tb = document.getElementById("topBtn");
addEventListener("scroll", () => { nb.classList.toggle("scrolled", scrollY > 40); tb.style.display = scrollY > 400 ? "block" : "none"; });
tb.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

render(); observe();
