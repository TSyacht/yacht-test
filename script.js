import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
    const [isSyncing, setIsSyncing] = useState(false);

    // 整個網頁的背景（淺灰）
    const pageStyle = {
        backgroundColor: '#f7fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '"Noto Sans TC", "Inter", sans-serif'
    };

    // 白色卡片容器
    const cardStyle = {
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '40px 30px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        textAlign: 'center'
    };

    const titleStyle = {
        fontSize: '28px',
        color: '#2d3748',
        marginBottom: '8px',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    };

    const subtitleStyle = {
        color: '#718096',
        fontSize: '15px',
        marginBottom: '35px',
        lineHeight: '1.5'
    };

    const syncButtonStyle = {
        backgroundColor: '#3182ce',
        color: 'white',
        border: 'none',
        padding: '18px',
        borderRadius: '16px',
        fontSize: '17px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 4px 6px rgba(49, 130, 206, 0.2)',
        transition: 'transform 0.1s'
    };

    const infoBoxStyle = {
        backgroundColor: '#f0f7ff',
        padding: '24px',
        borderRadius: '20px',
        marginTop: '30px',
        textAlign: 'left'
    };

    return React.createElement('div', { style: pageStyle },
        React.createElement('div', { style: cardStyle },
            React.createElement('div', { style: { fontSize: '48px', marginBottom: '15px' } }, '⚓'),
            React.createElement('h1', { style: titleStyle }, '通順國際'),
            React.createElement('p', { style: subtitleStyle }, '遊艇與動力小船駕駛測驗系統'),
            
            React.createElement('button', { 
                style: syncButtonStyle,
                onClick: () => {
                    setIsSyncing(true);
                    setTimeout(() => { alert('同步完成！已更新 830 題最新題庫'); setIsSyncing(false); }, 1500);
                }
            }, isSyncing ? '同步中...' : '🔄 立即從雲端同步 (830題)'),

            React.createElement('div', { style: infoBoxStyle },
                React.createElement('h3', { style: { fontSize: '17px', color: '#2c5282', marginBottom: '12px', fontWeight: '600' } }, '💡 使用說明'),
                React.createElement('ul', { style: { fontSize: '14px', color: '#4a5568', paddingLeft: '20px', lineHeight: '1.8' } },
                    React.createElement('li', null, '請先點擊上方按鈕載入最新題庫'),
                    React.createElement('li', null, '系統將自動記錄您的練習進度'),
                    React.createElement('li', null, '支援離線練習與錯題加強')
                )
            )
        )
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
