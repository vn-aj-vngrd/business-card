/* eslint-disable jsx-a11y/anchor-has-content */
import { Tab } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
import { Key } from "react";
import { useState } from "react";

import AddTask from "../components/AddTask";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import moment from "moment";

const Tasks: React.FC<any> = ({ session, tasks }) => {
  const finishedTasks = tasks.finishedTasks;
  const unfinishedTasks = tasks.unfinishedTasks;

  const [categories] = useState({
    "To-Do": unfinishedTasks,
    Completed: finishedTasks,
  });

  const deleteTask = async (id: Key) => {
    console.log(id);
    try {
      await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen py-6 bg-gray-40">
        <div className="w-96">
          <div>{session.user && session.user.name}</div>
          <div className="mb-4"> {moment().format("dddd, MMMM d").toString()}</div>

          <div className="flex justify-between mb-5">
            <div>
              <AddTask />
            </div>
            <div>
              <button
                onClick={() => signOut()}
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Log out
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
                        "", //ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
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
                          " ", //ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                        )}>
                        <ul>
                          {userTasks &&
                            userTasks.map(
                              (task: {
                                id: Key;
                                title: string;
                                description: string;
                                completed: boolean;
                                created_at: string;
                              }) => (
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
                                      <div>
                                        <button
                                          type="button"
                                          className="inline-flex items-center px-3 py-2 mr-2 text-xs font-medium leading-4 text-gray-700 border border-gray-300 rounded-md shadow-sm ">
                                          Edit
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          className="inline-flex items-center px-3 py-2 text-xs font-medium leading-4 text-white bg-blue-500 border border-transparent rounded-md shadow-sm ">
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <hr className="mt-5" />
                                </li>
                              ),
                            )}
                        </ul>
                      </Tab.Panel>
                    ) : (
                      <>
                        {/* <Tab.Panel
                          className={classNames(
                            "rounded-xl bg-gray-40 p-3 shadow-md",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          )}>
                          <ul>
                            <li className="relative p-3 rounded-md hover:bg-gray-100">
                              <h3 className="font-medium leading-5 text-md">No Tasks Completed</h3>

                              <ul className="mt-1 text-sm font-normal leading-4 text-gray-500">
                                <li>Go Finish a task</li>
                              </ul>

                              <a
                                href="#"
                                className={classNames(
                                  "absolute inset-0 rounded-md",
                                  "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
                                )}
                              />
                            </li>
                          </ul>
                        </Tab.Panel> */}
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
