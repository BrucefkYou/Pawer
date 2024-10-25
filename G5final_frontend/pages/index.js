import { Inter } from 'next/font/google';
import Pagination from '@/components/pagination/pagination';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <section className="p-5">
        <h1 className="text-warning">h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
        <h6>h6</h6>
        <div>
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <button type="button" className="btn btn-warning">
            Warning
          </button>
          <button type="button" className="btn btn-danger">
            Danger
          </button>
          <hr />
          <button type="buttn" className="btn btn-outline-primary">
            Primary
          </button>
          <button type="buttn" className="btn btn-outline-warning">
            Primary
          </button>
        </div>
        <Pagination />
      </section>
    </>
  );
}
