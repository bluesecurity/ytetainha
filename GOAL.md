# GOAL.md — Lộ Trình Hoàn Thiện & Nghiệm Thu Thực Chứng (Tận Tâm Chăm Sóc)

## Đánh Giá Tiến Độ Thực Tế Hiện Tại: **100% (Live Production Verified & Synced)**

---

## Milestone 1: Giao Diện, Luồng Chuyển Đổi SĐT/Zalo & Chuẩn Hóa Chính Sách Ads (ĐÃ XONG - 100%)
- [x] **Task 1.1:** Thiết kế & hiện thực hóa giao diện `index.html` + `styles.css` chuẩn Mobile-First, bảng màu OKLCH Forest Green, thanh nổi cố định dưới đáy màn hình điện thoại (`.mobile-sticky-bar`).
  - *Evidence:* Chụp màn hình xác minh qua `chrome-devtools-mcp` tại `375x812` và `1280x900`, `hasHorizontalOverflow: false`.
- [x] **Task 1.2:** Xây dựng bộ "Soạn nhanh nội dung tư vấn Zalo" & nút Copy SĐT 1-chạm trong `app.js` dẫn khách liên hệ trực tiếp Chị Nguyễn Thuý (`0793.803.905`).
  - *Evidence:* `node --check app.js` (exit code 0), test tự động click chọn `Phường Tam Thắng` + `Thay băng vết thương` sinh đúng tin nhắn preview và bắn event `dataLayer`.
- [x] **Task 1.3:** Chuẩn hóa từ ngữ y tế (né bộ lọc *Online Pharmacy* của Google Ads & *Personal Attributes* của Meta Ads) và tích hợp 3 Modal pháp lý bắt buộc (Chính sách bảo mật, Điều khoản dịch vụ, Miễn trừ trách nhiệm y khoa).
- [x] **Task 1.4:** Tạo `.gitignore` khóa chặt `.env.local` và `.vercel/`, chống rò rỉ token lên Git.

---

## Milestone 2: Các Việc Cốt Tử Chốt Sổ Bản Release 100% (ĐÃ XONG - 100%)
- [x] **Gap 1 (Google Ads Crawler & SEO Readiness):** Bổ sung `robots.txt` và `sitemap.xml` đồng bộ domain Vercel thực tế (`https://ytetainha-alpha.vercel.app`), giúp Google Ads Destination Bot (`AdsBot-Google`) và `Facebot` thu thập dữ liệu trang đích không gặp lỗi 404.
  - *Evidence:* `curl -I https://ytetainha-alpha.vercel.app/robots.txt` và `/sitemap.xml` trả về `HTTP/2 200`.
- [x] **Gap 2 (Config-First Remote Git Push):** Đẩy mã nguồn sạch (không dính `.env.local`, `.git/config` không lưu lộ token) lên kho lưu trữ từ xa:
  - GitHub: `https://github.com/bluesecurity/ytetainha.git` (`Exit code 0`)
  - Gitea LAN: `daika/ytetainha.git` (`Exit code 0`)
- [x] **Gap 3 (Config-First Vercel Production Deployment):** Deploy trực tiếp dự án lên Vercel Production bằng đúng `VERCEL_TOKEN` trong `.env.local` của dự án (Tài khoản: `anhduongstudio123-1625`).
  - *Evidence:* URL Production chính thức: `https://ytetainha-alpha.vercel.app` (Alias phụ: `https://ytetainha-adstudios-projects-7cf85761.vercel.app`).
- [x] **Gap 4 (Live Production Verification):** Kiểm tra trực tiếp `https://ytetainha-alpha.vercel.app/` qua `curl -I` trả về `HTTP/2 200`, xác nhận đầy đủ headers bảo mật và nội dung trang đích.

---

## Các Hạng Mục Hoãn Sang Phase 2 (Deferred / Post-Launch)
- Gắn mã ID thực tế của Google Ads (`AW-XXXXXXXXX`) và Meta Pixel (`XXXXXXXXXXXXXXX`) khi Đại Ka tạo chiến dịch quảng cáo cụ thể.
- Thêm hình ảnh hoạt động thực tế của đội ngũ điều dưỡng tại Vũng Tàu (nếu Chị Nguyễn Thuý cung cấp thêm ảnh chụp thực địa sau này).
