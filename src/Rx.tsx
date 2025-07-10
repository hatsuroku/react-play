import * as rx from "rxjs";
import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { cn } from "./util";
import users from "./users.json";

const userStream = rx.timer(500).pipe(rx.concatMap(() => rx.of(users)));
const requestStream = rx.defer(() =>
  rx.of(
    `https://api.github.com/users?since=${Math.floor(Math.random() * 1000)}`
  )
);
const responseStream = requestStream.pipe(
  rx.mergeMap((url) => fetch(url)),
  rx.mergeMap((res) => res.json())
);

const Rx = () => {
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    userStream
      .pipe(rx.mergeMap(rx.from), rx.take(3), rx.bufferCount(3))
      .subscribe((users) => {
        setUsers(users);
      });
  }, []);

  const updateUser = useCallback(
    (index: number) => {
      responseStream
        .pipe(
          rx.map((users) => users[Math.floor(Math.random() * users.length)])
        )
        .subscribe((newUser) =>
          setUsers((prevUsers) => {
            prevUsers![index] = newUser;
            return [...prevUsers!];
          })
        );
    },
    []
  );

  return (
    <div className={"ml-16"}>
      <div className={cn("my-10")}>
        <Button
          onClick={() => {
            responseStream
              .pipe(rx.mergeMap(rx.from), rx.take(3), rx.bufferCount(3))
              .subscribe((users) => {
                setUsers(users);
              });
          }}
          variant="outlined"
        >
          REFRESH
        </Button>
      </div>
      <div>
        {!users
          ? "No Users!"
          : users.map((user, index) => (
              <div key={user.id} className={"flex gap-2 mb-10"}>
                <div>{user.login}</div>
                <div>
                  <img src={user.avatar_url} height={150} width={150} />
                </div>
                <Button variant="outlined" onClick={() => updateUser(index)}>X</Button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Rx;
