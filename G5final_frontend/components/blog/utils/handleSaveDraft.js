import toast from 'react-hot-toast';

export const handleSaveDraft = async (e, uid, title, data, tags, imageName, router) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('status', 0);
    formData.append('memberId', uid);
    formData.append('title', title);
    formData.append('content', data);
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : (tags || []);
    // 接收api傳來的陣列:如果是字串>>用逗號隔開變成陣列>>去除標籤前後的空白>>過濾空標籤
    formData.append('tags', JSON.stringify(tagsArray));
    // 用formData處理時，要轉成字符
    formData.append('imageName', imageName);


    try {
        const response = await fetch('http://localhost:3005/api/blog/create', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            toast('儲存草稿成功!', {
                duration: 1800,
                style: {
                    borderRadius: '10px',
                    borderTop: '15px #22355C solid',
                    background: '#F5F5F5',
                    color: '#646464',
                    marginTop: '80px',
                    width: '300px',
                    height: '100px',
                },
            });
            router.push('http://localhost:3000/member/blog');
        } else {
            throw new Error('儲存草稿失敗');
        }
    } catch (error) {
        toast('儲存草稿失敗', {
            duration: 1800,
            style: {
                borderRadius: '10px',
                borderTop: '15px #22355C solid',
                background: '#F5F5F5',
                color: '#646464',
                marginTop: '80px',
                width: '300px',
                height: '100px',
            },
        });
        console.error(error);
    }
};
