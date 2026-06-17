import { useEffect } from "react";

interface Props {
  error: unknown;
}

const ErrorFallback = ({ error }: Props) => {
  const errorName = error instanceof Error ? error.name : undefined;
  const errorStack = error instanceof Error ? error.stack : undefined;

  useEffect(() => {
    if (errorName === "ChunkLoadError" || errorName === "TypeError") {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [errorName]);

  if (errorName === "ChunkLoadError" || errorName === "TypeError") {
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
      <pre>{errorStack ?? "Unknown error"}</pre>
    </div>
  );
};

export default ErrorFallback;
