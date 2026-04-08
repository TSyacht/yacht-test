import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
    const [view, setView] = useState('home'); // home: 首頁, quiz: 測驗頁
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);

    // 模擬 830 題的部分範例數據
    const questions = [
        { q: "遊艇在航行中，遇到前方有避讓船時應如何處理？", o: ["保持原航向", "轉向避讓", "減速停車", "加速通過"], a: 1 },
        { q: "下列何者為遊艇必備之安全裝備？", o: ["救生衣", "遮陽傘", "音響設備", "冰箱"], a: 0 }
    ];

    const pageStyle = { backgroundColor: '#f7fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Noto Sans TC", sans-serif' };
    const cardStyle = { width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: '24px', padding: '40px 30px', boxShadow: '0 20px 25px rgba(0,0,0,0.05)', textAlign: 'center' };
    const syncButtonStyle = { backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '18px', borderRadius: '16px', fontSize: '17px', fontWeight: '600', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' };

    // --- 首頁畫面 ---
    if (view === 'home') {
        return React.createElement('div', { style: pageStyle },
            React.createElement('div', { style: cardStyle },
                React.createElement('div', { style: { fontSize: '48px', marginBottom: '15px' } }, '⚓'),
                React.createElement('h1', { style: { fontSize: '28px', color: '#2d3748', marginBottom: '8px' } }, '通順國際'),
                React.createElement('p', { style: { color: '#718096', marginBottom: '35px' } }, '遊艇與動力小船駕駛測驗系統'),
                React.createElement('button', { 
                    style: syncButtonStyle,
                    onClick: () => {
                        setIsSyncing(true);
                        setTimeout(() => { setView('quiz'); setIsSyncing(false); }, 1000);
                    }
                }, isSyncing ? '載入題庫中...' : '🔄 立即從雲端同步 (830題)'),
                React.createElement('div', { style: { backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '20px', marginTop: '30px', textAlign: 'left' } },
                    React.createElement('h3', { style: { color: '#2c5282', marginBottom: '10px' } }, '💡 使用說明'),
                    React.createElement('ul', { style: { fontSize: '14px', color: '#4a5568', paddingLeft: '20px', lineHeight: '1.8' } },
                        React.createElement('li', null, '點擊上方按鈕開始 830 題測驗'),
                        React.createElement('li', null, '系統將自動記錄您的練習進度')
                    )
                )
            )
        );
    }

    // --- 測驗畫面 (還原圖 2 的排版) ---
    const q = questions[currentIdx] || questions[0];
    return React.createElement('div', { style: pageStyle },
        React.createElement('div', { style: { ...cardStyle, textAlign: 'left' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#718096' } },
                React.createElement('span', null, `題目 ${currentIdx + 1} / 830`),
                React.createElement('button', { onClick: () => setView('home'), style: { border: 'none', background: 'none', color: '#3182ce', cursor: 'pointer' } }, '返回首頁')
            ),
            React.createElement('h2', { style: { fontSize: '20px', color: '#2d3748', marginBottom: '25px', lineHeight: '1.6' } }, q.q),
            q.o.map((opt, i) => React.createElement('button', {
                key: i,
                style: { display: 'block', width: '100%', padding: '15px', marginBottom: '12px', textAlign: 'left', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', fontSize: '16px' },
                onClick: () => alert(i === q.a ? '✅ 答對了！' : '❌ 再想一下喔！')
            }, `${i + 1}. ${opt}`)),
            React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '20px' } },
                React.createElement('button', { 
                    onClick: () => setCurrentIdx(Math.max(0, currentIdx - 1)),
                    style: { flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0', background: 'white', cursor: 'pointer' }
                }, '上一題'),
                React.createElement('button', { 
                    onClick: () => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1)),
                    style: { flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#3182ce', color: 'white', border: 'none', cursor: 'pointer' }
                }, '下一題')
            )
        )
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
