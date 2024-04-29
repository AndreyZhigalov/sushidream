declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.json' {
  const data: Record<string, unwnown>;
  export default data;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
