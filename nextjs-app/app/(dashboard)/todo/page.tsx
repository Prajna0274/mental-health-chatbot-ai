'use client'

import { useState, useEffect } from 'react'
import { FiCheckCircle, FiCircle, FiClock, FiTrash2, FiPlus } from 'react-icons/fi'

interface TodoItem {
  id: string
  task: string
  time: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTask, setNewTask] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  const saveTodos = (updatedTodos: TodoItem[]) => {
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const addTodo = () => {
    if (!newTask.trim()) return
    
    const todo: TodoItem = {
      id: Date.now().toString(),
      task: newTask,
      time: newTime,
      completed: false,
      priority: newPriority
    }
    
    saveTodos([...todos, todo])
    setNewTask('')
    setNewTime('')
    setNewPriority('medium')
  }

  const toggleComplete = (id: string) => {
    saveTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter(todo => todo.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-pastel-rose-300 to-pastel-pink-300'
      case 'medium': return 'from-pastel-peach-300 to-pastel-lavender-300'
      case 'low': return 'from-pastel-mint-300 to-pastel-sky-300'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-pastel-rose-500 text-white'
      case 'medium': return 'bg-pastel-peach-500 text-white'
      case 'low': return 'bg-pastel-mint-500 text-white'
    }
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 animate-scaleIn">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent mb-2">
              Daily Planning
            </h1>
            <p className="text-slate-600">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pastel-lavender-100 to-pastel-pink-100 rounded-2xl">
            <div className="text-4xl font-bold text-slate-800">{completedCount}/{totalCount}</div>
            <div className="text-sm text-slate-600">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 transition-all duration-500 rounded-full"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Add New Task */}
        <div className="bg-gradient-to-br from-pastel-lavender-50 to-white p-6 rounded-3xl border-2 border-pastel-lavender-200 mb-8">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FiPlus /> Add New Task
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What do you want to accomplish?"
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-white text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300"
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <FiClock className="inline mr-1" /> Time
                </label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender-200 bg-white text-slate-800 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender-200 bg-white text-slate-800 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <button
              onClick={addTodo}
              className="w-full py-4 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 text-white font-bold rounded-2xl shadow-soft hover:shadow-float hover:-translate-y-1 transition-all"
            >
              Add Task ✨
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg">No tasks yet! Add your first task above.</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`bg-gradient-to-br ${getPriorityColor(todo.priority)} p-6 rounded-3xl border-2 border-slate-200 shadow-soft transition-all ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className="flex-shrink-0 text-3xl text-slate-700 hover:scale-110 transition-transform"
                  >
                    {todo.completed ? <FiCheckCircle className="text-green-600" /> : <FiCircle />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(todo.priority)}`}>
                        {todo.priority.toUpperCase()}
                      </span>
                      {todo.time && (
                        <span className="text-sm text-slate-700 flex items-center gap-1">
                          <FiClock /> {todo.time}
                        </span>
                      )}
                    </div>
                    <p className={`text-lg font-medium text-slate-800 ${todo.completed ? 'line-through' : ''}`}>
                      {todo.task}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 p-3 text-red-500 hover:bg-red-100 rounded-xl transition-all"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
