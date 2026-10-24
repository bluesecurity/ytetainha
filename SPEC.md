# SPEC.md — Đặc Tả Kỹ Thuật & Nghiệp Vụ: Landing Page Y Tế Tại Nhà Vũng Tàu & Tam Thắng

## 1. Định Vị Sản Phẩm & Mục Tiêu Chuyển Đổi (Product Scope)
- **Tên dịch vụ:** Tận Tâm Chăm Sóc — Dịch Vụ Y Tế Tại Nhà Vũng Tàu & Tam Thắng
- **Thông điệp:** *"Sức khỏe tốt hơn – Cuộc sống an vui hơn"*
- **Đầu mối tiếp nhận duy nhất:** Chị Nguyễn Thuý — SĐT / Zalo: `0793.803.905`
- **Phạm vi địa lý:** Phường Vũng Tàu và Phường Tam Thắng, TP. Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu.
- **Mục tiêu chuyển đổi chính (Primary Conversion Goal):** Dẫn khách hàng từ quảng cáo Google Ads (AdWords) / Facebook Ads bấm **Gọi trực tiếp (`tel:0793803905`)** hoặc **Nhắn Zalo (`https://zalo.me/0793803905`)** (kèm công cụ soạn sẵn nội dung tư vấn và nút sao chép SĐT 1 chạm) để Chị Nguyễn Thuý tự chốt tư vấn chi tiết.

---

## 2. Danh Mục 5 Dịch Vụ Cốt Lõi Trên Trang Đích (Chuẩn Hóa AdWords Healthcare Policy)
1. **Theo dõi chỉ số sức khỏe định kỳ (Đã cập nhật theo bản viết tay mới & chuẩn hóa Luật Khám chữa bệnh 2023):**
   - *"Thực hiện đo: Mạch, nhiệt độ, huyết áp, nhịp thở, nồng độ oxy máu, đường huyết, kiểm tra nhịp tim, phổi (hô hấp)."*
   - *"Theo dõi sát sao các chỉ số cơ bản của cơ thể để thông báo gia đình kịp thời khi có dấu hiệu bất thường."*
2. **Chăm sóc người cao tuổi & hỗ trợ bệnh lý mạn tính:**
   - Chăm sóc toàn diện cho ông bà, bố mẹ lớn tuổi hoặc người có bệnh lý mạn tính (tim mạch, tiểu đường, huyết áp); hỗ trợ tập luyện phục hồi thể trạng sau ốm.
3. **Thay băng & chăm sóc vết thương:**
   - Hỗ trợ thay băng, rửa và chăm sóc vết thương ngoài da, vết loét tì đè ở người nằm lâu, vết khâu sau xuất viện đúng quy trình vô khuẩn.
4. **Hỗ trợ hậu cần & nhận theo toa bác sĩ (Đã tối ưu từ khóa chống cờ *Online Pharmacy* của AdWords):**
   - Thay mặt gia đình bận rộn đi nhận và giao vật tư chăm sóc y tế, sản phẩm theo đúng toa chỉ định sẵn của bác sĩ khi cần.
5. **Tư vấn dinh dưỡng & hướng dẫn vận động:**
   - Hướng dẫn gia đình xây dựng chế độ dinh dưỡng, bài tập vận động phù hợp và chủ động phòng ngừa té ngã, loét tì đè.

---

## 3. Kiến Trúc Thực Tế Hiện Có Trong Codebase (`d:\AAA\ytetainha`)

| File / Tài nguyên | Vai trò kỹ thuật | Trạng thái thực tế |
| :--- | :--- | :--- |
| `index.html` | Giao diện 5 phân khu + JSON-LD `MedicalBusiness` (có đầy đủ `PostalAddress` Vũng Tàu) + PWA meta (`viewport-fit=cover`) + Canonical & OpenGraph URL tuyệt đối + 3 Modal Pháp lý AdWords. | Đã hoàn thiện (`43.8 KB`) |
| `styles.css` | Hệ thống Design Tokens OKLCH, Typography (`Lora` + `Be Vietnam Pro`), Responsive Grid (`360px` -> `1280px`), Safe-Area Insets, chống tràn ngang, Touch Targets `>= 48x48px`, và khóa cỡ chữ `px/vw` cho `.mobile-sticky-bar` chống cắt chữ khi điện thoại bật phóng to font. | Đã hoàn thiện (`28.6 KB`) |
| `app.js` | Logic chọn khu vực/dịch vụ, lưu nháp `sessionStorage`, tự động tạo tin nhắn tư vấn, Clipboard API (kèm fallback cho WebView), chống bấm đúp, xử lý mất mạng, đẩy sự kiện chuyển đổi (`window.dataLayer`, `gtag`, `fbq`) có che mờ PII (`sanitizeTextForLog`). | Đã hoàn thiện (`11.4 KB`) |
| `manifest.webmanifest` | Cấu hình Web App Manifest cho Mobile PWA (`display: standalone`, `theme_color: #133824`, bộ icon vuông `192x192` & `512x512`). | Đã hoàn thiện (`918 B`) |
| `robots.txt` & `sitemap.xml` | Cấp quyền thu thập dữ liệu cho `AdsBot-Google`, `AdsBot-Google-Mobile`, `Facebot` trỏ về `https://ytetainha-alpha.vercel.app`. | Đã hoàn thiện |
| `vercel.json` | Cấu hình Clean URLs, Security Headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) và Cache-Control bất biến cho `/assets/*`. | Đã hoàn thiện |
| `assets/*` | `hero-care-clean.jpg` (`363x312`), `brand-logo.png` (`120x106`), `icon-192.png` (`192x192`), `icon-512.png` (`512x512`), `apple-touch-icon.png` (`180x180`), `poster-tan-tam-cham-soc.jpg` (`682x1024`). | Đã có đủ |
| `.env.local` | Lưu trữ thông tin xác thực cấp dự án (`VERCEL_TOKEN`, `GITHUB_TOKEN`, `GITEA_URL`, `GITEA_TOKEN`, `GITEA_USER`). | Đã có (Bảo vệ bởi `.gitignore`) |

---

## 4. Ranh Giới Phi Mục Tiêu (Non-Goals - Chống Over-Engineering)
- **KHÔNG** xây dựng hệ thống đăng ký tài khoản / đăng nhập cho bệnh nhân.
- **KHÔNG** lưu trữ thông tin bệnh án hay số điện thoại khách hàng vào Database trung gian (tránh rủi ro lộ PII và vượt giới hạn Serverless).
- **KHÔNG** tích hợp cổng thanh toán trực tuyến hay giỏ hàng bán thuốc (tránh vi phạm chính sách *Online Pharmacy* của Google Ads).
