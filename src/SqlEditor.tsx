import { useLayoutEffect, useRef, useState } from 'react';
import './sql-editor.css';

const initialQuery = [
  'SELECT city, COUNT(*) AS total',
  'FROM customers',
  'WHERE age >= 18',
  'GROUP BY city',
  'HAVING COUNT(*) > 5',
  'ORDER BY total DESC',
  'LIMIT 10;',
].join('\n');

// Render tokens as text so pasted SQL is never interpreted as HTML.
const sqlTokens = /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:''|[^'])*'|"(?:""|[^"])*"|\b(?:SELECT|FROM|WHERE|GROUP|BY|HAVING|ORDER|LIMIT|AS|ASC|DESC|AND|OR|NOT|NULL|IS|DISTINCT|JOIN|ON|LEFT|RIGHT|INNER|OUTER|IN|LIKE|BETWEEN|CASE|WHEN|THEN|ELSE|END)\b|\b(?:COUNT|SUM|AVG|MIN|MAX)\b|\b\d+(?:\.\d+)?\b)/gi;

function highlightedSql(sql: string) {
  return sql.split(sqlTokens).map((token, index) => {
    let className;
    if (/^(--|\/\*)/.test(token)) className = 'sql-comment';
    else if (/^['"]/.test(token)) className = 'sql-string';
    else if (/^\d/.test(token)) className = 'sql-number';
    else if (/^(COUNT|SUM|AVG|MIN|MAX)$/i.test(token)) className = 'sql-function';
    else if (index % 2) className = 'sql-keyword';
    return className ? <span className={className} key={index}>{token}</span> : token;
  });
}

export function SqlEditor() {
  const [sql, setSql] = useState(initialQuery);
  const highlightRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLPreElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function syncScroll() {
    if (!inputRef.current || !highlightRef.current || !gutterRef.current) return;
    const { scrollTop, scrollLeft } = inputRef.current;
    highlightRef.current.scrollTop = scrollTop;
    highlightRef.current.scrollLeft = scrollLeft;
    gutterRef.current.scrollTop = scrollTop;
  }

  useLayoutEffect(syncScroll, [sql]);

  return <figure className="sql-editor" data-reveal="" aria-label="SQL query example">
    <figcaption className="sql-editor-tab"><span>query.sql</span><span>Editable</span></figcaption>
    <div className="sql-editor-body">
      <pre ref={gutterRef} className="sql-editor-gutter" aria-hidden="true">{sql.split('\n').map((_, index) => index + 1).join('\n')}{'\n'}</pre>
      <div className="sql-editor-input">
        <pre ref={highlightRef} className="sql-editor-highlight" aria-hidden="true"><code>{highlightedSql(sql)}{'\n'}</code></pre>
        <textarea
          ref={inputRef}
          aria-label="SQL code"
          value={sql}
          onChange={event => setSql(event.target.value)}
          onScroll={syncScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
        />
      </div>
    </div>
  </figure>;
}
