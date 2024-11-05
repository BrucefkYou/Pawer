import React, { useState, useEffect } from 'react';
import { BsCamera } from 'react-icons/bs';
import { useAuth } from '@/hooks/use-auth';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import Image from 'next/image';
Member.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Member() {
  const { auth, setAuth, getMember } = useAuth();
  const [member, setMember] = useState({
    account: '',
    name: '',
    nickname: '',
    email: '',
    phone: '',
    gender: '',
    birth: '',
  });

  // 初始化會員資料
  const initMemberData = async () => {
    const dbmember = await getMember();
    setMember({
      account: dbmember.Account,
      name: dbmember.Name,
      nickname: dbmember.Nickname,
      email: dbmember.eMail,
      phone: dbmember.Phone,
      gender: dbmember.Gender,
      birth: dbmember.Birth,
    });
  };
  // 本頁一開始render後就會設定到會員資料
  useEffect(() => {
    initMemberData();
  }, []);

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    let nextMember = { ...member, [e.target.name]: e.target.value };
    setMember(nextMember);
  };

  return (
    <>
      <div className="mb-content">
        <PageTitle title={'會員資料'} subTitle={'Member'} />
        <div className="row mt-4">
          <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <div className="mb-3">
              <div className="profile">
                <div className="picture">
                  <Image
                    className="avatar"
                    src="/member/member-profile.png"
                    alt=""
                    width={150}
                    height={150}
                  />
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
                  name="account"
                  value={member.account}
                  onChange={handleFieldChange}
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
              <input
                type="text"
                className="form-control"
                name="name"
                value={member.name}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="account" className="form-label">
                暱稱
              </label>
              <input
                type="text"
                className="form-control"
                name="nickname"
                value={member.nickname}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="account" className="form-label required">
                信箱
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={member.email}
                onChange={handleFieldChange}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="account" className="form-label required">
                手機
              </label>
              <input
                type="text"
                className="form-control"
                name="account"
                value={member.phone}
                onChange={handleFieldChange}
              />
            </div>
          </div>{' '}
          {/* <div className="col-md-6 col-sm-12">
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
                      name="inlineRadio1"
                      defaultValue="option1  || ''"
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
                      name="inlineRadio1"
                      defaultValue="option1  || ''"
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
                      name="inlineRadio1"
                      defaultValue="option1  || ''"
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
                <input type="text" className="form-control" name="account" />
              </div>
            </div> */}
          <div className="col-12 d-flex justify-content-center mt-4">
            <button type="button" className="btn btn-primary">
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
