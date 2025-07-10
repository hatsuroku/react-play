import { useState, useEffect, useCallback, useMemo } from "react";
import useSWR from "swr";
import Button from "@mui/material/Button";
import { cn } from "./util";

const getRandomUsers = () =>
  `https://api.github.com/users?since=${Math.floor(Math.random() * 1000)}`;

const generatorFromArray = function* (arr: any[]) {
  if (!arr) return;
  for (const item of arr) {
    yield item;
  }
};

const take = (generator: Generator, n: number) => {
  const result = [];
  for (let i = 0; i < n; ++i) {
    const { value, done } = generator.next();
    if (done) {
      break;
    }
    result.push(value);
  }
  return result;
};

const Swr = () => {
  const [url, setUrl] = useState(getRandomUsers);
  const {
    data: usersData,
    isLoading,
    error,
  } = useSWR(url, (url) => fetch(url).then((res) => res.json()), {
    keepPreviousData: true,
  });
  const [unusedUsers, setUnusedUsers] = useState<any[]>([]);
  const userPool = useMemo(
    () => generatorFromArray([...unusedUsers, ...(usersData ?? [])]),
    [usersData, unusedUsers]
  );
  const updateUserPool = useCallback(() => setUrl(getRandomUsers()), []);
  const [users, setUsers] = useState<any[]>([]);
  const [indexesToUpdate, setIndexesToUpdate] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  useEffect(() => {
    if (indexesToUpdate.length === 0 || isLoading) return;
    const candidateUsers = take(userPool, indexesToUpdate.length);
    if (candidateUsers.length < indexesToUpdate.length) {
      updateUserPool();
      setUnusedUsers(candidateUsers);
      return;
    }
    const nextUsers = [...users];
    indexesToUpdate.forEach((index) => {
      nextUsers[index] = take(userPool, 1)[0];
    });
    setUsers(nextUsers);
    setIndexesToUpdate([]);
  }, [isLoading, indexesToUpdate, users, userPool, updateUserPool]);

  return (
    <div className={"ml-16"}>
      <div className={cn("my-10")}>
        <Button
          variant="outlined"
          onClick={() => {
            setIndexesToUpdate([0, 1, 2, 3]);
          }}
        >
          REFRESH
        </Button>
      </div>
      {error ? (
        <div>Error!!!</div>
      ) : (
        <div>
          {users.map((user: any, index: number) => (
            <div key={user.id} className={"flex gap-2 mb-10"}>
              <div>{user.login}</div>
              <div>
                <img src={user.avatar_url} height={150} width={150} />
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  setIndexesToUpdate([index]);
                }}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Swr;
