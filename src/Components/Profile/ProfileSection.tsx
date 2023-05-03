import "./ProfileSection.scss";

function ProfileSection(props: any): JSX.Element {
  return <div className="ProfileSection">{props.children}</div>;
}

export default ProfileSection;
