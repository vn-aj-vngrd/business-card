import moment from "moment";
import { Session } from "next-auth";
import Clock from "react-live-clock";

type HeaderProps = { session: Session };

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <div className="mb-5 text-center">
      <div className="text-lg font-semibold">
        Hello, {session.user && session.user.name?.split(" ")[0]} 🙋‍♂️
      </div>
      <div className="text-gray-500"> {moment().format("dddd, MMMM D").toString()}</div>
      <div className="text-sm text-gray-500">
        <Clock format={"h:mm:ss a"} ticking={true} timezone={"Asia/Manila"} />
      </div>
    </div>
  );
};

export default Header;
