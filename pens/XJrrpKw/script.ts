// 
export function onMouseMove (callback: (mouseX: number, mouseY: number) => void): void {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    window.requestAnimationFrame(() => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      callback(mouseX, mouseY);
    });
  });
}

//
export function onWindowResize (callback: (width: number, height: number) => void): void {
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(() => {
      const width = document.documentElement.offsetWidth;
      const height = document.documentElement.offsetHeight;
       
      callback(width, height);
    });
  });
}

// 
export function clamp(min: number, value: number, max: number): number {
  return Math.min(
    Math.max(min, value),
    max
  );
}