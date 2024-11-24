import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '@/hooks/use-auth';
import PageTitle from '@/components/member/page-title/page-title';
import toast from 'react-hot-toast';
// 更新會員資料
import { updateProfile } from '@/services/member';
// 修改密碼modal
import ResetPasswordModal from '@/components/member/update-password';
// 頭像上傳元件
import PreviewUploadImage from '@/components/member/avatar-preview/preview-upload-image';
// react-datepicker套件
import { BsCalendar } from 'react-icons/bs';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale';
registerLocale('zhCN', zhCN);
// 套用memberlayout
import MemberLayout from '@/components/layout/member-layout';
Member.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Member() {
  // 定義會員資料初始物件
  const initUserProfile = {
    avatar: '',
    account: '',
    name: '',
    nickname: '',
    email: '',
    phone: '',
    gender: '',
    birth: '',
    google_avatar: '',
    isPetCom: false,
  };

  const { auth, setAuth, getMember } = useAuth();
  const [userProfile, setUserProfile] = useState(initUserProfile);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (auth.isAuth) {
        const res = await getMember();

        if (res.data.status === 'success') {
          const dbMember = res.data.memberData;
          // console.log('dbMember:', dbMember);

          setUserProfile({
            avatar: dbMember.Avatar ?? '',
            account: dbMember.Account ?? '',
            name: dbMember.Name ?? '',
            nickname: dbMember.Nickname ?? '',
            email: dbMember.eMail ?? '',
            phone: dbMember.Phone ?? '',
            gender: dbMember.Gender ?? '',
            birth: dbMember.Birth ?? '',
            google_avatar: dbMember.google_avatar ?? '',
            isPetCom: dbMember.isPetCom ?? '',
          });
        }
      }
    };

    // 调用异步函数
    getUserData();
  }, [auth.isAuth, getMember]); // 依賴auth.isAuth變化時重新執行

  // 處理input輸入的共用函式，設定回userProfile狀態
  const handleFieldChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  // react-datepicker套件
  // 定義要給react-datepicker使用的選擇日期狀態
  const [startDate, setStartDate] = useState(
    // 如果有生日資料就用，沒有就用當天
    userProfile.birth ? new Date(userProfile.birth) : null
  );
  const handleDateChange = (date) => {
    // 日期有選擇onchange 就設定日期狀態
    setStartDate(date);
    // 確認日期有選擇就設定回userprofile狀態
    setUserProfile({
      ...userProfile,
      birth: date ? date.toISOString().split('T')[0] : '',
    });
  };
  useEffect(() => {
    if (userProfile.birth) {
      setStartDate(new Date(userProfile.birth));
    }
  }, [userProfile.birth]);
  // react-datepicker套件 結束

  // 送出表單用
  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault();

    // 表單驗證 - START
    if (userProfile.name === '') {
      return toast.error('請輸入姓名');
    }
    // 表單驗證 - END

    // 更新會員資料用
    // 構建 FormData 將所有資料打包
    const formData = new FormData();
    // 添加會員資料到 FormData
    for (const key in userProfile) {
      if (userProfile[key] !== null && userProfile[key] !== undefined) {
        formData.append(key, userProfile[key]);
      }
    }
    // 如果有選擇頭像文件，將文件添加到 FormData
    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    try {
      const res = await updateProfile(auth.memberData.id, formData);

      if (res.data.status === 'success') {
        setAuth({
          ...auth,
          memberData: {
            ...auth.memberData,
            name: res.data.memberData.Name ?? '',
            email: res.data.memberData.eMail ?? '',
            nickname: res.data.memberData.Nickname ?? '',
            avatar: res.data.memberData.Avatar ?? '',
            google_uid: res.data.memberData.google_uid ?? '',
            google_avatar: res.data.memberData.google_avatar ?? '',
            isPetCom: res.data.memberData.isPetCom ?? '',
          },
        });
        toast.success('會員資料與頭像修改成功');
      } else {
        toast.error(`修改失敗，${res.data.message}`);
      }
    } catch (error) {
      console.error('更新失敗:', error);
      toast.error('更新失敗，請稍後再試');
    }
  };
  // 定義修改密碼的modal開關狀態
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>Pawer寶沃 - 會員資料</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-content">
        <PageTitle title={'會員資料'} subTitle={'Member'} />
        <div className="row mt-4">
          <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <PreviewUploadImage
              avatarImg={userProfile.avatar}
              googleAvatarImg={userProfile.google_avatar}
              avatarBaseUrl={'http://localhost:3005/member'}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="account" className="form-label">
                  編號
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="account"
                  value={userProfile.account}
                  onChange={handleFieldChange}
                  disabled
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  密碼
                </label>
                <div className="w-100">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleOpenModal}
                  >
                    重設密碼
                  </button>
                  <ResetPasswordModal
                    show={showModal}
                    onClose={handleCloseModal}
                    email={userProfile.email}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="name" className="form-label required">
                  姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userProfile.name}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="nickname" className="form-label">
                  暱稱
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={userProfile.nickname}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  信箱
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={userProfile.email}
                  onChange={handleFieldChange}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  手機
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleFieldChange}
                />
              </div>
            </div>{' '}
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  性別
                </label>
                <div className="w-100">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="男"
                      checked={userProfile.gender === '男'}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      男
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="女"
                      checked={userProfile.gender === '女'}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      女
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="不願透露"
                      checked={userProfile.gender === '不願透露'}
                      onChange={handleFieldChange}
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
                <label htmlFor="birth" className="form-label">
                  出生日期
                </label>
                <DatePicker
                  icon={<BsCalendar />}
                  locale="zhCN"
                  dateFormat="yyyy-MM-dd"
                  showIcon
                  selected={startDate}
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                儲存
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
