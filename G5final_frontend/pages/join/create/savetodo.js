import toast from 'react-hot-toast';

const saveToDo = async (
  title,
  joinTitle,
  imageName,
  auth,
  data,
  startTime,
  endTime,
  count,
  signEndDate,
  city,
  township,
  location,
  tags,
  router
) => {
  if (!title) {
    // 標題必填
    toast.error('請輸入活動標題', {
      duration: 1800,
      style: {
        borderRadius: '10px',
        borderTop: '15px #646464 solid',
        background: '#F5F5F5',
        color: '#646464',
        marginTop: '80px',
        width: '220px',
        height: '70px',
      },
    });
    joinTitle.focus();
    joinTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  try {
    const response = await fetch('http://localhost:3005/api/join-in/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageName,
        memberId: auth.memberData.id,
        title,
        info: data,
        startTime,
        endTime,
        count,
        signEndDate,
        city,
        township,
        location,
        tags,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      toast('發佈成功', {
        duration: 1000,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '220px',
          height: '70px',
        },
      });
      router.push('/join');
    } else {
      alert(`寫入失敗: ${result.message}`);
    }
  } catch (error) {
    console.error('寫入文章失敗', error);
    alert('寫入發生錯誤，稍後再試。');
  }
};

export default saveToDo;
