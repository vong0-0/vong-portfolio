# Internationalization (i18n) Setup

เอกสารนี้อธิบายโครงสร้าง i18n ปัจจุบันของ portfolio ซึ่งใช้
[`next-intl`](https://next-intl.dev/) กับ Next.js App Router

## ภาพรวมการทำงาน

```text
ผู้ใช้เปิด URL
     │
     ▼
proxy.ts (next-intl middleware)
     │  ตรวจ/เพิ่ม locale prefix ตาม i18n/routing.ts
     ▼
/{locale} เช่น /en หรือ /de
     │
     ▼
app/[locale]/layout.tsx
     │  ├─ โหลด global CSS, font, metadata และ HeaderActions
     │  └─ ครอบหน้าด้วย NextIntlClientProvider
     ▼
app/[locale]/page.tsx
     │
     ▼
i18n/request.ts
     │  ├─ อ่าน locale ของ request/root parameter
     │  ├─ ตรวจว่า locale อยู่ใน routing.locales
     │  └─ โหลด messages/{locale}.json
     ▼
useTranslations() ใน Server/Client Components
```

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
| --- | --- |
| `i18n/routing.ts` | ระบุ locale ที่รองรับและ default locale |
| `proxy.ts` | next-intl middleware สำหรับจัดการ locale ใน URL |
| `app/[locale]/layout.tsx` | Root layout ของแต่ละ locale และที่ตั้งของ `NextIntlClientProvider` |
| `app/[locale]/page.tsx` | หน้า portfolio สำหรับ route ที่มี locale prefix |
| `i18n/request.ts` | สร้าง request configuration และโหลด translation messages ให้ next-intl |
| `messages/*.json` | ข้อความแปลแยกตาม locale |
| `next.config.ts` | เปิด next-intl plugin และการ extract messages แบบทดลอง |
| `global.d.ts` | ประกาศ type ของ `Locale`, `Messages` และ `Formats` ให้ next-intl |

## Routing

ค่าปัจจุบันใน `i18n/routing.ts` คือ:

```ts
locales: ["en", "de"]
defaultLocale: "en"
```

ดังนั้นหน้า portfolio จะอยู่ใต้ locale segment เช่น `/en` และ `/de`
แทนหน้า root เดิม (`/`) โดย `proxy.ts` จะจัดการ request ที่ไม่มี locale
prefix ตาม routing configuration

## การโหลดคำแปล

`i18n/request.ts` รับ locale จาก next-intl ก่อน หากยังไม่มีค่า จะอ่าน root
parameter ชื่อ `locale` จาก dynamic route แล้วตรวจด้วย `hasLocale`:

```ts
messages: (await import(`../messages/${locale}.json`)).default
```

นั่นหมายความว่า ทุก locale ใน `routing.locales` ต้องมีไฟล์ message ที่ชื่อ
ตรงกัน เช่น:

```text
messages/en.json
messages/de.json
```

เมื่อ component ต้องการข้อความแปล สามารถเรียก `useTranslations` แล้วใช้ key
จาก message file ได้:

```tsx
const t = useTranslations("HomePage");

return <h1>{t("title")}</h1>;
```

## Message extraction และ TypeScript

`next.config.ts` เปิด `next-intl/plugin` พร้อม experimental extraction:

- scan source ภายใต้ `./app`
- อ่าน/สร้าง messages แบบ JSON ใน `./messages`
- ใช้ `en` เป็น source locale
- สร้าง declaration ที่ `messages/en.d.json.ts`

`global.d.ts` นำ routing และ canonical English messages มาเชื่อมกับ
`next-intl` `AppConfig` เพื่อให้ TypeScript ช่วยตรวจ key ของคำแปลได้

## จุดที่ต้องทำให้ตรงกันก่อนใช้งานหลายภาษา

ปัจจุบันมีรายละเอียดที่ควรปรับให้สอดคล้องกันก่อนเปิดใช้ locale อื่นจริง:

1. `routing.locales` มี `en` และ `de` แต่ใน `messages/` มี `en.json` และ
   `th.json` ยังไม่มี `de.json` ดังนั้น `/de` จะไม่สามารถโหลด message file ได้
   จนกว่าจะเพิ่ม `messages/de.json` หรือเปลี่ยน locale list เป็น locale ที่มีไฟล์
   อยู่จริง
2. `app/[locale]/layout.tsx` ยังระบุ `LayoutProps<"/[local]">` ซึ่งไม่ตรงกับ
   directory `[locale]`; ควรเปลี่ยนเป็น `LayoutProps<"/[locale]">`
3. `global.d.ts` import `formats` จาก `i18n/request.ts` แต่ไฟล์นั้นยังไม่ได้
   export `formats`; ต้องเพิ่ม export หรือเอา `Formats` ออกจาก declaration
4. `messages/en.json` และ `messages/th.json` ยังเป็น object ว่าง จึงยังไม่มี
   key สำหรับข้อความบนหน้า portfolio

หลังปรับจุดเหล่านี้ ให้ตรวจด้วย:

```bash
pnpm lint
pnpm build
```
