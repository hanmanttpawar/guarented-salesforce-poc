const PRODUCTS = [
  { name: "Samsung 7kg Front Load Washing Machine", category: "Electronics", sku: "ELEC-001", assetTag: "AST-001", icon: "washer" },
  { name: "LG 260L Double Door Refrigerator", category: "Electronics", sku: "ELEC-002", assetTag: "AST-002", icon: "fridge" },
  { name: "Samsung 43-inch Smart LED TV", category: "Electronics", sku: "ELEC-003", assetTag: "AST-003", icon: "tv" },
  { name: "Voltas 1.5 Ton Split AC", category: "Electronics", sku: "ELEC-004", assetTag: "AST-004", icon: "ac" },
  { name: "IFB 25L Convection Microwave", category: "Electronics", sku: "ELEC-005", assetTag: "AST-005", icon: "microwave" },
  { name: "3-Seater Fabric Sofa", category: "Furniture", sku: "FURN-001", assetTag: "AST-006", icon: "sofa" },
  { name: "Queen Size Wooden Bed", category: "Furniture", sku: "FURN-002", assetTag: "AST-007", icon: "bed" },
  { name: "4-Seater Dining Table Set", category: "Furniture", sku: "FURN-003", assetTag: "AST-008", icon: "table" },
  { name: "Ergonomic Office Chair", category: "Furniture", sku: "FURN-004", assetTag: "AST-009", icon: "chair" },
  { name: "2-Door Wooden Wardrobe", category: "Furniture", sku: "FURN-005", assetTag: "AST-010", icon: "wardrobe" }
];

const DEMO_CUSTOMER = {
  name: "Demo Customer",
  email: "demo.customer@guarented.com",
  phone: "9876543210"
};

function getSvgIcon(type) {
  const commonAttrs = 'viewBox="0 0 24 24" width="60" height="60" stroke="#0e2238" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  switch (type) {
    case 'washer': return `<svg ${commonAttrs}><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M12 10a3 3 0 0 1 3 3"/></svg>`;
    case 'fridge': return `<svg ${commonAttrs}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="5" x2="9" y2="7"/><line x1="9" y1="14" x2="9" y2="17"/></svg>`;
    case 'tv': return `<svg ${commonAttrs}><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`;
    case 'ac': return `<svg ${commonAttrs}><rect x="2" y="5" width="20" height="10" rx="2"/><line x1="6" y1="19" x2="18" y2="19"/><line x1="8" y1="15" x2="16" y2="15"/></svg>`;
    case 'microwave': return `<svg ${commonAttrs}><rect x="2" y="4" width="20" height="16" rx="2"/><rect x="4" y="7" width="11" height="10" rx="1"/><line x1="18" y1="8" x2="18" y2="8.01"/><line x1="18" y1="12" x2="18" y2="12.01"/></svg>`;
    case 'sofa': return `<svg ${commonAttrs}><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/><line x1="4" y1="18" x2="4" y2="21"/><line x1="20" y1="18" x2="20" y2="21"/></svg>`;
    case 'bed': return `<svg ${commonAttrs}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
    case 'table': return `<svg ${commonAttrs}><path d="M4 10h16"/><path d="M6 10v10"/><path d="M18 10v10"/><path d="M3 6h18v4H3z"/></svg>`;
    case 'chair': return `<svg ${commonAttrs}><circle cx="12" cy="7" r="3"/><path d="M5 21v-4a7 7 0 0 1 14 0v4"/><line x1="8" y1="14" x2="16" y2="14"/></svg>`;
    case 'wardrobe': return `<svg ${commonAttrs}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/></svg>`;
    default: return `<svg ${commonAttrs}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
  }
}

let isFormSubmitting = false;

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid();
  populateProductDropdown();
  populateDemoCustomer();
  setupDynamicFormLogic();
  setupFormValidationAndSubmission();
});

function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  PRODUCTS.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">${getSvgIcon(product.icon)}</div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-category">${product.category}</span>
          <span class="status-badge">Installed</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-specs">
          <span>SKU: <strong>${product.sku}</strong></span>
          <span>Asset Tag: <strong>${product.assetTag}</strong></span>
        </div>
        <button type="button" class="btn-card" onclick="selectProductForRequest('${product.name}')">Raise Request</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function populateProductDropdown() {
  const select = document.getElementById("product_select");
  if (!select) return;
  PRODUCTS.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.name;
    option.textContent = `${p.name} (${p.assetTag})`;
    select.appendChild(option);
  });
}

function populateDemoCustomer() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  if (nameEl) nameEl.value = DEMO_CUSTOMER.name;
  if (emailEl) emailEl.value = DEMO_CUSTOMER.email;
  if (phoneEl) phoneEl.value = DEMO_CUSTOMER.phone;
}

function selectProductForRequest(productName) {
  const productSelect = document.getElementById("product_select");
  if (productSelect) {
    productSelect.value = productName;
    updateAssetTag(productName);
  }
  const requestSection = document.getElementById("request-section");
  if (requestSection) {
    requestSection.scrollIntoView({ behavior: "smooth" });
  }
}

function updateAssetTag(productName) {
  const assetTagField = document.getElementById("asset_tag");
  if (!assetTagField) return;
  const found = PRODUCTS.find((p) => p.name === productName);
  if (found) {
    assetTagField.value = found.assetTag;
    clearError("asset_tag");
    clearError("product_select");
  } else {
    assetTagField.value = "";
  }
}

function setupDynamicFormLogic() {
  const reqTypeSelect = document.getElementById("request_type");
  const installGroup = document.getElementById("install_date_group");
  const refundGroup = document.getElementById("refund_reason_group");
  const installDateInput = document.getElementById("install_date");
  const refundReasonSelect = document.getElementById("refund_reason");
  const productSelect = document.getElementById("product_select");

  if (productSelect) {
    productSelect.addEventListener("change", (e) => updateAssetTag(e.target.value));
  }

  if (reqTypeSelect) {
    reqTypeSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      clearError("request_type");
      if (val === "Installation Request") {
        if (installGroup) installGroup.style.display = "flex";
        if (refundGroup) refundGroup.style.display = "none";
        if (refundReasonSelect) refundReasonSelect.value = "";
      } else if (val === "Refund Request") {
        if (refundGroup) refundGroup.style.display = "flex";
        if (installGroup) installGroup.style.display = "none";
        if (installDateInput) installDateInput.value = "";
      } else {
        if (installGroup) installGroup.style.display = "none";
        if (refundGroup) refundGroup.style.display = "none";
      }
    });
  }
}

function setupFormValidationAndSubmission() {
  const form = document.getElementById("caseForm");
  const iframe = document.getElementById("sf_post_target");
  const modal = document.getElementById("successModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    const isValid = validateForm();
    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Set standard Case Subject: Request Type - Product (Asset Tag)
    const reqType = document.getElementById("request_type").value;
    const product = document.getElementById("product_select").value;
    const assetTag = document.getElementById("asset_tag").value;
    const sfSubject = document.getElementById("sf_subject");
    if (sfSubject) {
      sfSubject.value = `${reqType} - ${product} (${assetTag})`;
    }

    isFormSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      const textSpan = submitBtn.querySelector(".btn-text");
      if (textSpan) textSpan.textContent = "Submitting...";
    }
  });

  if (iframe) {
    iframe.addEventListener("load", () => {
      if (isFormSubmitting) {
        isFormSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          const textSpan = submitBtn.querySelector(".btn-text");
          if (textSpan) textSpan.textContent = "Submit Request";
        }

        if (modal) modal.style.display = "flex";

        form.reset();
        populateDemoCustomer();
        const installGroup = document.getElementById("install_date_group");
        const refundGroup = document.getElementById("refund_reason_group");
        if (installGroup) installGroup.style.display = "none";
        if (refundGroup) refundGroup.style.display = "none";
      }
    });
  }

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const reqType = document.getElementById("request_type").value;
  const product = document.getElementById("product_select").value;
  const assetTag = document.getElementById("asset_tag").value.trim();
  const desc = document.getElementById("description").value.trim();

  if (!name) { showError("name", "Customer Name is required."); isValid = false; } else clearError("name");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("email", "Valid Email Address is required."); isValid = false; } else clearError("email");
  if (!phone || phone.replace(/[^0-9]/g, "").length < 10) { showError("phone", "Valid 10-digit Phone Number is required."); isValid = false; } else clearError("phone");
  if (!reqType) { showError("request_type", "Please select a Request Type."); isValid = false; } else clearError("request_type");
  if (!product) { showError("product_select", "Please select a product."); isValid = false; } else clearError("product_select");
  if (!assetTag) { showError("asset_tag", "Asset Tag missing."); isValid = false; } else clearError("asset_tag");

  if (reqType === "Installation Request") {
    const installDate = document.getElementById("install_date");
    if (!installDate || !installDate.value) {
      showError("install_date", "Preferred installation date is required.");
      isValid = false;
    } else {
      clearError("install_date");
    }
  }

  if (reqType === "Refund Request") {
    const refundReason = document.getElementById("refund_reason");
    if (!refundReason || !refundReason.value) {
      showError("refund_reason", "Please select a refund reason.");
      isValid = false;
    } else {
      clearError("refund_reason");
    }
  }

  // Mandatory Description Check
  if (!desc) { showError("description", "Description is required."); isValid = false; } else clearError("description");

  return isValid;
}

function showError(id, msg) {
  const f = document.getElementById(id);
  const e = document.getElementById(`${id}-error`);
  if (f) f.classList.add("input-invalid");
  if (e) e.textContent = msg;
}

function clearError(id) {
  const f = document.getElementById(id);
  const e = document.getElementById(`${id}-error`);
  if (f) f.classList.remove("input-invalid");
  if (e) e.textContent = "";
}