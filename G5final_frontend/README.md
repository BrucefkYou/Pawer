This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

`組員` 
## 第一次clone專案與建立自己的分支
1. clone專案至本機 
   1. `git clone git網址 .`
2. 建立自己的分支開始撰寫程式碼
   1. `git checkout -b "devED"`
3. 修改程式並更新自己的分支git紀錄，與更新自己支線紀錄到github上
   1. `git add .`
   2. `git commit -m "修改描述"`
   3. `git push origin devED` 
4. 切回dev環境與合併自己分支的程式碼回dev
   1. `git checkout dev` 
   2. `git merge --no-ff -m "合併描述" devED`
5. 將本機dev推至github
   1. `git push origin dev`

## 每次修改程式且要同步至dev
1. 將github的dev更新至本機dev 
   1. `git checkout dev` 
   2. `git pull origin dev`
2. 將本機dev更新回自己分支
   1. `git checkout devED` 
   2. `git merge --no-ff dev` (原本有-m "合併描述"，代表直接add與commit，省略的話可以看步驟只到把dev add到你的分支，可以到有哪些變更並人為檢查，檢查完再commit)
   3. `git commit -m "修改描述"` (dev更新回自己分支)
3. 修改程式並更新自己的分支git紀錄，與更新自己支線紀錄到github上
   1. `git add .`
   2. `git commit -m "修改描述"`
   3. `git push origin devED` 
4. 切回dev環境並pull，再次確保本地 dev 分支與遠端 dev 保持一致後，合併自己分支回dev (先pull再合併可減少衝突)
   1. `git checkout dev`
   2. `git pull origin dev`
   3. `git merge --no-ff -m "合併描述" devED`
5. 有衝突解衝突，若有處理衝突，因程式碼有變動要再記得提交
   1. `git commit -m "修改描述"`
6. 處理完衝突，將本機dev推至github
   1. `git push origin dev`
7. 結束，本機dev,devED與遠端dev,devED都是最新狀態。