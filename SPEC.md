# SPEC.md — Đặc Tả Kỹ Thuật & Nghiệp Vụ: Landing Page Y Tế Tại Nhà Vũng Tàu & Tam Thắng

## 1. Định Vị Sản Phẩm & Mục Tiêu Chuyển Đổi (Product Scope)
- **Tên dịch vụ:** Tận Tâm Chăm Sóc — Dịch Vụ Y Tế Tại Nhà Vũng Tàu & Tam Thắng
- **Thông điệp:** *"Sức khỏe tốt hơn – Cuộc sống an vui hơn"*
- **Đầu mối tiếp nhận duy nhất:** Chị Nguyễn Thuý — SĐT / Zalo: `0793.803.905`
- **Phạm vi địa lý:** Phường Vũng Tàu và Phường Tam Thắng.
- **Mục tiêu chuyển đổi chính (Primary Conversion Goal):** Dẫn khách hàng từ quảng cáo Google Ads / Facebook Ads bấm **Gọi trực tiếp (`tel:0793803905`)** hoặc **Nhắn Zalo (`https://zalo.me/0793803905`)** (kèm công cụ soạn sẵn nội dung tư vấn và nút sao chép SĐT 1 chạm) để Chị Nguyễn Thuý tự chốt tư vấn chi tiết.

---

## 2. Kiến Trúc Hiện Có Trong Codebase (`d:\AAA\ytetainha`)

| File / Tài nguyên | Vai trò kỹ thuật | Trạng thái thực tế |
| :--- | :--- | :--- |
| `index.html` | Giao diện 5 phân khu (Split Hero, Asymmetric Bento 5 dịch vụ, 3 Cam kết & Quy trình 3 bước, Bộ soạn nhanh tin nhắn Zalo theo Phường Vũng Tàu / Tam Thắng, FAQ Accordion, Footer + 4 `<dialog>` Modals pháp lý) + JSON-LD `MedicalBusiness`. | Đã có (`42.5 KB`) |
| `styles.css` | Hệ thống Design Tokens OKLCH, Typography (`Lora` + `Be Vietnam Pro`), Responsive Grid (`375px` Mobile -> `1280px` Desktop), Mobile Sticky Bottom Action Bar. | Đã có (`26.6 KB`) |
| `app.js` | Logic chọn khu vực/dịch vụ, tự động tạo tin nhắn tư vấn, Clipboard API (kèm fallback `execCommand('copy')` cho Facebook/TikTok In-App WebView), đẩy sự kiện chuyển đổi (`window.dataLayer`, `gtag`, `fbq`) có che mờ PII (`sanitizeTextForLog`). | Đã có (`9.7 KB`) |
| `assets/hero-care-clean.jpg` | Ảnh chụp nhân viên y tế chăm sóc bà cụ đã bóc tách và làm sạch từ ấn phẩm gốc (`363x312`). | Đã có |
| `assets/brand-logo.png` | Biểu tượng ngôi nhà trái tim y tế trích xuất từ ấn phẩm gốc (`120x106`). | Đã có |
| `assets/poster-tan-tam-cham-soc.jpg` | Ấn phẩm tờ rơi gốc chất lượng cao (`682x1024`) phục vụ đối chiếu trực quan và ảnh OpenGraph (`og:image`). | Đã có |
| `vercel.json` | Cấu hình Clean URLs, Security Headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) và Cache-Control bất biến cho `/assets/*`. | Đã có |
| `.env.local` | Lưu trữ thông tin xác thực cấp dự án (`VERCEL_TOKEN`, `GITHUB_TOKEN`, `GITEA_URL`, `GITEA_TOKEN`, `GITEA_USER`). | Đã có (Bảo vệ bởi `.gitignore`) |

---

## 3. Ranh Giới Phi Mục Tiêu (Non-Goals - Chống Over-Engineering)
- **KHÔNG** xây dựng hệ thống đăng ký tài khoản / đăng nhập cho bệnh nhân.
- **KHÔNG** lưu trữ thông tin bệnh án hay số điện thoại khách hàng vào Database trung gian (tránh rủi ro lộ PII và vượt giới hạn Serverless).
- **KHÔNG** tích hợp cổng thanh toán trực tuyến hay giỏ hàng bán thuốc (tránh vi phạm chính sách *Online Pharmacy* của Google Ads).
