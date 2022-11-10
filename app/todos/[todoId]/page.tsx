import React from 'react';
import { Todo } from '../../../typing';
import { notFound } from 'next/navigation';

/*  Paramètre à true par défaut, pas besoin de le mettre (ici juste pour l'exemple)
    Permet d'aller sur des pages qui n'ont pas été générées statiquement
    Problème : on peut aller au délà des limites (>200), exemple : todos/6666
    Solution : page 'notFound' de next/navigation
*/
export const dynamicParams = true;

type PageProps = {
    params: {
        todoId: string
    }
}

const fetchTodo = async (todoId: string) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            next: { revalidate: 60 }
        }
    );

    const todo: Todo = await res.json();
    return todo;
}

async function TodoPage({params: {todoId}}: PageProps) {
    const todo = await fetchTodo(todoId);

    if(!todo.id) return notFound();

    return (
        <div className="p-10 bg-yellow-200 border-2 shadow-lg">
            <p>
                #{todo.id}: {todo.title}
            </p>
            <p>Completed: { todo.completed ? "Yes" : "No" }</p>
            <p className="border-t border-black mt-5 text-right">
                By User: {todo.userId}
            </p>
        </div>
    )
}

export default TodoPage;

// generateStaticParams est un nom de fonction réservé
export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const todos: Todo[] = await res.json();

    // On limite le nombre de pages pré-construites à 10 pour ne pas dépasser la limite de l'api
    const trimmedTodos = todos.splice(0, 10);

    return trimmedTodos.map(todo => ({
        todoId: todo.id.toString(),
    }));
}