import { Injectable } from '@angular/core';
import {User} from '@/data/users';
import { Task } from '@/data/todo';


@Injectable({
  providedIn: 'root'
})

export class TaskServiceService {

TEST_DATA: Task[] = [
    {
        id: 'u1',
        taskId: 't1',
        title: 'Task 1A',
        description: 'Description 1A',
    },
    {
        id: 'u1',
        taskId: 't2',
        title: 'Task 1B',
        description: 'Description 1B',
    },
    {
        id: 'u1',
        taskId: 't3',
        title: 'Task 1C',
        description: 'Description 1C',
    },
    // Tasks for user u2
    {
        id: 'u2',
        taskId: 't4',
        title: 'Task 2A',
        description: 'Description 2A',
    },
    {
        id: 'u2',
        taskId: 't5',
        title: 'Task 2B',
        description: 'Description 2B',
    },
    // Tasks for user u3
    {
        id: 'u3',
        taskId: 't6',
        title: 'Task 3A',
        description: 'Description 3A',
    },
    {
        id: 'u3',
        taskId: 't7',
        title: 'Task 3B',
        description: 'Description 3B',
    },
    {
        id: 'u3',
        taskId: 't8',
        title: 'Task 3C',
        description: 'Description 3C',
    },
  ]

  DUMMY_USERS:User[] = [
    {
      id: 'u1',
      name: 'Jasmine Washington',
      avatar: 'user-1.jpg',
    },
    {
      id: 'u2',
      name: 'Emily Thompson',
      avatar: 'user-2.jpg',
    },
    {
      id: 'u3',
      name: 'Marcus Johnson',
      avatar: 'user-3.jpg',
    },
    {
      id: 'u4',
      name: 'David Miller',
      avatar: 'user-4.jpg',
    },
    {
      id: 'u5',
      name: 'Priya Patel',
      avatar: 'user-5.jpg',
    },
    {
      id: 'u6',
      name: 'Arjun Singh',
      avatar: 'user-6.jpg',
    },
  ];

  get getUsers(){
    return this.DUMMY_USERS;
  }

  getUsersTasks(id:string):Task[] {
    return this.TEST_DATA.filter(task => task.id === id);
  }

  get getTasks(){
    return this.TEST_DATA;
  }
  onDeleteTask(id:string){
    this.TEST_DATA = this.TEST_DATA.filter(task => task.taskId !== id);
  }
  onAddTask(task:Task){
    this.TEST_DATA.push(task);
  }
}
