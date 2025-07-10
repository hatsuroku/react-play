// 支持普通 CSS 文件
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
