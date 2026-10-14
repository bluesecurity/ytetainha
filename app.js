/**
 * Tận Tâm Chăm Sóc — Landing Page Interactive & Ads Conversion Controller
 * Tuân thủ Runtime Data Privacy (PII Masking) & WebView Compatibility
 */
(function () {
  'use strict';

  const HOTLINE_RAW = '0793803905';
  const HOTLINE_DISPLAY = '0793.803.905';
  const ZALO_URL = 'https://zalo.me/0793803905';

  // State cho bộ tạo tin nhắn tư vấn nhanh
  const state = {
    ward: 'Phường Vũng Tàu',
    services: new Set(['Theo dõi huyết áp & đường huyết định kỳ']),
    note: ''
  };

  /**
   * Che mờ số điện thoại hoặc ghi chú nếu chứa chuỗi số (Runtime Privacy Pillar 4)
   */
  function sanitizeTextForLog(input) {
    if (!input) return '';
    return String(input).replace(/(\d{3})\d{4}(\d{3})/g, '$1****$2');
  }

  /**
   * Gửi sự kiện chuyển đổi chuẩn Google Ads (gtag/dataLayer) & Meta Pixel (fbq)
   */
  function trackConversion(eventName, meta = {}) {
    const safeMeta = {
      event_category: 'lead_conversion',
      service_area: state.ward,
      action_type: eventName,
      note_masked: sanitizeTextForLog(meta.note || '')
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...safeMeta
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, safeMeta);
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, safeMeta);
    }
  }

  /**
   * Hiển thị thông báo Toast
   */
  let toastTimer = null;
  function showToast(message) {
    const toastEl = document.getElementById('app-toast');
    const toastText = document.getElementById('app-toast-text');
    if (!toastEl || !toastText) return;

    toastText.textContent = message;
    toastEl.classList.add('is-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 4200);
  }

  /**
   * Sao chép văn bản an toàn (Hỗ trợ cả In-App WebView của Facebook/Zalo Ads)
   */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {
      // Fallback bên dưới cho WebView cũ
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textArea);
      return ok;
    } catch (_) {
      return false;
    }
  }

  /**
   * Xây dựng nội dung tin nhắn gửi Chị Nguyễn Thuý
   */
  function buildConsultMessage() {
    const selectedList = Array.from(state.services);
    const serviceStr = selectedList.length > 0
      ? selectedList.join('; ')
      : 'Chăm sóc sức khỏe tại nhà';
    const extraNote = state.note.trim() ? ` Ghi chú thêm: ${state.note.trim()}.` : '';
    return `Chào chị Nguyễn Thuý (${HOTLINE_DISPLAY}), gia đình mình ở ${state.ward} cần tư vấn dịch vụ y tế tại nhà: ${serviceStr}.${extraNote} Nhờ chị tư vấn chi phí và lịch hẹn giúp gia đình nhé!`;
  }

  function updatePreviewUI() {
    const previewEl = document.getElementById('consult-preview-text');
    if (previewEl) {
      previewEl.textContent = buildConsultMessage();
    }
  }

  /**
   * Khởi tạo các nút chọn Khu vực (Ward) và Dịch vụ (Services)
   */
  function initQuickBuilder() {
    const wardBtns = document.querySelectorAll('[data-ward-select]');
    wardBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.ward = btn.getAttribute('data-ward-select') || 'Phường Vũng Tàu';
        wardBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        updatePreviewUI();
      });
    });

    const serviceBtns = document.querySelectorAll('[data-service-chip]');
    serviceBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const serviceName = btn.getAttribute('data-service-chip');
        if (!serviceName) return;

        if (state.services.has(serviceName)) {
          if (state.services.size > 1) {
            state.services.delete(serviceName);
            btn.setAttribute('aria-pressed', 'false');
          }
        } else {
          state.services.add(serviceName);
          btn.setAttribute('aria-pressed', 'true');
        }
        updatePreviewUI();
      });
    });

    const noteInput = document.getElementById('consult-note-input');
    if (noteInput) {
      noteInput.addEventListener('input', (e) => {
        state.note = e.target.value || '';
        updatePreviewUI();
      });
    }

    // Nút từ từng Card dịch vụ cuộn xuống và chọn sẵn dịch vụ
    const cardTriggers = document.querySelectorAll('[data-pick-service]');
    cardTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const targetService = trigger.getAttribute('data-pick-service');
        if (targetService) {
          state.services.clear();
          state.services.add(targetService);
          serviceBtns.forEach((btn) => {
            const matches = btn.getAttribute('data-service-chip') === targetService;
            btn.setAttribute('aria-pressed', matches ? 'true' : 'false');
          });
          updatePreviewUI();
        }
        const section = document.getElementById('dat-lich-tu-van');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        trackConversion('select_service_card', { note: targetService });
      });
    });

    // Nút Copy nội dung & Mở Zalo
    const zaloSubmitBtn = document.getElementById('btn-submit-zalo');
    if (zaloSubmitBtn) {
      zaloSubmitBtn.addEventListener('click', async () => {
        const consentBox = document.getElementById('consent-checkbox');
        if (consentBox && !consentBox.checked) {
          showToast('Vui lòng tích chọn đồng ý điều khoản tư vấn trước khi gửi yêu cầu.');
          consentBox.focus();
          return;
        }

        const msg = buildConsultMessage();
        await copyToClipboard(msg);
        trackConversion('click_zalo_consult', { note: state.note });
        showToast('Đã sao chép nội dung cần tư vấn! Đang mở Zalo Chị Nguyễn Thuý (0793.803.905)...');

        setTimeout(() => {
          window.open(ZALO_URL, '_blank', 'noopener,noreferrer');
        }, 350);
      });
    }

    updatePreviewUI();
  }

  /**
   * Khởi tạo các nút Copy SĐT & Tracking cuộc gọi / Zalo toàn trang
   */
  function initDirectContactActions() {
    const copyBtns = document.querySelectorAll('[data-copy-phone]');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const copied = await copyToClipboard(HOTLINE_RAW);
        trackConversion('copy_phone_number');
        if (copied) {
          showToast(`Đã sao chép số ${HOTLINE_DISPLAY} (Chị Nguyễn Thuý). Bạn có thể dán vào Zalo hoặc Bàn phím gọi!`);
        } else {
          showToast(`Số điện thoại/Zalo Chị Nguyễn Thuý: ${HOTLINE_DISPLAY}`);
        }
      });
    });

    const callLinks = document.querySelectorAll('[data-track-call]');
    callLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const placement = link.getAttribute('data-track-call') || 'general';
        trackConversion('click_call_hotline', { note: placement });
      });
    });

    const zaloLinks = document.querySelectorAll('[data-track-zalo]');
    zaloLinks.forEach((link) => {
      link.addEventListener('click', async () => {
        const placement = link.getAttribute('data-track-zalo') || 'general';
        await copyToClipboard(HOTLINE_RAW);
        trackConversion('click_zalo_direct', { note: placement });
        showToast(`Đang mở Zalo Chị Nguyễn Thuý (${HOTLINE_DISPLAY})...`);
      });
    });
  }

  /**
   * Khởi tạo các Modal Chính sách (Google Ads / Meta Ads Compliance) & Xem Poster
   */
  function initModals() {
    const openBtns = document.querySelectorAll('[data-open-modal]');
    openBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-open-modal');
        const dialog = modalId ? document.getElementById(modalId) : null;
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
      });
    });

    const closeBtns = document.querySelectorAll('[data-close-modal]');
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dialog = btn.closest('dialog');
        if (dialog) dialog.close();
      });
    });

    const dialogs = document.querySelectorAll('dialog.policy-dialog');
    dialogs.forEach((dialog) => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          dialog.close();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initQuickBuilder();
    initDirectContactActions();
    initModals();
  });
})();
