# GOAL.md — Lộ Trình Hoàn Thiện & Nghiệm Thu Thực Chứng (Tận Tâm Chăm Sóc)

## Đánh Giá Tiến Độ Thực Tế Hiện Tại: **100% (Core MVP, Ads Readiness & Mobile PWA Verified Live on Production)**

---

## 1. Các Hạng Mục Core MVP Đã Hoàn Thành & Xác Minh Thực Tế (100%)

### Milestone 1: Giao Diện, Luồng Chuyển Đổi SĐT/Zalo & Chuẩn Hóa Chính Sách Ads (ĐÃ XONG)
- [x] **Task 1.1:** Thiết kế & hiện thực hóa giao diện `index.html` + `styles.css` chuẩn Mobile-First, bảng màu OKLCH Forest Green, thanh nổi cố định dưới đáy màn hình điện thoại (`.mobile-sticky-bar`).
- [x] **Task 1.2:** Xây dựng bộ "Soạn nhanh nội dung tư vấn Zalo" & nút Copy SĐT 1-chạm trong `app.js` dẫn khách liên hệ trực tiếp Chị Nguyễn Thuý (`0793.803.905`).
- [x] **Task 1.3:** Chuẩn hóa từ ngữ y tế (né bộ lọc *Online Pharmacy* của Google Ads & *Personal Attributes* của Meta Ads) và tích hợp 3 Modal pháp lý bắt buộc (Chính sách bảo mật, Điều khoản dịch vụ, Miễn trừ trách nhiệm y khoa).
- [x] **Task 1.4:** Tạo `.gitignore` khóa chặt `.env.local` và `.vercel/`, chống rò rỉ token lên Git.

### Milestone 2: Hạ Tầng SEO/Ads Bot, Git Remote & Vercel Production (ĐÃ XONG)
- [x] **Task 2.1:** Bổ sung `robots.txt` và `sitemap.xml` đồng bộ domain Vercel thực tế (`https://ytetainha-alpha.vercel.app`) cho `AdsBot-Google` và `Facebot`.
- [x] **Task 2.2:** Đẩy mã nguồn sạch lên GitHub (`https://github.com/bluesecurity/ytetainha.git`) và Gitea LAN (`daika/ytetainha.git`).
- [x] **Task 2.3:** Deploy bản Production lên Vercel (`https://ytetainha-alpha.vercel.app`).

### Milestone 3: Chuẩn Hóa Responsive Mobile Web & PWA Invariants (ĐÃ XONG)
- [x] **Task 3.1 (Safe-Area Invariant):** Bổ sung `viewport-fit=cover` và `padding: env(safe-area-inset-*)` cho `.top-notice`, `.site-header`, `.mobile-sticky-bar`, `.modal`, `.toast` và `body`.
- [x] **Task 3.2 (Zero Horizontal Overflow):** Khóa `overflow-x: hidden` trên `html, body` và kiểm chứng `scrollWidth === clientWidth` trên cả 2 viewport `390x844px` và `412x915px`.
- [x] **Task 3.3 (Touch Target >= 48x48px):** Chuẩn hóa toàn bộ 34/34 nút bấm, link điều hướng, chip chọn khu vực/dịch vụ đạt tối thiểu `48x48px` (`undersizedCount: 0`).

### Milestone 4: Vá Dứt Điểm 3 Micro-Gaps Kiểm Duyệt Quảng Cáo & PWA (ĐÃ XONG)
- [x] **Gap 1 (Absolute OpenGraph & Canonical URL):** Đã bổ sung `<link rel="canonical" href="https://ytetainha-alpha.vercel.app/" />`, `<meta property="og:url" content="https://ytetainha-alpha.vercel.app/" />`, `<meta property="og:image" content="https://ytetainha-alpha.vercel.app/assets/poster-tan-tam-cham-soc.jpg" />` (kèm `width=682`, `height=1024`, `alt`) và URL tuyệt đối trong JSON-LD `MedicalBusiness`.
- [x] **Gap 2 (Square PWA Icons `192x192` & `512x512`):** Đã sinh tự động `assets/icon-192.png` (`192x192`), `assets/icon-512.png` (`512x512`), `assets/apple-touch-icon.png` (`180x180`) và khai báo chuẩn `any` + `maskable` trong `manifest.webmanifest`.
- [x] **Gap 3 (Live Production Verification via `chrome-devtools-mcp`):** Đã deploy bản mới nhất lên `https://ytetainha-alpha.vercel.app` và kiểm chứng trực tiếp trên domain thật qua `chrome-devtools-mcp` với 0 lỗi Console, 0 lỗi mạng, đầy đủ OpenGraph/Canonical tuyệt đối và PWA Manifest hợp lệ.

---

## 2. Các Hạng Mục Hoãn Sang Phase 2 (Deferred / Không Vẽ Thêm Việc Ngoài Lề)
- **Gắn mã Pixel / Conversion ID thực tế (`AW-XXXXXXXXX` / Meta Pixel ID):** Hoãn đến khi Đại Ka tạo tài khoản chiến dịch quảng cáo cụ thể (hiện tại `app.js` đã dựng sẵn hàm `trackEvent()` tự động bắt tín hiệu ngay khi gắn script).
- **Bộ ảnh thực địa mới:** Hoãn đến khi Chị Nguyễn Thuý chụp thêm ảnh hoạt động thực tế tại Vũng Tàu.
