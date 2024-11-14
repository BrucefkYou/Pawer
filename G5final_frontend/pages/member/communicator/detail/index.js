import MemberLayout from '@/components/layout/member-layout';
import ComDetail from '@/components/pet/comDetail/ComDetail';
import Head from 'next/head';
ComDetailIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComDetailIndex(props) {
  return (
    <>
      <Head>
        <title>寵物溝通師 - 溝通師資料</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="PT-mydetail">
        <ComDetail />
      </div>
    </>
  );
}
