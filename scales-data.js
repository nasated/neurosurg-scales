/**
 * 神经外科量表数据定义
 * 每个量表包含：id, name, fullName, description, reference, doi, clinicalNotes, groups
 * groups 包含：name, items[{label, value, detail}]
 */
const SCALES_DATA = [
  // ==================== GCS ====================
  {
    id: 'gcs',
    name: 'GCS',
    fullName: 'Glasgow Coma Scale',
    fullNameCN: '格拉斯哥昏迷量表',
    description: '评估意识障碍程度，广泛用于创伤性和非创伤性脑损伤',
    reference: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. Lancet. 1974;2(7872):81-84.',
    doi: '10.1016/S0140-6736(74)91639-0',
    clinicalNotes: [
      '⚡ 插管患者言语反应记为"T"（Tube），总分记录为 E_V_M+T，如 E2V_TM4 = 2+T+4 = 6+T',
      '⚡ 眼睑水肿无法睁眼时，睁眼反应记为"C"（Closed），注明原因',
      '⚠️ 应在镇静/肌松药物使用前评估，用药后评估需标注',
      '⚠️ GCS 最低分为 3（不是 0），3 分不代表"没有反应"而是"最差反应"',
      '📌 15-13 分为轻度，12-9 分为中度，≤8 分为重度（需考虑气道保护）',
      '📌 运动反应是最具预后预测价值的单项指标',
      '📌 记录时应注明评估时间点（入院时/术前/术后）及是否使用镇静药物',
      '📚 与 GCS-P (GCS-Pupils) 联合使用可提高预后预测准确性'
    ],
    scoringMode: 'sum', // sum of selected values
    resultInterpretation: (score) => {
      if (score <= 8) return { level: '重度', color: 'red', desc: '昏迷，需紧急评估气道保护' };
      if (score <= 12) return { level: '中度', color: 'orange', desc: '意识障碍，需密切观察' };
      if (score <= 14) return { level: '轻度', color: 'yellow', desc: '轻度意识改变' };
      return { level: '正常', color: 'green', desc: '意识清楚' };
    },
    groups: [
      {
        name: '睁眼反应 (E, Eye Opening)',
        items: [
          { label: '4 - 自发睁眼', value: 4, detail: 'Spontaneous: 正常自发睁眼' },
          { label: '3 - 呼唤睁眼', value: 3, detail: 'To voice: 对言语指令睁眼' },
          { label: '2 - 刺痛睁眼', value: 2, detail: 'To pain: 对疼痛刺激睁眼' },
          { label: '1 - 不睁眼', value: 1, detail: 'None: 对任何刺激均不睁眼' },
        ]
      },
      {
        name: '言语反应 (V, Verbal Response)',
        items: [
          { label: '5 - 回答正确', value: 5, detail: 'Oriented: 时间、地点、人物定向力正常' },
          { label: '4 - 回答错误', value: 4, detail: 'Confused: 有言语但定向力障碍' },
          { label: '3 - 胡言乱语', value: 3, detail: 'Inappropriate words: 可辨单词但无意义句子' },
          { label: '2 - 只能发音', value: 2, detail: 'Incomprehensible sounds: 呻吟等无意义声音' },
          { label: '1 - 不发音', value: 1, detail: 'None: 无言语反应' },
        ]
      },
      {
        name: '运动反应 (M, Motor Response)',
        items: [
          { label: '6 - 遵嘱运动', value: 6, detail: 'Obeys commands: 按指令做动作' },
          { label: '5 - 定位刺痛', value: 5, detail: 'Localizes pain: 手可定位到疼痛部位' },
          { label: '4 - 刺痛屈曲（回缩）', value: 4, detail: 'Normal flexion (withdrawal): 正常屈曲回缩' },
          { label: '3 - 异常屈曲（去皮层）', value: 3, detail: 'Abnormal flexion (decorticate): 上肢屈曲内旋，下肢伸直' },
          { label: '2 - 伸直（去脑）', value: 2, detail: 'Extension (decerebrate): 四肢伸直内旋' },
          { label: '1 - 无反应', value: 1, detail: 'None: 对疼痛无运动反应' },
        ]
      }
    ]
  },

  // ==================== Hunt-Hess ====================
  {
    id: 'hunt-hess',
    name: 'Hunt-Hess',
    fullName: 'Hunt-Hess Scale',
    fullNameCN: 'Hunt-Hess 动脉瘤性蛛网膜下腔出血分级',
    description: '评估动脉瘤性蛛网膜下腔出血(aSAH)患者的临床严重程度，指导手术时机和预后判断',
    reference: 'Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.',
    doi: '10.3171/jns.1968.28.1.0014',
    clinicalNotes: [
      '⚡ 分级应以入院时（而非术前最差状态）的神经系统检查为准',
      '⚡ 合并严重全身疾病（高血压、糖尿病、严重动脉硬化、慢性肺病）时，分级提升一级',
      '⚠️ 仅适用于动脉瘤性 SAH，不适用于外伤性 SAH 或其他原因的 SAH',
      '⚠️ 与 WFNS 分级不同：WFNS 仅基于 GCS 和运动缺陷，Hunt-Hess 包含头痛/脑膜刺激征',
      '📌 I-II 级建议早期（72h内）手术夹闭或介入栓塞',
      '📌 IV-V 级手术时机存在争议，部分中心建议先保守治疗待改善后再手术',
      '📌 有研究显示 Hunt-Hess 分级间预后差异不如 WFNS 明显（inter-observer variability 较大）',
      '📚 常与 Fisher/Modified Fisher 分级联合使用，后者评估血管痉挛风险'
    ],
    scoringMode: 'single', // single selection, value = grade
    resultInterpretation: (score) => {
      const map = {
        1: { level: 'I 级', color: 'green', desc: '无症状或轻度头痛、颈项强直' },
        2: { level: 'II 级', color: 'yellow', desc: '中重度头痛、脑膜刺激征，除颅神经麻痹外无神经功能缺损' },
        3: { level: 'III 级', color: 'orange', desc: '嗜睡、意识模糊、轻度局灶神经功能缺损' },
        4: { level: 'IV 级', color: 'red', desc: '昏迷、中重度偏瘫、早期去脑强直' },
        5: { level: 'V 级', color: 'red', desc: '深昏迷、去脑强直、濒死状态' },
      };
      return map[score] || { level: '未选择', color: 'gray', desc: '' };
    },
    groups: [
      {
        name: 'Hunt-Hess 分级',
        items: [
          {
            label: 'I 级',
            value: 1,
            detail: '无症状，或轻度头痛及颈项强直。Asymptomatic, or minimal headache and slight nuchal rigidity.'
          },
          {
            label: 'II 级',
            value: 2,
            detail: '中重度头痛，颈项强直，除颅神经麻痹外无神经功能缺损。Moderate to severe headache, nuchal rigidity, no neurologic deficit except cranial nerve palsy.'
          },
          {
            label: 'III 级',
            value: 3,
            detail: '嗜睡、意识模糊或轻度局灶神经功能缺损。Drowsiness, confusion, or mild focal deficit.'
          },
          {
            label: 'IV 级',
            value: 4,
            detail: '昏迷，中重度偏瘫，可能有早期去脑强直。Stupor, moderate to severe hemiparesis, possible early decerebrate rigidity.'
          },
          {
            label: 'V 级',
            value: 5,
            detail: '深昏迷，去脑强直，濒死状态。Deep coma, decerebrate rigidity, moribund appearance.'
          },
        ]
      }
    ]
  },

  // ==================== ICH Score ====================
  {
    id: 'ich-score',
    name: 'ICH Score',
    fullName: 'ICH Score',
    fullNameCN: '自发性脑出血评分',
    description: '评估自发性脑出血(ICH)患者30天死亡率，用于风险分层和临床决策',
    reference: 'Hemphill JC 3rd, Bonovich DC, Besmertis L, Manley GT, Johnston SC. The ICH score: a simple, reliable grading scale for intracerebral hemorrhage. Stroke. 2001;32(4):891-897.',
    doi: '10.1161/01.STR.32.4.891',
    clinicalNotes: [
      '⚡ 血肿体积测量采用 ABC/2 法：A=最大径(cm)，B=与A垂直的最大径(cm)，C=层面数×层厚(cm)/层数中含血肿的层数',
      '⚡ ABC/2 法假设血肿为椭球形，不规则形态（如分叶状）可能高估体积，有条件时以 CT 体积测量为准',
      '⚠️ 仅适用于自发性脑出血，不适用于外伤性脑出血、脑肿瘤出血或梗死出血转化',
      '⚠️ 脑室内出血(IVH)不等于"破入脑室"——即使少量 IVH 也记 1 分',
      '📌 0 分：30天死亡率约 0%；1 分：约 13%；2 分：约 26%；3 分：约 56%；4 分：约 97%；5+ 分：约 100%',
      '📌 GCS 评分应取入院时首次评估，且尽量在镇静前',
      '📌 年龄阈值 80 岁是原始研究的截断值，后续验证研究有争议',
      '📚 有改良版 ICH Score (ICH-GS, FUNC Score) 可参考，但原始 ICH Score 仍是应用最广泛的'
    ],
    scoringMode: 'sum',
    resultInterpretation: (score) => {
      const mortality = {
        0: '~0%', 1: '~13%', 2: '~26%', 3: '~56%', 4: '~97%', 5: '~100%', 6: '~100%'
      };
      if (score <= 1) return { level: `${score} 分`, color: 'green', desc: `30天死亡率 ${mortality[score]}，预后较好` };
      if (score <= 2) return { level: `${score} 分`, color: 'yellow', desc: `30天死亡率 ${mortality[score]}，中等风险` };
      if (score <= 3) return { level: `${score} 分`, color: 'orange', desc: `30天死亡率 ${mortality[score]}，高风险` };
      return { level: `${score} 分`, color: 'red', desc: `30天死亡率 ${mortality[score] || '极高'}，极高风险` };
    },
    groups: [
      {
        name: 'GCS 评分',
        items: [
          { label: 'GCS 3-4', value: 2, detail: '深度昏迷' },
          { label: 'GCS 5-12', value: 1, detail: '中度意识障碍' },
          { label: 'GCS 13-15', value: 0, detail: '轻度或无意识障碍' },
        ]
      },
      {
        name: '血肿体积',
        items: [
          { label: '≥ 30 mL', value: 1, detail: 'ABC/2 法或 CT 容积法测量' },
          { label: '< 30 mL', value: 0, detail: 'ABC/2 法或 CT 容积法测量' },
        ]
      },
      {
        name: '破入脑室 (IVH)',
        items: [
          { label: '是', value: 1, detail: 'CT 显示任何程度的脑室内积血' },
          { label: '否', value: 0, detail: 'CT 未显示脑室内积血' },
        ]
      },
      {
        name: '血肿位置',
        items: [
          { label: '幕下（脑干/小脑）', value: 1, detail: 'Infratentorial: 脑干或小脑出血' },
          { label: '幕上', value: 0, detail: 'Supratentorial: 基底节、丘脑、脑叶等' },
        ]
      },
      {
        name: '年龄',
        items: [
          { label: '≥ 80 岁', value: 1, detail: '' },
          { label: '< 80 岁', value: 0, detail: '' },
        ]
      }
    ]
  }
];
