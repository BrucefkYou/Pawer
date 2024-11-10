import MemberLayout from '@/components/layout/member-layout';
import ComDetail from '@/components/pet/comDetail/ComDetail';
ComDetailIndex.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function ComDetailIndex(props) {
  return (
    <>
      <div className="PT-mydetail">
        <ComDetail />
      </div>
    </>
  )
}
