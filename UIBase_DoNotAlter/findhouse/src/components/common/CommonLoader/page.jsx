import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it's on top
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Spinner Rings */}
        <div style={{ position: "relative", width: 80, height: 80 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 80 - i * 20,
                height: 80 - i * 20,
                borderRadius: "50%",
                border: "5px solid transparent",
                borderTopColor: i === 1 ? "white" : i === 2 ? "lightgray" : "darkgray",
                animation: "spin 1s linear infinite",
                animationDuration: `${1 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Logo */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            width={75}
            height={60}
            src="/assets/images/Appraisal_Land_Logo.png"
            alt="Loading..."
          />
        </div>
      </div>

      {/* Keyframe Animation (inline) */}
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
