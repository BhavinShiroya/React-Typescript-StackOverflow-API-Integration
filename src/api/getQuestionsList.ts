import axios from "axios";
import { AxiosResponse } from 'axios';
import { QuestionTypes } from './../types';

const URL: string = 'https://api.stackexchange.com';

type GetQuestionsConfig = {
  page: number;
  pageSize: number;
};

type GetQuestionsList = (config: GetQuestionsConfig) => Promise<QuestionTypes>;

export const getQuestionsList: GetQuestionsList = async ({ page, pageSize }: GetQuestionsConfig) => {
  try {
    const reqPath = `${URL}/2.2/questions?page=${page}&pagesize=${pageSize}&order=desc&sort=activity&site=stackoverflow`;
    const getQuestionsResp: AxiosResponse<QuestionTypes> = await axios.request({
      method: 'GET',
      url: reqPath,
    });
    const status = getQuestionsResp.status;
    if (status !== 200) throw new Error('incorrect_status_code');
    return getQuestionsResp.data;
  } catch (err) {
    return err;
  }
};
