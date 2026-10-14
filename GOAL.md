# GOAL.md — Lộ Trình Hoàn Thiện & Nghiệm Thu Thực Chứng (Tận Tâm Chăm Sóc)

## Đánh Giá Tiến Độ Thực Tế Hiện Tại: **82% (Core Local MVP Ready — Pending Cloud Deployment & Crawler Files)**

---

## Milestone 1: Giao Diện, Luồng Chuyển Đổi SĐT/Zalo & Chuẩn Hóa Chính Sách Ads (ĐÃ XONG - 82%)
- [x] **Task 1.1:** Thiết kế & hiện thực hóa giao diện `index.html` + `styles.css` chuẩn Mobile-First, bảng màu OKLCH Forest Green, thanh nổi cố định dưới đáy màn hình điện thoại (`.mobile-sticky-bar`).
  - *Evidence:* Chụp màn hình xác minh qua `chrome-devtools-mcp` tại `375x812` và `1280x900`, `hasHorizontalOverflow: false`.
- [x] **Task 1.2:** Xây dựng bộ "Soạn nhanh nội dung tư vấn Zalo" & nút Copy SĐT 1-chạm trong `app.js` dẫn khách liên hệ trực tiếp Chị Nguyễn Thuý (`0793.803.905`).
  - *Evidence:* `node --check app.js` (exit code 0), test tự động click chọn `Phường Tam Thắng` + `Thay băng vết thương` sinh đúng tin nhắn preview và bắn event `dataLayer`.
- [x] **Task 1.3:** Chuẩn hóa từ ngữ y tế (né bộ lọc *Online Pharmacy* của Google Ads & *Personal Attributes* của Meta Ads) và tích hợp 3 Modal pháp lý bắt buộc (Chính sách bảo mật, Điều khoản dịch vụ, Miễn trừ trách nhiệm y khoa).
- [x] **Task 1.4:** Tạo `.gitignore` khóa chặt `.env.local` và `.vercel/`, chống rò rỉ token lên Git.

---

## Milestone 2: Các Việc Cốt Tử Còn Thiếu Để Chốt Sổ Bản Release 100% (MISSING GAPS - 18% CÒN LẠI)
- [ ] **Gap 1 (Google Ads Crawler & SEO Readiness):** Bổ sung `robots.txt` và `sitemap.xml` đồng bộ domain Vercel thực tế, giúp Google Ads Destination Bot (`AdsBot-Google`) thu thập dữ liệu trang đích không gặp lỗi 404.
  - *Mechanical Check:* `curl -I /robots.txt` và `curl -I /sitemap.xml` trả về `200 OK`.
- [ ] **Gap 2 (Config-First Remote Git Push):** Đẩy mã nguồn sạch (không dính `.env.local`) lên kho lưu trữ từ xa (Gitea LAN & GitHub) bằng đúng `GITEA_TOKEN` và `GITHUB_TOKEN` khai báo trong `.env.local` của dự án.
  - *Mechanical Check:* `git push` thành công với commit hash xác thực trên remote.
- [ ] **Gap 3 (Config-First Vercel Production Deployment):** Deploy trực tiếp dự án lên Vercel Production bằng đúng `VERCEL_TOKEN` trong `.env.local` của dự án (tuyệt đối không dùng nhầm ambient CLI login).
  - *Mechanical Check:* Lấy URL Production thực tế (`https://...vercel.app`) và kiểm tra `curl -I` trả về `HTTP/2 200`.
- [ ] **Gap 4 (Live Production Verification):** Mở URL Vercel thực tế trên trình duyệt / `curl`, kiểm tra tốc độ phản hồi, thẻ OpenGraph (`og:image` tuyệt đối hoặc tương đối chuẩn) và xác nhận 0 lỗi Console trên môi trường Production.

---

## Các Hạng Mục Hoãn Sang Phase 2 (Deferred / Post-Launch)
- Gắn mã ID thực tế của Google Ads (`AW-XXXXXXXXX`) và Meta Pixel (`XXXXXXXXXXXXXXX`) khi Đại Ka tạo chiến dịch quảng cáo cụ thể.
- Thêm hình ảnh hoạt động thực tế của đội ngũ điều dưỡng tại Vũng Tàu (nếu Chị Nguyễn Thuý cung cấp thêm ảnh chụp thực địa sau này).
