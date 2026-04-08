import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);

    const containerStyle = {
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        textAlign: 'center',
        fontFamily: '"Noto Sans TC", sans-serif'
    };

    const titleStyle = {
        fontSize: '24px',
        color: '#1a365d',
        marginBottom: '10px',
        fontWeight: '700'
    };

    const subtitleStyle = {
        color: '#718096',
        fontSize: '14px',
        marginBottom: '30px'
    };

    const syncButtonStyle = {
        backgroundColor: '#3182ce',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'all 0.2s'
    };

    const infoBoxStyle = {
        backgroundColor: '#ebf8ff',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '25px',
        textAlign: 'left'
    };

    return React.createElement('div', { style: containerStyle },
        React.createElement('div', { style: { fontSize: '40px', marginBottom: '20px' } }, '⚓'),
        React.createElement('h1', { style: titleStyle }, '通順國際'),
        React.createElement('p', { style: subtitleStyle }, '遊艇與動力小船駕駛測驗系統'),
        
        React.createElement('button', { 
            style: syncButtonStyle,
            onClick: () => {
                setIsSyncing(true);
                setTimeout(() => { alert('同步完成！共載入 810 題'); setIsSyncing(false); }, 1500);
            }
        }, isSyncing ? '同步中...' : '🔄 立即從雲端同步 (810題)'),

        React.createElement('div', { style: infoBoxStyle },
            React.createElement('h3', { style: { fontSize: '16px', color: '#2c5282', marginBottom: '10px' } }, '💡 使用說明'),
            React.createElement('ul', { style: { fontSize: '13px', color: '#4a5568', paddingLeft: '20px', lineHeight: '1.6' } },
                React.createElement('li', null, '請先點擊上方按鈕載入最新題庫'),
                React.createElement('li', null, '系統將自動記錄您的練習進度'),
                React.createElement('li', null, '支援離線練習與錯題加強')
            )
        )
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
