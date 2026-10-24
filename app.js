/**
 * Tận Tâm Chăm Sóc — Landing Page Interactive & Ads Conversion Controller
 * Tuân thủ Runtime Data Privacy (PII Masking) & WebView Compatibility
 */
(function () {
  'use strict';

  const HOTLINE_RAW = '0793803905';
  const HOTLINE_DISPLAY = '0793.803.905';
  const ZALO_URL = 'https://zalo.me/0793803905';

  // State cho bộ tạo tin nhắn tư vấn nhanh (có lưu nháp sessionStorage chống mất dữ liệu khi thoát dở chừng)
  const DRAFT_STORAGE_KEY = 'ytetainha_consult_draft_v1';
  const state = {
    ward: 'Phường Vũng Tàu',
    services: new Set(['Theo dõi chỉ số sức khỏe định kỳ (Mạch, nhiệt độ, huyết áp, SpO2, đường huyết, nhịp tim, hô hấp)']),
    note: ''
  };
  let isActionLocked = false;

  function saveDraftState() {
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
        ward: state.ward, services: Array.from(state.services), note: state.note
      }));
    } catch (_) {}
  }

  function loadDraftState(validWards, validServices) {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) || 'null');
      if (!parsed) return;
      if (typeof parsed.ward === 'string' && (!validWards.size || validWards.has(parsed.ward))) {
        state.ward = parsed.ward;
      }
      if (Array.isArray(parsed.services)) {
        const filtered = parsed.services.filter(
          (s) => typeof s === 'string' && s.trim() && (!validServices.size || validServices.has(s))
        );
        if (filtered.length > 0) state.services = new Set(filtered);
      }
      if (typeof parsed.note === 'string') state.note = parsed.note.slice(0, 220);
    } catch (_) {}
  }

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
    const serviceBtns = document.querySelectorAll('[data-service-chip]');
    const validWards = new Set(Array.from(wardBtns, (b) => b.getAttribute('data-ward-select')).filter(Boolean));
    const validServices = new Set(Array.from(serviceBtns, (b) => b.getAttribute('data-service-chip')).filter(Boolean));
    loadDraftState(validWards, validServices);

    wardBtns.forEach((btn) => {
      const btnWard = btn.getAttribute('data-ward-select');
      btn.setAttribute('aria-pressed', btnWard === state.ward ? 'true' : 'false');
      btn.addEventListener('click', () => {
        state.ward = btnWard || 'Phường Vũng Tàu';
        wardBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        saveDraftState();
        updatePreviewUI();
      });
    });

    const serviceBtns = document.querySelectorAll('[data-service-chip]');
    serviceBtns.forEach((btn) => {
      const chipName = btn.getAttribute('data-service-chip');
      if (chipName) {
        btn.setAttribute('aria-pressed', state.services.has(chipName) ? 'true' : 'false');
      }
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
        saveDraftState();
        updatePreviewUI();
      });
    });

    const noteInput = document.getElementById('consult-note-input');
    if (noteInput) {
      if (state.note) noteInput.value = state.note;
      noteInput.addEventListener('input', (e) => {
        state.note = e.target.value || '';
        saveDraftState();
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
          saveDraftState();
          updatePreviewUI();
        }
        const section = document.getElementById('dat-lich-tu-van');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        trackConversion('select_service_card', { note: targetService });
      });
    });

    // Nút Copy nội dung & Mở Zalo (có chống bấm đúp & chống lỗi mất mạng)
    const zaloSubmitBtn = document.getElementById('btn-submit-zalo');
    if (zaloSubmitBtn) {
      zaloSubmitBtn.addEventListener('click', async () => {
        if (isActionLocked) return;

        const consentBox = document.getElementById('consent-checkbox');
        if (consentBox && !consentBox.checked) {
          showToast('Vui lòng tích chọn đồng ý điều khoản tư vấn trước khi gửi yêu cầu.');
          consentBox.focus();
          return;
        }

        isActionLocked = true;
        zaloSubmitBtn.setAttribute('aria-busy', 'true');
        setTimeout(() => {
          isActionLocked = false;
          zaloSubmitBtn.removeAttribute('aria-busy');
        }, 1200);

        const msg = buildConsultMessage();
        await copyToClipboard(msg);
        trackConversion('click_zalo_consult', { note: state.note });

        if (navigator.onLine === false) {
          showToast(`Thiết bị đang mất mạng! Đã sao chép nội dung — vui lòng gọi trực tiếp ${HOTLINE_DISPLAY} (Chị Nguyễn Thuý).`);
          return;
        }

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
        if (isActionLocked) return;
        isActionLocked = true;
        setTimeout(() => { isActionLocked = false; }, 800);

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
      link.addEventListener('click', async (e) => {
        if (isActionLocked) {
          e.preventDefault();
          return;
        }
        isActionLocked = true;
        setTimeout(() => { isActionLocked = false; }, 1000);

        const placement = link.getAttribute('data-track-zalo') || 'general';
        await copyToClipboard(HOTLINE_RAW);
        trackConversion('click_zalo_direct', { note: placement });

        if (navigator.onLine === false) {
          e.preventDefault();
          showToast(`Thiết bị đang mất mạng! Đã sao chép SĐT ${HOTLINE_DISPLAY} — vui lòng gọi trực tiếp Chị Nguyễn Thuý.`);
          return;
        }

        showToast(`Đang mở Zalo Chị Nguyễn Thuý (${HOTLINE_DISPLAY})...`);
      });
    });

    window.addEventListener('offline', () => {
      showToast(`Mất kết nối Internet. Bạn vẫn có thể gọi trực tiếp Hotline ${HOTLINE_DISPLAY} (Chị Nguyễn Thuý).`);
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
        if (dialog && typeof dialog.showModal === 'function' && !dialog.open) {
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
