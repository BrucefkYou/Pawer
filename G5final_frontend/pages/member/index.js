import Pagination from '@/components/pagination/pagination';
import AdminLayout from '@/components/layout/admin-layout';
member.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default function member() {
  return (
    <>
      <div className="container justify-content-center my-5">
        <div className="row">
          <aside className="col-3">
            <h5>會員中心</h5>
          </aside>
          <article className="col-9">
            <h5>會員中心</h5>
            <div className="d-flex justify-content-center">
              1
              <Pagination />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
