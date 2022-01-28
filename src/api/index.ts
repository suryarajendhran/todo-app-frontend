import superagent from 'superagent';

const apiURL = 'http://localhost:8080/';

const getAllTodos = async () => {
  try {
    const res = await superagent.get(`${apiURL}`);
    return res.body;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const createTodo = async (description: string): Promise<any> => {
  try {
    const res = await superagent.post(`${apiURL}`).send({ description });
    return res.body;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const updateTodo = async (todo: any): Promise<any> => {
  try {
    const res = await superagent.put(`${apiURL}`).send(todo);
    console.log(res.body);
    return res.body;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default { createTodo, getAllTodos, updateTodo };
