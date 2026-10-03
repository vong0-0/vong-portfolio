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
/{locale} เช่น /en หรือ /lo
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
| `global.d.ts` | ประกาศ type ของ `Locale` และ `Messages` ให้ next-intl |

## Routing

ค่าปัจจุบันใน `i18n/routing.ts` คือ:

```ts
locales: ["en", "lo"]
defaultLocale: "en"
```

ดังนั้นหน้า portfolio จะอยู่ใต้ locale segment เช่น `/en` และ `/lo`
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
messages/lo.json
```

เมื่อ component ต้องการข้อความแปล สามารถเรียก `useTranslations` แล้วใช้ key
จาก message file ได้:

```tsx
const t = useTranslations("HomePage");

return <h1>{t("title")}</h1>;
```

## Message extraction และ TypeScript

`next.config.ts` ใช้ `next-intl/plugin` และกำหนดให้สร้าง declaration สำหรับ
English messages ที่ `messages/en.d.json.ts` จาก `messages/en.json` การสร้าง
declaration นี้ไม่ใช่การ extract หรือเขียนทับไฟล์ JSON ของคำแปล

`global.d.ts` นำ routing และ canonical English messages มาเชื่อมกับ
`next-intl` `AppConfig` เพื่อให้ TypeScript ช่วยตรวจ key ของคำแปลได้

## เพิ่ม locale ใหม่

เมื่อเพิ่มภาษา ให้เพิ่ม locale ใน `i18n/routing.ts` และสร้างไฟล์
`messages/{locale}.json` ที่มี message keys เดียวกับ `messages/en.json` ก่อน
จากนั้นเพิ่มตัวเลือกภาษาใน `components/ui/shared/language-button.tsx` เพื่อให้
ผู้ใช้สลับไปยัง locale ใหม่นั้นได้

การเปลี่ยน key ใน `messages/en.json` ควรทำให้สอดคล้องกับไฟล์ภาษาอื่นและ
components ที่เรียก `useTranslations` ด้วย

ตรวจการเปลี่ยนแปลงด้วย:

```bash
pnpm lint
pnpm build
```
