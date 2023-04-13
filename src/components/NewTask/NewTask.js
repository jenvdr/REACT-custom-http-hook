import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTP from '../../hooks/use-http';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: postData} = useHTTP();

  const transformData = ((taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  });

  const enterTaskHandler = async (taskText) => {
    postData({
      url: 'https://custom-http-hook-f524f-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',
      body: {text: taskText},
      headers: {
        'Content-Type': 'application/json',
      },
    }, transformData.bind(null, taskText));
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
