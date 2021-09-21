const Box = (props: {
  header: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}) => (
  <div className="box option is-hoverable" onClick={props.onClick}>
    {props.icon ? <img className="icon" src={props.icon} /> : null}
    <h3 className="header">{props.header}</h3>
    <p className="description">{props.description}</p>
  </div>
);

export default Box;
