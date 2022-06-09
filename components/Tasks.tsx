import { signOut } from "next-auth/react";
import { Key } from "react";

const Tasks: React.FC<any> = ({ session, tasks }) => {
  return (
    <div>
      {" "}
      Signed in as {session.user && session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <ul>
        {tasks &&
          tasks.map(
            (task: {
              id: Key;
              title: string;
              description: string;
              completed: boolean;
              created_at: string;
              updated_at: string;
              authorID: string;
            }) => <li key={task.id}>{task.title}</li>,
          )}
      </ul>
    </div>
  );
};

export default Tasks;
