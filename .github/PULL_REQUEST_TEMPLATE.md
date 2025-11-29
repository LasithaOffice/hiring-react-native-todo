## 🚀 Description

~ Features

> Add new Tasks by clicking the Plus button and then filling in the task name in the field and pressing the keyboard's Done button
> Update task name by clicking the task name label, make the change, and hit the Done button
> To remove a task, integrated pan to remove using gestures
> Saved tasks will be loaded at startup
> Integrated the global state using Redux
> Used react-native-svg and svg-transform libs to display SVGs
> Used @react-native-async-storage/async-storage (Async storage) to implement data persistence locally 
> Used reanimated lib to integrate animations related to the adding field spawn, checked, and unchecked animation, for the slide removal of tasks, and for the floating button movement with the keyboard.

---

## 💡 Solution Rationale & User Value

Please take a moment to explain:

- Why you structured the solution the way you did 
- I used React native CLI to do the project because I am familiar with CLI, and since I already had previous experience with native development. In the project, I maintained a standard folder structure (screens, components, hooks, assets, constants, redux, types). screens will contain all the screens. But in this case, since the app only has one screen, I put the main component inside it just to represent how I create different screens. When there are more screens, the screens folder will also be divided into subfolders based on the project scope, and a navigation folder will be maintained. 
- Basically, I will use the component-based architecture and will create components under different categories (UI, Layouts, wrappers, etc.). In this project, I created a couple of UI components and one major component.
- I will develop the component-related process using custom hooks for a better structure and reusability of the actions and put those hooks in the hooks folder.
- The assets folder will contain images, font resources, etc.
- The constants folder will contain global constants such as color values, dimensions, and extracted static strings.
- The redux folder will contain the redux-related store and slice files.
- The type folder will contain interfaces and types to maintain TypeScript code.
- I put styles in a separate file, usually if the screen or component is complex. Otherwise, I put styles in the same file.
- I use yarn to control dependencies, and apart from that, I use Babel to set rules, like how the code should be structured, and use libraries like ESLint, Prettier, and Husky to make things easier.

- What you were optimizing for (e.g., performance, readability, UX)
- To enhance the performance of the app, I have used memo hook to improve the calculated values in components. Also used useCallback to prevent any function recreation in the memory due to re-renders.
- Used SVGs to optimize the UI performance, and used as many native components as possible rather than a UI 3rd party library.
- Also, always use well-known libraries that are well updated. For a better user experience, I integrated fewer buttons and used keyboard events in some cases. Reanimated was used to build smooth component interactions.

- How this benefits the end user
- Users can easily create new Tasks, and the instructions are straightforward. Once the user types a task name and the focus is lost from the field, the task will be saved.
- Again, when the user clicks on a task in the same place, Users can easily retype the task name and follow the same steps as adding a new Task to update it.
- The user can remove any tasks easily by swiping as in other standard apps. Once the user has created a task, only at that time can the checkbox be checked or unchecked. Completed tasks can't be edited as they have already been completed.
- When a task is being edited, it can't be checked.
- The tasks will be sorted based on the Time in descending order (newest tasks will be listed top, but the order can be changed based on the need), and it will help the users see the latest tasks first.


This helps us understand how you think and make decisions.

---

## 💾 Local Persistence Rationale

Explain which local storage method you used (e.g. AsyncStorage, MMKV, SQLite) and why.  

- Used AsynStorage and used the tasks array to be saved. To do that, first, I put a useEffect to capture the changes that happened to the tasks array in redux, and based on that, created an object(LocalTasks) using an interface that has a Task array property to save the list of all the tasks in redux. 
- Then I converted that object into a Json string and saved it using async storage locally. Then, at the startup, first I will fetch the json string that is currently saved in local storage and convert it back to a JSON object and dispatch that into the redux store. The startup load will happen only once. Then, as the redux tasks list changes, I update the local storage.

Include any trade-offs or reasons behind your choice.

---

## 🧠 Global State (if used)

If you used a global state management solution (e.g. Redux, Zustand), briefly explain:

- I used Redux to manage the global state. made a slice called Tasks and kept the list of tasks and the current task that's being updated (undefined if nothing). used this to fetch and update the list of all tasks and the current updated tasks in any component using selector and update from anywhere using dispatch.

- Why it was used
- Mainly within the app, once we make a change to the tasks, first it will update the redux store globally, and it makes to happen necessary updates anywhere based on that task's change. and also anywhere the task list is accessible without putting any effort.
- What value it added over local state
- When we use global states rather than local storage, we will be able to catch the changes that are going to happen to the tasks list more easily than with local storage. 


---

## 💫 Animations (Bonus, if implemented)

- I used re-animated to handle new task spawn, and once a new task is started to create, other tasks will slide smoothly down. used reanimate to animate the floating button without covering it with the keyboard.
- Also, present the task's complete state with a line using reanimated. used a gesture to integrate the removal process for tasks.

## 🎥 Demo Video

Include a link to a short screen recording (e.g. Loom or MP4) showing the app in use.

> https://www.loom.com/share/5c74b6cb83e5448891735ff90f1b7e03

---

## 🛠️ Setup Instructions (if different from README)

- Works in both Android and iOS. First, clone the project. For iOS, run the pod-installer. Once the app is opened. Press the plus button to add a new task. Slide to remove it.

---

## 📌 Known Limitations / Assumptions

- First tried to add the font related to the main Title and didn't quite work for iOS. Then had to integrate the title as an SVG, which I got from Figma.

- Since I couldn't get any icons from Figma, I had to find them online.

---

## ✅ Checklist

- [ ✅] Tasks can be added
- [ ✅] Tasks can be viewed
- [ ✅] Tasks can be edited
- [ ✅] Tasks can be marked complete/incomplete
- [ ✅] Tasks can be deleted
- [ ✅] Data is persisted locally on the device
- [ ✅] Local storage method explained
- [ ✅] (Optional) Global state usage explained
- [ ✅] (Optional) Animations added using `react-native-reanimated`
- [✅ ] Demo video included
- [ ✅] Solution rationale & user value explained

---
