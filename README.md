# Neurosurg Scales | 神经外科临床量表计算器

> 由神经外科临床医生维护，每个量表附原始文献 DOI 和临床使用场景。
> 
> Maintained by a neurosurgeon. Every scale includes original literature DOI and clinical context.

## 为什么做这个？

- 现有中文量表网站要么广告满天飞，要么字段错误，这是真实痛点
- 每个量表附**临床备注**——哪些坑、什么时机用、什么病人群体——这是野生开发者写不出来的
- 医学准确性 > 代码量

## 已收录量表

| 量表 | 用途 | 原始文献 |
|------|------|----------|
| GCS (Glasgow Coma Scale) | 意识障碍评估 | Teasdale & Jennett, 1974 |
| Hunt-Hess Scale | 动脉瘤性蛛网膜下腔出血分级 | Hunt & Hess, 1968 |
| ICH Score | 自发性脑出血预后评估 | Hemphill et al., 2001 |

## 计划收录

- WFNS Scale
- Spetzler-Martin AVM Grading
- Fisher Scale / Modified Fisher Scale
- mRS (Modified Rankin Scale)
- ASIA Impairment Scale
- Karnofsky Performance Scale
- CPA Tumor Grading

## 使用

👉 **在线访问**: [https://nasated.github.io/neurosurg-scales](https://nasated.github.io/neurosurg-scales)

## 本地开发

```bash
# 无需构建工具，直接用浏览器打开 index.html
# 或使用任意静态服务器
npx serve .
```

## 技术栈

- 纯 HTML + Tailwind CSS (CDN) + 原生 JavaScript
- 零构建依赖，单页面应用
- 移动端优先响应式设计

## 免责声明

本工具仅供临床参考，不构成诊疗建议。所有临床决策应由有资质的医师根据患者具体情况做出。

## License

MIT
