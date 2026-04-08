import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // 用最安全的方式寫 HTML 結構 (避免用 < > 符號在 JS 裡直接跑)
  return React.createElement('div', { style: { padding: '20px', fontFamily: 'sans-serif' } }, 
    React.createElement('h1', null, '通順國際 - 題庫測試'),
    React.createElement('p', null, '如果你看到這行字，代表引擎啟動成功了！'),
    React.createElement('button', { 
      onClick: () => alert('按鈕測試成功！'),
      style: { padding: '10px 20px', cursor: 'pointer' }
    }, '點我測試')
  );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
