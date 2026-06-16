import { useEffect } from "react";

interface Props {
  error: unknown;
}

const ErrorFallback = ({ error }: Props) => {
  const name = error instanceof Error ? error.name : undefined;
  const stack = error instanceof Error ? error.stack : undefined;

  useEffect(() => {
    if (name === "ChunkLoadError" || name === "TypeError") {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [name]);

  if (name === "ChunkLoadError" || name === "TypeError") {
    return (
      <div style={{ color: "#fff", fontSize: 18 }}>
        <p>App Updated, reloading...</p>
      </div>
    );
  }

  return (
    <div style={{ color: "#fff", fontSize: 18 }}>
      <span>
        Sorry there is an error. Would you like to report it to the{" "}
        <a className="tg" href="https://t.me/+T245uB32DeNlNjJl">
          Telegram group
        </a>
        ?
      </span>
      <pre>{stack ?? "Unknown error"}</pre>
    </div>
  );
};

export default ErrorFallback;
