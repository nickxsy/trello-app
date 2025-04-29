import { useTasks } from '../model/task.store';

export function TasksList() {
  const { tasks } = useTasks();
  return (
    <div className="mt-10">
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <div>
        {tasks.map(task => (
          <div
            key={task.id}
            className="px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center "
          >
            <div className="text-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
