import toast from 'react-hot-toast';

export const handleSubmit = async (e, uid, title, data, tags, imageName, router, uploadedImageUrl) => {
    e.preventDefault();

    if (!uploadedImageUrl) {
        toast.error('請上傳封面', {
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
        return;
    }
    if (!title) {
        toast.error('標題是必填欄位', {
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
        return;
    }

    if (!data) {
        toast.error('內容是必填欄位', {
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
        return;
    }

    const formData = new FormData();
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : (tags || []);
    formData.append('status', 1);
    formData.append('memberId', uid);
    formData.append('title', title);
    formData.append('content', data);
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('imageName', imageName);

    try {
        const response = await fetch('http://localhost:3005/api/blog/create', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            toast('文章發布成功!', {
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
            router.push('/blog');
        } else {
            const errorData = await response.json();
            console.error('文章發布失敗:', errorData.message);
            toast('文章發布失敗', {
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
        }
    } catch (error) {
        console.error('發生錯誤:', error);
        toast.error('發生錯誤');
    }
};