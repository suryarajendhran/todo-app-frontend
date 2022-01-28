import superagent from 'superagent';

const getAllTodos = () => ["Here's a todo"];

const apiURL = 'http://localhost:8080/';

const createTodo = async (description: string): Promise<any> => {
  try {
    const res = await superagent.post(`${apiURL}`).send({ description });
    return res.body;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default { createTodo };
