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
  },

  // ==================== WFNS ====================
  {
    id: 'wfns',
    name: 'WFNS',
    fullName: 'WFNS Scale',
    fullNameCN: '世界神经外科联盟蛛网膜下腔出血分级',
    description: '基于GCS和运动缺陷的动脉瘤性蛛网膜下腔出血(aSAH)分级，观察者间一致性优于Hunt-Hess',
    reference: 'Report of World Federation of Neurological Surgeons Committee on a universal subarachnoid hemorrhage grading scale. J Neurosurg. 1988;68(6):985-986.',
    doi: '10.3171/jns.1988.68.6.0985',
    clinicalNotes: [
      '⚡ 仅基于GCS评分和有无运动缺陷，不含主观症状（如头痛程度）',
      '⚡ 运动缺陷定义为：与出血前相比新出现的偏瘫、单瘫或截瘫',
      '⚠️ 与Hunt-Hess不同：WFNS不包含头痛、脑膜刺激征等主观指标',
      '⚠️ 颅神经麻痹（如动眼神经麻痹）不算"运动缺陷"',
      '📌 I-II级预后良好，建议早期干预（72h内）',
      '📌 III级存在争议：部分中心积极手术，部分保守治疗',
      '📌 IV-V级预后差，但积极手术仍有部分患者可获良好预后',
      '📚 常与Fisher/Modified Fisher联合使用评估血管痉挛风险'
    ],
    scoringMode: 'single',
    resultInterpretation: (score) => {
      const map = {
        1: { level: 'I 级', color: 'green', desc: 'GCS 15，无运动缺陷' },
        2: { level: 'II 级', color: 'green', desc: 'GCS 14-13，无运动缺陷' },
        3: { level: 'III 级', color: 'yellow', desc: 'GCS 14-13，有运动缺陷' },
        4: { level: 'IV 级', color: 'orange', desc: 'GCS 12-7，有或无运动缺陷' },
        5: { level: 'V 级', color: 'red', desc: 'GCS 6-3，有或无运动缺陷' },
      };
      return map[score] || { level: '未选择', color: 'gray', desc: '' };
    },
    groups: [
      {
        name: 'WFNS 分级',
        items: [
          { label: 'I 级', value: 1, detail: 'GCS 15，无运动缺陷' },
          { label: 'II 级', value: 2, detail: 'GCS 14-13，无运动缺陷' },
          { label: 'III 级', value: 3, detail: 'GCS 14-13，有运动缺陷' },
          { label: 'IV 级', value: 4, detail: 'GCS 12-7，有或无运动缺陷' },
          { label: 'V 级', value: 5, detail: 'GCS 6-3，有或无运动缺陷' },
        ]
      }
    ]
  },

  // ==================== Fisher / Modified Fisher ====================
  {
    id: 'fisher',
    name: 'Fisher',
    fullName: 'Fisher Scale / Modified Fisher Scale',
    fullNameCN: 'Fisher分级 / 改良Fisher分级',
    description: '评估蛛网膜下腔出血(SAH)后脑血管痉挛风险，改良版(Frontera et al.)预测准确性更高',
    reference: 'Fisher CM, Kistler JP, Davis JM. Relation of cerebral vasospasm to subarachnoid hemorrhage visualized by computerized tomographic scanning. Neurosurgery. 1980;6(1):1-9. / Frontera JA, et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale. Neurosurgery. 2006;59(1):21-27.',
    doi: '10.1227/01.NEU.0000285761.22490.0F',
    clinicalNotes: [
      '⚡ Fisher分级基于CT上SAH的厚度和分布，不反映临床严重程度',
      '⚡ Modified Fisher在原始Fisher基础上增加了脑室出血(IVH)的权重',
      '⚠️ Fisher 1级（无出血）和2级（薄层出血，厚度<1mm）的区分有时较主观',
      '⚠️ 仅适用于aSAH，不适用于外伤性SAH',
      '📌 Modified Fisher 3-4级为症状性血管痉挛的高危人群，需加强TCD监测',
      '📌 血管痉挛风险：Modified Fisher 0级≈6%，1级≈13%，2级≈24%，3级≈33%，4级≈40%',
      '📌 与Hunt-Hess/WFNS不同：Fisher分级不用于指导手术时机，仅用于预测血管痉挛',
      '📚 改良版(2006)比原始版(1980)预测症状性血管痉挛的准确性更高'
    ],
    scoringMode: 'single',
    resultInterpretation: (score) => {
      const map = {
        0: { level: 'Modified 0 级', color: 'green', desc: '无SAH或IVH' },
        1: { level: 'Modified 1 级', color: 'green', desc: '薄层SAH（<1mm），无IVH' },
        2: { level: 'Modified 2 级', color: 'yellow', desc: '薄层SAH（<1mm），伴IVH' },
        3: { level: 'Modified 3 级', color: 'orange', desc: '厚层SAH（≥1mm），无IVH' },
        4: { level: 'Modified 4 级', color: 'red', desc: '厚层SAH（≥1mm），伴IVH' },
      };
      return map[score] || { level: '未选择', color: 'gray', desc: '' };
    },
    groups: [
      {
        name: 'Modified Fisher 分级',
        items: [
          { label: '0 级', value: 0, detail: '无SAH或IVH（CT未见出血）' },
          { label: '1 级', value: 1, detail: '薄层SAH（<1mm），无脑室内出血' },
          { label: '2 级', value: 2, detail: '薄层SAH（<1mm），伴脑室内出血' },
          { label: '3 级', value: 3, detail: '厚层SAH（≥1mm），无脑室内出血' },
          { label: '4 级', value: 4, detail: '厚层SAH（≥1mm），伴脑室内出血' },
        ]
      }
    ]
  },

  // ==================== mRS ====================
  {
    id: 'mrs',
    name: 'mRS',
    fullName: 'Modified Rankin Scale',
    fullNameCN: '改良Rankin量表',
    description: '评估卒中后神经功能预后，是卒中临床试验的标准终点指标，也用于其他神经系统疾病',
    reference: 'Rankin J. Cerebral vascular accidents in patients over the age of 60. II. Prognosis. Scott Med J. 1957;2(5):200-215. / van Swieten JC, et al. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.',
    doi: '10.1161/01.STR.19.5.604',
    clinicalNotes: [
      '⚡ 评估的是"残疾程度"而非神经功能缺损，强调对日常生活的影响',
      '⚡ 评估时间点至关重要：发病后90天是卒中研究的标准时间点',
      '⚡ 评分前需确认患者发病前的功能状态（部分患者发病前已有残疾）',
      '⚠️ mRS 0-1分通常定义为"功能独立"或"良好预后"（favorable outcome）',
      '⚠️ 6分（死亡）有时被排除在mRS分析之外，需注明统计方法',
      '📌 0-2分：功能独立；3-5分：依赖他人；6分：死亡',
      '📌 评估方式：面对面访谈 > 电话随访 > 病历回顾（准确性递减）',
      '📚 有结构化访谈工具(mRS-SI)可提高评估一致性'
    ],
    scoringMode: 'single',
    resultInterpretation: (score) => {
      const map = {
        0: { level: '0 分', color: 'green', desc: '完全无症状' },
        1: { level: '1 分', color: 'green', desc: '有症状但无明显残疾，能完成日常活动' },
        2: { level: '2 分', color: 'yellow', desc: '轻度残疾，不能完成病前所有活动，但无需帮助可自理' },
        3: { level: '3 分', color: 'orange', desc: '中度残疾，需部分帮助，但可独立行走' },
        4: { level: '4 分', color: 'red', desc: '中重度残疾，不能独立行走，需他人帮助完成日常生活' },
        5: { level: '5 分', color: 'red', desc: '重度残疾，卧床不起，大小便失禁，需持续护理' },
        6: { level: '6 分', color: 'gray', desc: '死亡' },
      };
      return map[score] || { level: '未选择', color: 'gray', desc: '' };
    },
    groups: [
      {
        name: 'mRS 评分',
        items: [
          { label: '0 - 完全无症状', value: 0, detail: 'No symptoms at all' },
          { label: '1 - 有症状但无明显残疾', value: 1, detail: 'No significant disability despite symptoms; able to carry out all usual duties and activities' },
          { label: '2 - 轻度残疾', value: 2, detail: 'Slight disability; unable to carry out all previous activities, but able to look after own affairs without assistance' },
          { label: '3 - 中度残疾', value: 3, detail: 'Moderate disability; requiring some help, but able to walk without assistance' },
          { label: '4 - 中重度残疾', value: 4, detail: 'Moderately severe disability; unable to walk without assistance and unable to attend to own bodily needs without assistance' },
          { label: '5 - 重度残疾', value: 5, detail: 'Severe disability; bedridden, incontinent and requiring constant nursing care and attention' },
          { label: '6 - 死亡', value: 6, detail: 'Dead' },
        ]
      }
    ]
  },

  // ==================== Spetzler-Martin AVM ====================
  {
    id: 'spetzler-martin',
    name: 'S-M AVM',
    fullName: 'Spetzler-Martin Grading System',
    fullNameCN: 'Spetzler-Martin 脑动静脉畸形分级',
    description: '评估脑动静脉畸形(AVM)显微手术切除的风险和难度，指导治疗策略选择',
    reference: 'Spetzler RF, Martin NA. A proposed grading system for arteriovenous malformations. J Neurosurg. 1986;65(4):476-483.',
    doi: '10.3171/jns.1986.65.4.0476',
    clinicalNotes: [
      '⚡ 总分 = 病灶大小(1-3) + 静脉引流方式(0-1) + 功能区位置(0-1)，范围1-5分',
      '⚡ 深部静脉引流包括：深静脉系统（大脑内静脉、基底静脉、Galen静脉等）',
      '⚡ 功能区(Eloquent area)包括：感觉运动皮层、语言区、视觉皮层、丘脑、内囊、脑干、小脑脚、深部核团',
      '⚠️ 5分（V级）手术致残率极高，通常建议保守治疗或放射外科',
      '⚠️ 3分（III级）是"分水岭"：部分可手术，部分建议分期或联合治疗',
      '📌 I-II级：手术风险低，建议显微手术切除',
      '📌 III级：需个体化评估，可考虑术前栓塞+手术、或分期手术',
      '📌 IV-V级：手术风险高，首选放射外科（如伽玛刀）或保守观察',
      '📚 补充评分：Lawton-Young补充分级可进一步提高预后预测准确性'
    ],
    scoringMode: 'sum',
    resultInterpretation: (score) => {
      if (score <= 2) return { level: `${score} 分`, color: 'green', desc: '低级别，建议手术切除' };
      if (score === 3) return { level: `${score} 分`, color: 'yellow', desc: '中等级别，需个体化评估' };
      if (score <= 5) return { level: `${score} 分`, color: 'red', desc: '高级别，手术风险高，考虑替代治疗' };
      return { level: `${score} 分`, color: 'gray', desc: '' };
    },
    groups: [
      {
        name: '病灶大小 (Size)',
        items: [
          { label: '小型 (< 3 cm)', value: 1, detail: '直径小于3厘米' },
          { label: '中型 (3-6 cm)', value: 2, detail: '直径3-6厘米' },
          { label: '大型 (> 6 cm)', value: 3, detail: '直径大于6厘米' },
        ]
      },
      {
        name: '静脉引流 (Venous Drainage)',
        items: [
          { label: '浅表引流', value: 0, detail: '仅引流至浅表静脉系统（上矢状窦、横窦等）' },
          { label: '深部引流', value: 1, detail: '引流至深部静脉系统（大脑内静脉、Galen静脉等）' },
        ]
      },
      {
        name: '功能区 (Eloquent Area)',
        items: [
          { label: '非功能区', value: 0, detail: '病灶位于非功能区' },
          { label: '功能区', value: 1, detail: '病灶位于功能区（感觉运动皮层、语言区、视觉皮层、丘脑、内囊、脑干、小脑脚、深部核团）' },
        ]
      }
    ]
  }
];
