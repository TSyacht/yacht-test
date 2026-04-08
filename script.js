import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    // 模擬載入題目數據
    useEffect(() => {
        // 這裡之後可以串接你的 Supabase 或 JSON
        const sampleData = [
            { id: 1, question: "遊艇在航行中，遇到前方有避讓船時應如何處理？", options: ["保持原航向", "轉向避讓", "減速停車", "加速通過"], answer: 1 },
            { id: 2, question: "下列何者為遊艇必備之安全裝備？", options: ["救生衣", "遮陽傘", "音響設備", "冰箱"], answer: 0 }
        ];
        setQuestions(sampleData);
        setLoading(false);
    }, []);

    if (loading) return React.createElement('div', null, '題目載入中...');
    if (questions.length === 0) return React.createElement('div', null, '目前沒有題目。');

    const q = questions[currentIdx];

    return React.createElement('div', { style: { padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' } },
        React.createElement('h2', null, '遊艇動力小船駕駛測驗'),
        React.createElement('div', { style: { marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' } },
            React.createElement('p', { style: { fontSize: '18px', fontWeight: 'bold' } }, `第 ${currentIdx + 1} 題：${q.question}`),
            q.options.map((opt, i) => 
                React.createElement('button', {
                    key: i,
                    onClick: () => alert(i === q.answer ? '答對了！' : '再試一次喔！'),
                    style: { display: 'block', width: '100%', padding: '10px', margin: '5px 0', textAlign: 'left', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }
                }, opt)
            )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('button', { 
                disabled: currentIdx === 0,
                onClick: () => setCurrentIdx(prev => prev - 1),
                style: { padding: '10px 20px' }
            }, '上一題'),
            React.createElement('button', { 
                disabled: currentIdx === questions.length - 1,
                onClick: () => setCurrentIdx(prev => prev + 1),
                style: { padding: '10px 20px' }
            }, '下一題')
        )
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
