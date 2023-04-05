import { useSelector } from "react-redux";
import ChooseMode from "../Components/ChooseMode/ChooseMode";
import { User } from "../models/User";

function ChooseUserModePage(): JSX.Element {
  const user: User = useSelector((state: any) => state.user.user);

  return (
    <main className="container-main">
      <ChooseMode user={user} />
    </main>
  );
}

export default ChooseUserModePage;
