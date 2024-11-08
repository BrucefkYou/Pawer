import Navbar from '../default-layout/navbar';
import Footer from '../default-layout/footer';
import MbSideBar from '@/components/member/sidebar';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';

export default function MemberLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container my-5">
          <Breadcrumbs />
          <div className="row">
            <aside className="col-md-3">
              {/* <aside className="col-3 d-none d-lg-block"> */}
              <MbSideBar />
            </aside>
            <article className="col-md-9">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
