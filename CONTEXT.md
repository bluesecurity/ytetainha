# CONTEXT.md — Dự Án Landing Page Y Tế Tại Nhà Vũng Tàu & Tam Thắng (Tận Tâm Chăm Sóc)

## 1. Rollback Anchor & Trạng Thái Khởi Tạo
- **Git Branch:** `main`
- **Rollback Anchor Commit Hash:** `3b34134` (Trước khi bổ sung OpenGraph/Canonical URL tuyệt đối & bộ PWA Icon vuông `192x192` / `512x512`)
- **Mục tiêu cốt lõi:** Landing Page tĩnh tốc độ cao triển khai trên Vercel cho dịch vụ **Tận Tâm Chăm Sóc** (Chị Nguyễn Thuý - `0793.803.905`), tối ưu hóa tỷ lệ chuyển đổi **Gọi Điện / Nhắn Zalo** và tuân thủ 100% chính sách kiểm duyệt của **Google Ads & Facebook (Meta) Ads** ngành Y tế.

## 2. Domain Model & Thông Tin Nghiệp Vụ Cốt Lõi
- **Thương hiệu:** Tận Tâm Chăm Sóc — Dịch Vụ Y Tế Tại Nhà Vũng Tàu & Tam Thắng
- **Thông điệp chủ đạo:** *"Sức khỏe tốt hơn – Cuộc sống an vui hơn"*
- **Người phụ trách tư vấn & điều phối:** Chị Nguyễn Thuý
- **Hotline / Zalo duy nhất:** `0793.803.905` (`tel:0793803905` / `https://zalo.me/0793803905`)
- **Phạm vi phục vụ địa lý:** Toàn bộ khu vực **Phường Vũng Tàu** và **Phường Tam Thắng**.
- **5 Nhóm dịch vụ hỗ trợ tại nhà:**
  1. Theo dõi chỉ số sức khỏe định kỳ (Đo huyết áp, kiểm tra đường huyết mao mạch, theo dõi sinh hiệu cơ bản).
  2. Chăm sóc & hỗ trợ người cao tuổi, người có bệnh lý mạn tính (tim mạch, tiểu đường, huyết áp), phục hồi thể trạng sau ốm.
  3. Thực hiện thủ thuật điều dưỡng tại nhà (Thay băng, rửa và chăm sóc vết thương, vết loét tì đè, vết mổ theo hướng dẫn chuyên môn).
  4. Hỗ trợ hậu cần đi chợ thuốc & nhận thuốc hộ gia đình theo đúng đơn kê sẵn của bác sĩ (tuân thủ chính sách Google Ads: không kê đơn, không bán thuốc trực tuyến).
  5. Tư vấn & hướng dẫn chăm sóc sức khỏe (Chế độ dinh dưỡng, vận động phục hồi, phòng ngừa biến chứng tại nhà).

## 3. Kiến Trúc Kỹ Thuật (Zero-Bloat Static Architecture)
- **Stack:** Pure Semantic HTML5 + Modern CSS3 (OKLCH Design Tokens, Fluid Typography, Responsive Grid) + Vanilla ES6 JavaScript.
- **Lý do chọn:**
  - LCP `< 0.5s`, Điểm Google PageSpeed Insights 99-100 giúp giảm giá thầu CPC khi chạy Google Ads.
  - Không dùng Database/Serverless phụ thuộc -> Không bao giờ dính lỗi Connection Pool hay Timeout trên gói Vercel Hobby.
  - Bảo mật tuyệt đối thông tin cá nhân (Runtime Privacy): Công cụ "Soạn nhanh nội dung tư vấn Zalo" xử lý 100% ở Client-side và đẩy trực tiếp sang Zalo/Cuộc gọi của Chị Nguyễn Thuý.
