import { BsCamera } from 'react-icons/bs';
import MemberLayout from '@/components/layout/member-layout';
Member.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Member() {
  return (
    <>
      <article className="col-md-9">
        <div className="mb-content">
          <h5 className="title">
            會員資料 <span className="text-warning">Member</span>
            <div className="underline">
              <div className="underline-part1"></div>
              <div className="underline-part2"></div>
            </div>
          </h5>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
              <div className="mb-3">
                <div className="profile">
                  <div className="picture">
                    <img className="avatar" src="/member/member-profile.png" />
                  </div>
                  <button type="file" className="camera-icon">
                    <BsCamera />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    帳號
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account"
                    disabled
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    密碼
                  </label>
                  <div className="w-100">
                    <button type="button" className="btn btn-primary">
                      設定新密碼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label required">
                  姓名
                </label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label">
                  暱稱
                </label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label required">
                  信箱
                </label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label required">
                  手機
                </label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>{' '}
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label required">
                  性別
                </label>
                <div className="w-100">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      男
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      女
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      不願透露
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account" className="form-label required">
                  出生日期
                </label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-4">
              <button type="button" className="btn btn-primary">
                儲存
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
