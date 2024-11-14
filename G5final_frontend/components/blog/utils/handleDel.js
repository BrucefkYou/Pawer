import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export const useBlogDel = (id) => {
    const router = useRouter();

    const handleDelete = async (t) => {
        try {
            const formData = new FormData();
            formData.append('Valid', 0);

            const response = await fetch(`http://localhost:3005/api/blog/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                router.push('/member/blog');
            }
        } catch (error) {
            console.error(error);
        }
        toast.dismiss(t.id);
    };

    const delToast = () => {
        toast.custom(
            (t) => (
                <div
                    style={{
                        borderRadius: '10px',
                        borderTop: '15px #22355C solid',
                        background: '#F5F5F5',
                        color: '#646464',
                        marginTop: '80px',
                        padding: '10px 30px',
                        width: '300px',
                        height: '100px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                    }}
                >
                    <p>是否確認刪除？</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button
                            style={{
                                padding: '3px 15px',
                                marginRight: '10px',
                                backgroundColor: '#C14545',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '2px',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleDelete(t)}
                        >
                            確認
                        </button>
                        <button
                            style={{
                                padding: '3px 15px',
                                backgroundColor: '#F4B13E',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '2px',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={() => toast.dismiss(t.id)}
                        >
                            取消
                        </button>
                    </div>
                </div>
            ),
            { duration: Infinity, position: 'top-center' }
        );
    };

    return delToast;
};
