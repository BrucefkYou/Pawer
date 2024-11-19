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
            toast.success('儲存草稿成功!');
            router.push('http://localhost:3000/member/blog');
        } else {
            const errorData = await response.json();
            console.error('儲存草稿失敗:', errorData.message);
            toast.error('儲存草稿失敗');
        }
    } catch (error) {
        console.error('發生錯誤:', error);
        toast.error('發生錯誤');
    }
};