// components/CustomCursor.js
import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // 如果是触摸设备，不显示自定义指针
      return;
    }

    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    document.body.appendChild(cursor);

    cursor.style.position = 'fixed';
    cursor.style.width = '32px'; // 根据您的图片尺寸调整
    cursor.style.height = '32px';
    cursor.style.backgroundImage = 'url(/cursor.png)'; // 确保图片路径正确
    cursor.style.backgroundSize = 'contain';
    cursor.style.backgroundRepeat = 'no-repeat';
    cursor.style.pointerEvents = 'none';
    cursor.style.transformOrigin = 'top left';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease, background-image 0.1s ease';

    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const updateCursor = () => {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const mouseDown = () => {
      cursor.style.transform = 'scale(0.7)';
    };

    const mouseUp = () => {
      cursor.style.transform = 'scale(1)';
    };

    const hideCursor = () => {
      cursor.style.display = 'none';
      document.body.style.cursor = 'default'; // 恢复默认鼠标指针
    };

    const showCursor = () => {
      cursor.style.display = 'block';
      document.body.style.cursor = 'none'; // 隐藏默认鼠标指针
    };

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    // 为所有的 select 元素添加事件监听器
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach((select) => {
      select.addEventListener('focus', hideCursor);
      select.addEventListener('blur', showCursor);
    });

    // 定期更新鼠标指针位置
    const intervalId = setInterval(updateCursor, 16); // 大约60fps

    // 清理事件监听器和元素
    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);

      selectElements.forEach((select) => {
        select.removeEventListener('focus', hideCursor);
        select.removeEventListener('blur', showCursor);
      });

      clearInterval(intervalId);
      document.body.removeChild(cursor);
    };
  }, []);

  return null; // 这个组件不需要渲染任何内容
};

export default CustomCursor;
