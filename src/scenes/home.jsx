import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { FormCheck, Button, Spinner, Alert, Form } from 'react-bootstrap'; // Import Bootstrap components

const Home = () => {
    const [user] = useAuthState(auth);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskContent, setEditedTaskContent] = useState('');
    const [newTaskContent, setNewTaskContent] = useState('');
    const [showNewTaskInput, setShowNewTaskInput] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            if (user) {
                try {
                    const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setTasks(tasksData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                    setError('Error fetching tasks. Please try again later.');
                    setLoading(false);
                }
            }
            else {
                setTasks([]); 
                setLoading(false);
            }
        };

        fetchTasks();

        return () => {
            setTasks([]);
        };
    }, [user]);

    const handleTaskCompletionToggle = async (taskId, completed) => {
        try {
            await updateDoc(doc(db, 'tasks', taskId), { completed: !completed });
            setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, completed: !completed } : task));
        } catch (error) {
            console.error('Error updating task completion status:', error);
        }
    };

    const handleEditTask = (taskId, taskContent) => {
        setEditingTaskId(taskId);
        setEditedTaskContent(taskContent);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditedTaskContent('');
    };

    const handleSubmitEdit = async () => {
        try {
            await updateDoc(doc(db, 'tasks', editingTaskId), { content: editedTaskContent });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === editingTaskId ? { ...task, content: editedTaskContent } : task
                )
            );
            setEditingTaskId(null);
            setEditedTaskContent('');
        } catch (error) {
            console.error('Error updating task content:', error);
        }
    };

    const handleNewTaskSubmit = async () => {
        try {
            const newTask = {
                uid: user.uid,
                content: newTaskContent,
                completed: false
            };
            const docRef = await addDoc(collection(db, 'tasks'), newTask);
            setTasks(prevTasks => [...prevTasks, { id: docRef.id, ...newTask }]);
            setNewTaskContent('');
            setShowNewTaskInput(false);
        } catch (error) {
            console.error('Error adding new task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <section className="home" id="home">
            <h1 style={{ color: '#F05A22', marginBottom: '20px', fontFamily: 'Fira Sans' }}>
                {user ? 'Tasks' : <>
                    Welcome to Rabid Tasker<br />
                    Please log in to view your tasks
                </>}
            </h1>
            {loading && <Spinner animation="border" role="status" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {user && (
                <Button variant="primary" onClick={() => setShowNewTaskInput(true)} style={{ marginBottom: '10px' }}>
                    New Task
                </Button>
            )}
            {showNewTaskInput && (
                <div style={{ marginBottom: '10px' }}>
                    <Form.Control
                        type="text"
                        placeholder="Enter new task"
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        style={{ flex: '1', fontFamily: 'Fira Sans' }}
                    />
                    <Button variant="success" onClick={handleNewTaskSubmit} style={{ marginLeft: '10px' }}>Submit</Button>
                </div>
            )}
            <ul style={{ listStyleType: 'none' }}>
                {tasks.map(task => (
                    <li key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <FormCheck
                            type="checkbox"
                            id={task.id}
                            checked={task.completed}
                            onChange={() => handleTaskCompletionToggle(task.id, task.completed)}
                            style={{ marginRight: '10px' }}
                        />
                        {editingTaskId === task.id ? (
                            <Form.Control
                                type="text"
                                value={editedTaskContent}
                                onChange={(e) => setEditedTaskContent(e.target.value)}
                                style={{ flex: '1', fontFamily: 'Fira Sans' }}
                            />
                        ) : (
                            <h3 className="taskContent" style={{ flex: '1', color: '#F05A22', fontFamily: 'Fira Sans', marginBottom: '0' }}>{task.content}</h3>
                        )}
                        {editingTaskId === task.id ? (
                            <>
                                <Button variant="success" onClick={handleSubmitEdit} style={{ marginLeft: '10px' }}>Submit</Button>
                                <Button variant="danger" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="info" onClick={() => handleEditTask(task.id, task.content)} style={{ marginLeft: '10px' }}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
