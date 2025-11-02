import Plasma from "./Plasma";

export const Background = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      className="inset-0 -z-10"
    >
      <Plasma
        color="#3e58be"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={0.8}
        mouseInteractive={true}
      />
    </div>
  );
};
