import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
    // 狀態定義
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSyncSuccess, setShowSyncSuccess] = useState(false);
    const [syncTotalCount, setSyncTotalCount] = useState(0);
    const [syncImageCount, setSyncImageCount] = useState(0);
    const [syncErrorMsg, setSyncErrorMsg] = useState("");

    const syncUrl = "https://raw.githubusercontent.com/TSyacht/yacht-test/main/questions.json";

    // 核心同步邏輯
    const handleRemoteSync = async () => {
        setIsLoading(true);
        setSyncErrorMsg("");
        try {
            const response = await fetch(syncUrl);
            const remoteData = await response.json();
            
            if (remoteData && remoteData.questions) {
                const mergedQuestions = remoteData.questions;
                localStorage.setItem('yacht_questions', JSON.stringify(mergedQuestions));
                setQuestions(mergedQuestions);
                
                // 計算統計數據
                const totalCount = mergedQuestions.length;
                const imageCount = mergedQuestions.filter(q => {
                    const possibleFields = ['image_url', 'image', 'img', 'imageUrl'];
                    return Object.keys(q).some(key => 
                        possibleFields.includes(key.toLowerCase()) && 
                        q[key] && q[key] !== 'null'
                    );
                }).length;

                setSyncTotalCount(totalCount);
                setSyncImageCount(imageCount);
                setShowSyncSuccess(true);
            }
        } catch (err) {
            setSyncErrorMsg("同步失敗，請檢查網路或 JSON 檔案路徑");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('yacht_questions');
        if (saved) setQuestions(JSON.parse(saved));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#1a365d' }}>通順國際 | 動力小船測驗</h1>
            
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
                <button 
                    onClick={handleRemoteSync} 
                    disabled={isLoading}
                    style={{ padding: '10px 20px', cursor: 'pointer', background: '#3182ce', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    {isLoading ? "同步中..." : "🔄 立即從雲端同步 (810題)"}
                </button>
                {syncErrorMsg && <p style={{ color: 'red' }}>{syncErrorMsg}</p>}
            </div>

            {questions.length > 0 ? (
                <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px' }}>
                    <p>第 {currentIdx + 1} 題 / 共 {questions.length} 題</p>
                    <h2 style={{ fontSize: '1.2rem' }}>{questions[currentIdx]?.question}</h2>
                    {/* 這裡會顯示圖片 (如果有) */}
                    {(questions[currentIdx]?.image_url) && (
                        <img src={questions[currentIdx].image_url} alt="題目圖" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    )}
                    <div style={{ marginTop: '20px' }}>
                        {['A', 'B', 'C', 'D'].map(opt => (
                            questions[currentIdx]?.[`option${opt}`] && (
                                <button key={opt} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', marginBottom: '5px' }}>
                                    {opt}. {questions[currentIdx][`option${opt}`]}
                                </button>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <p>目前尚無題目，請點擊上方按鈕進行同步。</p>
            )}

            {/* 同步成功的彈窗 */}
            {showSyncSuccess && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '30px', boxShadow: '0 0 20px rgba(0,0,0,0.2)', borderRadius: '10px', zIndex: 1000, textAlign: 'center' }}>
                    <h3 style={{ color: '#2f855a' }}>✅ 雲端同步完成！</h3>
                    <p>目前題目總計：<strong>{syncTotalCount}</strong> 題</p>
                    <p>其中含圖片題目：<strong>{syncImageCount}</strong> 題</p>
                    <button 
                        onClick={() => setShowSyncSuccess(false)}
                        style={{ marginTop: '15px', padding: '8px 25px', cursor: 'pointer', background: '#2f855a', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        確認
                    </button>
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
