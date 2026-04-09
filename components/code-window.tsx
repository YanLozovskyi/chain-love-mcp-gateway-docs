interface CodeWindowProps {
  label: string;
  title: string;
  code: string;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightJson(source: string) {
  const escaped = escapeHtml(source);

  return escaped.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let token = "number";

      if (match.startsWith("\"")) {
        token = match.endsWith(":") ? "key" : "string";
      } else if (match === "true" || match === "false") {
        token = "boolean";
      } else if (match === "null") {
        token = "null";
      }

      return `<span class="token-${token}">${match}</span>`;
    }
  );
}

export function CodeWindow({ label, title, code }: CodeWindowProps) {
  const html = highlightJson(code);

  return (
    <div className="code-window">
      <div className="code-window-toolbar">
        <div className="code-window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="code-window-meta">
          <span className="code-window-label">{label}</span>
          <span className="code-window-title">{title}</span>
        </div>
      </div>
      <pre className="code-window-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
