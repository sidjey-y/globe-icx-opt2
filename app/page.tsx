import SurveyView from "./component/SurveyView";

export default function Home() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <SurveyView />
    </main>
  );
}
