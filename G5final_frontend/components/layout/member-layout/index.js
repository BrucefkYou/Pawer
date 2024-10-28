import Navbar from '../default-layout/navbar';
import Footer from '../default-layout/footer';
import MbSideBar from '@/components/member/sidebar';

export default function MemberLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container my-5">
          <div className="row">
            <aside className="col-md-3">
              {/* <aside className="col-3 d-none d-lg-block"> */}
              <MbSideBar />
            </aside>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
