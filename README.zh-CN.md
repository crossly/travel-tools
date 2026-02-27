# 💱 Tiny Currency

轻量级离线货币转换 PWA，专为旅行者设计。基于 Cloudflare Workers 构建，零客户端依赖。

## 特性

- **防 VPN 误检** — 通过浏览器时区识别货币，而非仅依赖 IP 地址
- **实时转换** — 输入即转换，无需点击按钮
- **货币选择器** — 点击 source/target 区域可切换 50+ 种货币，支持搜索
- **离线可用** — Service Worker 缓存页面和汇率数据
- **深色模式** — 自动跟随系统主题
- **移动优先** — 可安装的 PWA，适配刘海屏，针对手机优化

## 技术栈

| 层级 | 技术 |
|------|------|
| 运行时 | Cloudflare Workers |
| 框架 | [Hono](https://hono.dev) |
| 语言 | TypeScript + JSX |
| 存储 | Cloudflare KV（汇率缓存）|
| 汇率源 | [Frankfurter](https://frankfurter.app) |
| 前端 | 原生 JS（无框架）|

## 快速开始

### 前置要求

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Cloudflare 账号 + KV 命名空间

### 安装

```bash
git clone https://github.com/crossly/tiny-currency.git
cd tiny-currency
npm install
```

创建 KV 命名空间并更新 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "RATES_KV"
id = "your-kv-namespace-id"
```

### 本地开发

```bash
npm run dev
```

### 部署

```bash
npm run deploy
```

## 工作原理

### 货币检测

1. 浏览器发送系统时区（如 `Asia/Shanghai`）至 `/api/detect`
2. 服务端分别通过时区和 IP 映射货币
3. 两者不同时（VPN 场景），优先时区结果
4. 用户可随时通过货币选择器手动切换

### 汇率更新

- 每小时定时任务预缓存 8 种主要货币（USD、EUR、GBP、JPY、CNY、AUD、CAD、CHF）
- 其他币种按需获取
- 汇率在 KV 中缓存 1 小时

## 项目结构

```
src/
├── index.tsx            # Hono 应用 & 路由
├── api/
│   ├── detect.ts        # 位置检测 API
│   └── rates.ts         # 汇率 API
├── pages/
│   ├── home.tsx         # 转换器 UI + 货币选择器
│   └── setup.tsx        # 引导设置流程
├── components/
│   └── layout.tsx       # 公共布局 & 样式
├── lib/
│   ├── currencies.ts    # 货币数据 & 时区映射
│   └── cron.ts          # 定时汇率更新
└── static/
    ├── app.ts           # SW 注册
    ├── sw.ts            # Service Worker
    └── manifest.ts      # PWA 清单
```

## 许可证

ISC
