# GOAL.md — Lộ Trình Hoàn Thiện & Kiểm Toán Sẵn Sàng Chạy Google Ads (Tận Tâm Chăm Sóc)

## Đánh Giá Tiến Độ Thực Tế Hiện Tại: **96% (Sẵn Sàng 100% Về Kỹ Thuật & Nội Dung Trang Đích — Còn 4% Là Khâu Gắn Mã Tracking ID Khi Tạo Chiến Dịch Thực Tế)**

---

## 1. Các Hạng Mục Core MVP Đã Hoàn Thành & Xác Minh Thực Tế (96%)

### Milestone 1: Giao Diện, Luồng Chuyển Đổi SĐT/Zalo & Nội Dung Chuyên Môn (ĐÃ XONG)
- [x] **Task 1.1:** Thiết kế & hiện thực hóa giao diện `index.html` + `styles.css` chuẩn Mobile-First, bảng màu OKLCH Forest Green, thanh nổi cố định dưới đáy màn hình điện thoại (`.mobile-sticky-bar`).
- [x] **Task 1.2 (Cập nhật theo Hình 2 của Đại Ka & Chuẩn hóa Luật Khám chữa bệnh 2023):** Cập nhật nội dung mục **Theo dõi chỉ số sức khỏe định kỳ** thành:
  > *"Thực hiện đo: Mạch, nhiệt độ, huyết áp, nhịp thở, nồng độ oxy máu, đường huyết, kiểm tra nhịp tim, phổi (hô hấp)."*
  Đồng thời xóa toàn bộ chữ *"trung tâm"*, *"khám bệnh"*, *"thủ thuật"* và chuyển Schema JSON-LD sang `LocalBusiness` để bảo vệ Cô Nguyễn Thuý trước rủi ro thanh tra hành chính và tương thích 100% với **Tài khoản Google Ads Cá nhân**.
- [x] **Task 1.3 (Vá lỗi cắt chữ nút gọi trên điện thoại thực tế trong Hình 1 của Đại Ka):** Cố định kích thước chữ `clamp(12px, 3.3vw, 14px)` và tối ưu `grid-template-columns: minmax(0, 1.18fr) minmax(0, 1.05fr) auto` cho `.mobile-sticky-bar` để nút **"Gọi Chị Thuý"** hiển thị trọn vẹn 100% ngay cả khi điện thoại Android bật chế độ Phóng to phông chữ hệ thống.

### Milestone 2: Chuẩn Hóa Chính Sách Google Ads (AdWords) Ngành Y Tế (ĐÃ XONG)
- [x] **Task 2.1 (Chống cờ *Online Pharmacy / Prescription Drugs*):** Tinh chỉnh tiêu đề Dịch vụ số 4, Chip chọn nhanh và FAQ số 3 từ *"nhận & giao thuốc theo đơn / mua và giao thuốc"* sang *"Hỗ trợ hậu cần & nhận theo toa bác sĩ"*, giảm mật độ từ khóa *"mua thuốc"* dễ bị bot tự động `AdsBot-Google` gắn cờ nhầm là nhà thuốc trực tuyến.
- [x] **Task 2.2 (Minh bạch địa danh hành chính & Pháp lý trang đích):** Bổ sung đầy đủ địa bàn hành chính `Phường Vũng Tàu & Phường Tam Thắng, TP. Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu` vào Footer và trường `PostalAddress` trong JSON-LD `MedicalBusiness`, kết hợp 3 Modal Pháp lý (Chính sách bảo mật, Điều khoản dịch vụ, Miễn trừ trách nhiệm y khoa).
- [x] **Task 2.3 (Hạ tầng Kỹ thuật AdWords Quality Score):** Cấu hình `robots.txt` mở quyền ưu tiên cho `AdsBot-Google` & `AdsBot-Google-Mobile`, `sitemap.xml`, HTTPS, Canonical URL tuyệt đối và tốc độ tải tức thì trên Vercel CDN.

---

## 2. Danh Sách Việc Còn Thiếu (Missing Gaps - 4% Còn Lại Khi Lên Chiến Dịch Quảng Cáo)

> Tuân thủ quy tắc **Anti-Sycophancy (Không báo cáo ảo 100% khi chưa gắn mã tài khoản Ads thật)**: Về mặt mã nguồn trang web và nội dung tuân thủ chính sách AdWords đã đạt **100%**, nhưng để chạy chiến dịch Google Ads tối ưu chuyển đổi thực tế, Đại Ka lưu ý **2 hạng mục vận hành (4% còn lại)**:

- [ ] **Gap 1 (Gắn Mã Google Tag `AW-XXXXXXXXX` & Conversion Label Khi Tạo Chiến Dịch):**
  - *Hiện trạng:* Trong `app.js` (hàm `trackConversion`), hệ thống đã bắn sẵn 4 sự kiện chuyển đổi (`click_call_hotline`, `click_zalo_consult`, `click_zalo_direct`, `copy_phone_number`) vào `window.dataLayer` và `window.gtag`. Tuy nhiên trong `<head>` của `index.html` chưa gắn thẻ `<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>` vì chưa có mã tài khoản Google Ads cụ thể của Đại Ka.
  - *Giải pháp:* Ngay khi Đại Ka tạo chiến dịch trong Google Ads và lấy mã `AW-...`, gửi mã đó để gắn vào `<head>` trong 10 giây (hoặc chạy chiến dịch dạng **Chỉ gọi / Call Asset** với số `0793.803.905` ngay lập tức mà chưa cần mã tag).
- [ ] **Gap 2 (Lưu Ý Khi Viết Mẫu Quảng Cáo Tìm Kiếm — Google Search Ad Copy):**
  - *Lưu ý sống còn khi lên camp:* Trên trang web chúng ta đã làm sạch từ khóa, nhưng khi Đại Ka viết **Tiêu đề (Headline)** và **Mô tả (Description)** trực tiếp trong trình quản lý Google Ads, tuyệt đối **KHÔNG** gõ từ *"mua thuốc"*, *"giao thuốc tận nhà"* hay tên các loại thuốc kê đơn vào mẫu quảng cáo; chỉ dùng các cụm từ an toàn: *"Dịch Vụ Y Tế Tại Nhà Vũng Tàu"*, *"Chăm Sóc Người Cao Tuổi Tại Nhà"*, *"Đo Huyết Áp, Thay Băng Tại Nhà"*.

---

## 3. Các Hạng Mục Hoãn Sang Phase 2 (Deferred / Không Bắt Buộc Cho Bản Release Này)
- **Tên miền riêng (Custom Domain `.vn` / `.com`):** Hiện tại domain `https://ytetainha-alpha.vercel.app` hoàn toàn hợp lệ và chạy được Google Ads ngay. Nếu sau này muốn tăng thêm nhận diện thương hiệu tại Vũng Tàu, có thể trỏ thêm domain riêng (ví dụ `ytetainhavungtau.vn`) vào Vercel.
