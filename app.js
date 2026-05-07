/**
 * 神外量表 - 主应用逻辑
 * Neurosurg Scales Calculator
 */

(function () {
  'use strict';

  const container = document.getElementById('scale-container');
  const tabContainer = document.getElementById('scale-tabs');
  let currentScale = SCALES_DATA[0].id;

  // ========== 初始化 ==========
  function init() {
    renderTabs();
    renderAllScales();
    activateScale(currentScale);
  }

  // ========== 渲染标签导航 ==========
  function renderTabs() {
    tabContainer.innerHTML = SCALES_DATA.map(scale => `
      <button 
        class="tab-btn flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap
               text-gray-600 hover:text-brand-700 hover:bg-brand-50"
        data-scale="${scale.id}"
        onclick="window.__switchScale('${scale.id}')"
      >
        ${scale.name}
      </button>
    `).join('');
  }

  // ========== 渲染所有量表面板 ==========
  function renderAllScales() {
    container.innerHTML = SCALES_DATA.map(scale => `
      <div class="scale-panel" id="panel-${scale.id}">
        ${renderScaleCard(scale)}
      </div>
    `).join('');
  }

  // ========== 渲染单个量表卡片 ==========
  function renderScaleCard(scale) {
    return `
      <!-- 量表标题 -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">${scale.fullName}</h2>
        <p class="text-sm text-gray-500 mt-1">${scale.fullNameCN}</p>
        <p class="text-gray-600 mt-2">${scale.description}</p>
      </div>

      <!-- 评分选项区 -->
      <div class="space-y-6" id="options-${scale.id}">
        ${scale.groups.map((group, gi) => renderGroup(scale, group, gi)).join('')}
      </div>

      <!-- 结果展示区 -->
      <div class="mt-8 p-6 bg-white rounded-xl border-2 border-gray-100 shadow-sm" id="result-${scale.id}">
        <div class="text-center text-gray-400">
          <p class="text-lg">👆 请选择评分项</p>
          <p class="text-sm mt-1">选择后自动计算结果</p>
        </div>
      </div>

      <!-- 临床备注区 -->
      <div class="mt-6 border border-blue-200 rounded-xl overflow-hidden bg-blue-50/30">
        <button 
          class="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-blue-50 transition"
          onclick="window.__toggleNotes('${scale.id}')"
        >
          <span class="flex items-center gap-2 font-medium text-brand-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            临床备注（⚠️ 必读）
          </span>
          <svg class="w-5 h-5 text-brand-600 transform transition-transform" id="note-arrow-${scale.id}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div class="clinical-note-content" id="notes-${scale.id}">
          <div class="px-5 pb-4 space-y-2">
            ${scale.clinicalNotes.map(note => {
              const type = note.startsWith('⚡') ? 'warning' : note.startsWith('⚠️') ? 'danger' : note.startsWith('📌') ? 'info' : 'ref';
              const icon = type === 'warning' ? '⚡' : type === 'danger' ? '⚠️' : type === 'info' ? '📌' : '📚';
              const bgColor = type === 'warning' ? 'bg-amber-50 border-amber-200' : type === 'danger' ? 'bg-red-50 border-red-200' : type === 'info' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200';
              return `<div class="flex gap-2 p-2.5 rounded-lg border ${bgColor} text-sm">
                <span class="flex-shrink-0">${icon}</span>
                <span>${note.replace(/^[⚡⚠📌📚]\s*/, '')}</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- 文献引用 -->
      <div class="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
        <p class="font-medium text-gray-700 mb-1">📖 原始文献</p>
        <p>${scale.reference}</p>
        <a href="https://doi.org/${scale.doi}" target="_blank" class="text-brand-600 hover:text-brand-800 underline">
          DOI: ${scale.doi} ↗
        </a>
      </div>
    `;
  }

  // ========== 渲染评分组 ==========
  function renderGroup(scale, group, groupIndex) {
    return `
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <h3 class="font-semibold text-gray-800">${group.name}</h3>
        </div>
        <div class="divide-y divide-gray-100">
          ${group.items.map((item, itemIndex) => `
            <label class="scale-option flex items-start gap-3 px-5 py-3.5 cursor-pointer border-l-4 border-transparent"
                   id="opt-${scale.id}-${groupIndex}-${itemIndex}">
              <input type="radio" 
                     name="${scale.id}-g${groupIndex}" 
                     value="${item.value}"
                     class="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500"
                     onchange="window.__onSelect('${scale.id}', ${groupIndex}, ${itemIndex}, ${item.value})"
              />
              <div class="flex-1">
                <span class="font-medium text-gray-800">${item.label}</span>
                ${item.detail ? `<p class="text-sm text-gray-500 mt-0.5">${item.detail}</p>` : ''}
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ========== 切换量表 ==========
  window.__switchScale = function (scaleId) {
    currentScale = scaleId;
    activateScale(scaleId);
  };

  function activateScale(scaleId) {
    // 更新标签
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.scale === scaleId;
      btn.classList.toggle('bg-brand-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('text-gray-600', !isActive);
      btn.classList.toggle('hover:text-brand-700', !isActive);
      btn.classList.toggle('hover:bg-brand-50', !isActive);
    });

    // 更新面板
    document.querySelectorAll('.scale-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${scaleId}`);
    });
  }

  // ========== 选择评分项 ==========
  window.__onSelect = function (scaleId, groupIndex, itemIndex, value) {
    const scale = SCALES_DATA.find(s => s.id === scaleId);

    // 高亮选中项
    const groupItems = document.querySelectorAll(`[id^="opt-${scaleId}-${groupIndex}-"]`);
    groupItems.forEach((el, i) => {
      el.classList.toggle('selected', i === itemIndex);
      el.classList.toggle('border-l-brand-500', i === itemIndex);
      el.classList.toggle('border-transparent', i !== itemIndex);
    });

    // 计算总分
    updateResult(scaleId);
  };

  // ========== 更新结果显示 ==========
  function updateResult(scaleId) {
    const scale = SCALES_DATA.find(s => s.id === scaleId);
    const resultEl = document.getElementById(`result-${scaleId}`);

    // 收集所有选中值
    const selectedValues = [];
    scale.groups.forEach((group, gi) => {
      const radios = document.querySelectorAll(`input[name="${scaleId}-g${gi}"]`);
      radios.forEach(radio => {
        if (radio.checked) selectedValues.push({ groupIndex: gi, value: parseInt(radio.value) });
      });
    });

    // 检查是否所有组都有选择
    if (selectedValues.length < scale.groups.length) {
      resultEl.innerHTML = `
        <div class="text-center">
          <p class="text-gray-500">已选择 ${selectedValues.length}/${scale.groups.length} 项</p>
          <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div class="bg-brand-500 h-2 rounded-full transition-all" 
                 style="width: ${(selectedValues.length / scale.groups.length) * 100}%"></div>
          </div>
        </div>
      `;
      return;
    }

    // 计算分数
    let score;
    if (scale.scoringMode === 'sum') {
      score = selectedValues.reduce((sum, s) => sum + s.value, 0);
    } else {
      score = selectedValues[0].value;
    }

    // 获取解读
    const interp = scale.resultInterpretation(score);

    const colorMap = {
      red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', badge: 'bg-red-100 text-red-800' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-800' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-800' },
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', badge: 'bg-green-100 text-green-800' },
      gray: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800', badge: 'bg-gray-100 text-gray-800' },
    };
    const c = colorMap[interp.color] || colorMap.gray;

    resultEl.className = `mt-8 p-6 ${c.bg} rounded-xl border-2 ${c.border} shadow-sm transition-all`;
    resultEl.innerHTML = `
      <div class="text-center">
        <div class="inline-flex items-center gap-3">
          <span class="score-badge text-4xl font-bold ${c.text}">${score}</span>
          <span class="text-lg font-medium ${c.text}">分</span>
        </div>
        <div class="mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${c.badge}">
          ${interp.level}
        </div>
        <p class="mt-3 ${c.text} text-sm">${interp.desc}</p>
        ${scale.scoringMode === 'sum' ? `<p class="mt-2 text-xs text-gray-500">各维度：${selectedValues.map(s => `${scale.groups[s.groupIndex].name.split('(')[0].trim()} ${s.value}`).join(' + ')} = ${score}</p>` : ''}
      </div>
    `;

    // 添加结果动画
    resultEl.style.transform = 'scale(1.02)';
    setTimeout(() => { resultEl.style.transform = 'scale(1)'; }, 200);
  }

  // ========== 切换临床备注 ==========
  window.__toggleNotes = function (scaleId) {
    const content = document.getElementById(`notes-${scaleId}`);
    const arrow = document.getElementById(`note-arrow-${scaleId}`);
    content.classList.toggle('open');
    arrow.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : '';
  };

  // ========== 启动 ==========
  document.addEventListener('DOMContentLoaded', init);
})();
