/* eslint-disable jsx-a11y/anchor-has-content */
import { Tab } from "@headlessui/react";
import { LogoutIcon, XCircleIcon } from "@heroicons/react/solid";
import moment from "moment";
import { signOut } from "next-auth/react";
import { Key, useEffect } from "react";
import { useState } from "react";
import { uuid } from "uuidv4";

import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const fetchTasks = async () => {
  const res = await fetch(`/api/task`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return data;
};

type Task = {
  id: Key;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
};

const Tasks = () => {
  const [categories, setCategories] = useState({ "To-Do": [], Completed: [] });
  const [refreshTaskToken, setRefreshTaskToken] = useState<string>("");

  useEffect(() => {
    fetchTasks().then((data) =>
      setCategories({
        "To-Do": data.unfinishedTasks,
        Completed: data.finishedTasks,
      }),
    );
    console.log("test");
  }, [refreshTaskToken]);

  const deleteTask = async (id: Key) => {
    try {
      await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      setRefreshTaskToken(uuid());
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await fetch(`/api/task/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      setRefreshTaskToken(uuid());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center py-6 bg-gray-40">
        <div className="w-96">
          <div className="flex justify-between mb-5">
            <div>
              <AddTask onTaskCreated={() => setRefreshTaskToken(uuid())} />
            </div>
            <div>
              <button
                onClick={() => signOut()}
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 border border-gray-300 rounded-md shadow-sm hover:text-gray-50 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Log out
                <LogoutIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="w-full max-w-md sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue-500 rounded-xl">
                {Object.keys(categories).map((category, idx) => (
                  <Tab
                    key={idx}
                    className={({ selected }: { selected: boolean }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        //"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                      )
                    }>
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {Object.values(categories).map((userTasks, idx) => (
                  <div key={idx}>
                    {userTasks && userTasks.length !== 0 ? (
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl bg-gray-40 p-3 shadow-md",
                          //"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        )}>
                        <ul>
                          {userTasks &&
                            userTasks.map((task: Task) => (
                              <li
                                key={task.id}
                                className="relative p-3 rounded-md hover:bg-gray-100">
                                <div className="flex justify-between">
                                  <h3 className="font-medium leading-5 text-md">{task.title}</h3>
                                  <button>
                                    <XCircleIcon
                                      onClick={() => deleteTask(task.id)}
                                      className="ml-2 -mr-0.5 h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                <div className="mt-1 text-sm font-normal leading-4 text-gray-500">
                                  <div className="mt-1">{task.description}</div>
                                  <div className="mt-1">
                                    {moment(task.created_at)
                                      .format("MMMM Do YYYY, h:mm:ss a")
                                      .toString()}
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    {!task.completed && (
                                      <>
                                        <div>
                                          <EditTask
                                            onTaskEdited={() => setRefreshTaskToken(uuid())}
                                            task={task}
                                          />
                                        </div>
                                        <div>
                                          <button
                                            onClick={() => updateTask(task)}
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 text-xs font-medium leading-4 text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700">
                                            Done
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </Tab.Panel>
                    ) : (
                      <>
                        <Tab.Panel
                          className={classNames(
                            "rounded-xl bg-gray-40 p-3 shadow-md",
                            // "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          )}>
                          <ul>
                            <li className="relative p-3 rounded-md hover:bg-gray-100">
                              <h3 className="font-medium leading-5 text-md">
                                No task at the moment
                              </h3>

                              <ul className="mt-1 text-sm font-normal leading-4 text-gray-500">
                                <li>Add or complete a task.</li>
                              </ul>
                            </li>
                          </ul>
                        </Tab.Panel>
                      </>
                    )}
                  </div>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
