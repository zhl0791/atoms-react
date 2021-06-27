import React, { useState, memo, useEffect } from 'react';
import { createSelector } from 'reselect';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
  atomFamily,
} from 'recoil';
import { ErrorBoundary } from './ErrorBoundary';

const textState = atom<{
  prop: string;
  prop2: string;
}>({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: { prop: 'value', prop2: 'prop2' }, // default value (aka initial value)
});

const myAtomFamily = atomFamily({
  key: 'MyAtom',
  default: selectorFamily({
    key: 'MyAtom/Default',
    get: (param) => ({get}) => {
      console.log(param)
      const otherAtomValue = get(textState);
      return otherAtomValue.prop2;
    },
  }),
});

const charCountState1 = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.prop;
  },
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return get(textState).prop;
  },
  set: ({ get, set }, prop: any) => set(textState, {
      prop,
      prop2: get(textState).prop2,
    })
});

function TextInput() {
  const [prop, setProp] = useRecoilState(charCountState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProp(event.target.value);
  };


  return (
    <div>
      <input type="text" value={prop} onChange={onChange} />
      <br />
      Echo: {prop}
    </div>
  );
}

const prop2State = selector({
  key: 'prop2State',
  get: ( { get } ) => get(textState).prop2
})


const selectFn: any = (state: any) => state;

const A = createSelector(selectFn, (s: any) => s);

function useTestState(textState: any) {
  const state = useRecoilValue(textState);
  return A(state);
}

const CharacterCount = memo(() => {
  const prop2 = useTestState(prop2State);

  const [a, setA] = useState({a: 123});

  useEffect(() => {
    // console.log(11);
  }, [prop2])

  // const count = useRecoilValue(myAtomFamily('paneID'));
  // console.log('change');

  return <>Character Count: {prop2}</>;
})

const todoListState = atom({
  key: 'todoListState',
  default: [] as any[],
});

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList: any) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }: any) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

function TodoItem({ item }: any) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }: any) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr: any, index: any, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any, index: any) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }: any) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoList() {
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: ({ get }) => {
    const txt = get(textState);
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve(`resolve:${txt}`), 1000);
    });
  },
});

const userNameQuery = selectorFamily({
  key: 'UserName',
  get: (id: number) => ({ get }) => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => (id > 2 ? resolve(id) : resolve(id)), 1000);
    });
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  // console.log('change222')
  return <div>{userName}</div>;
}

function UserInfo({ id }: any) {
  const userName = useRecoilValue(userNameQuery(id));
  return <div>{userName}</div>;
}

const elementPositionStateFamily = atomFamily({
  key: 'ElementPosition',
  default: [0, 0],
});

function ElementListItem() {
  const position = useRecoilValue(elementPositionStateFamily([10, 20]));
  // console.log(position);
  return <div>Position: {position}</div>;
}

export default function RecoilTest() {
  return (
    <div>
      <TextInput />

      <CharacterCount />

      <TodoList />

      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <UserInfo id={1} />
          <UserInfo id={2} />
          <UserInfo id={3} />
        </React.Suspense>
      </ErrorBoundary>

      <ElementListItem />
    </div>
  );
}
