// 온담 메인 시안 v1
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // GNB: 스크롤 시 배경
  var gnb = document.getElementById("gnb");
  function onScroll() {
    gnb.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 히어로 크로스페이드 (영상 대체 슬라이드)
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dots i");
  var cur = 0;
  if (!reduced && slides.length > 1) {
    setInterval(function () {
      slides[cur].classList.remove("is-on");
      dots[cur].classList.remove("is-on");
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add("is-on");
      dots[cur].classList.add("is-on");
    }, 5000);
  }

  // 스크롤 리빌
  if (!reduced && "IntersectionObserver" in window) {
    // 화면에 들어오면 재생, 완전히 벗어나면 초기화(재진입 시 다시 재생)
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.intersectionRatio >= 0.12) {
          e.target.classList.add("is-in");
        } else if (!e.isIntersecting) {
          e.target.classList.remove("is-in");
        }
      });
    }, { threshold: [0, 0.12] });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

})();

// 활동 사진 라이트박스
(function () {
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lightboxImg");
  var closeBtn = box.querySelector(".lightbox-close");
  var lastFocus = null;

  function open(src, label) {
    img.src = src;
    img.alt = label || "활동 사진 크게 보기";
    box.hidden = false;
    lastFocus = document.activeElement;
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".moment").forEach(function (el) {
    el.addEventListener("click", function () { open(el.getAttribute("data-full"), el.getAttribute("aria-label")); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(el.getAttribute("data-full"), el.getAttribute("aria-label")); }
    });
  });
  closeBtn.addEventListener("click", close);
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
})();

