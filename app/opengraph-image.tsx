import { ImageResponse } from "next/og";

export const alt = "Volt — deploy LangGraph and LangChain agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 72,
          fontFamily: "sans-serif",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 200 200">
            <path
              d="M32 32 L98 167"
              fill="none"
              stroke="#ffffff"
              strokeWidth="60"
              strokeLinecap="round"
            />
            <path
              d="M168 32 L131 100"
              fill="none"
              stroke="#c9c9d0"
              strokeWidth="60"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ color: "#f5f5f6", fontSize: 42, fontWeight: 600, letterSpacing: -1.6 }}>
            Volt
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#f5f5f6",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: -4.4,
              lineHeight: 1,
            }}
          >
            Deployments for
          </span>
          <span
            style={{
              color: "#f5f5f6",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: -4.4,
              lineHeight: 1.05,
            }}
          >
            LangGraph Agents
          </span>
          <span style={{ color: "#a1a1a6", fontSize: 30, marginTop: 26 }}>
            LangGraph and LangChain agents. TypeScript or Python. One command.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              color: "#d8ff3e",
              fontSize: 22,
              letterSpacing: 2.6,
              textTransform: "uppercase",
            }}
          >
            volt.run
          </span>
          <span style={{ color: "#6e6e76", fontSize: 22, letterSpacing: 2.6 }}>
            · LANGGRAPH · APACHE-2.0 · AGENT PROTOCOL V2
          </span>
        </div>
      </div>
    ),
    size,
  );
}
