declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  const content: XMLDocument;
  export default content;
}
declare module '*.json';
{
  const data: any;
  export default data;
}
declare module '*.webp' {
  const content: any;
  export default content;
}
declare module '*.svg?react' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
