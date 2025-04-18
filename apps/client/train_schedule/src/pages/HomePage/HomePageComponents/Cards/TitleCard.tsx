interface Props {
  headerText: string;
  children: string;
}
const TitleCard = ({ headerText, children }: Props) => {
  return (
    <div className="card" style={{ marginTop: "3vh", marginBottom: "3vh" }}>
      <div className="card-body">
        <h2 className="card-header text-center pb-3">{headerText}</h2>
        <h5
          className="card-title"
          style={{ paddingTop: "1.5vh", textAlign: "center" }}
        >
          {children}
        </h5>
      </div>
    </div>
  );
};

export default TitleCard;
