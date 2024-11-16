import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // 如果是觸控設備的，隱藏自定義游標
      return;
    }

    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    document.body.appendChild(cursor);

    cursor.style.position = 'fixed';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.backgroundImage = 'url(/cursor.png)';
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
      document.body.style.cursor = 'default';
    };

    const showCursor = () => {
      cursor.style.display = 'block';
      document.body.style.cursor = 'none';
    };

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    // 因為在使用 select 元素時，游標會被隱藏，所以需要在 select 元素上添加事件監聽器
    // 爲所有的 select 元素添加事件監聽器，當 select 元素被選中時，隱藏自定義游標
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach((select) => {
      select.addEventListener('focus', hideCursor);
      select.addEventListener('blur', showCursor);
    });

    // 定期更游標指针位置
    const intervalId = setInterval(updateCursor, 16); // 大約60fps

    // 清理事件監聽器和元素
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

  return null;
};

export default CustomCursor;
