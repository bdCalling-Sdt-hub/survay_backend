import OpenAI from 'openai';
import config from '../../config';
import Why from './why.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
const openai = new OpenAI({
  apiKey: config.open_ai_api_key,
});
/* eslint-disable @typescript-eslint/no-explicit-any */

interface qa {
  question: string;
  answer: string;
}
const generateWhyOverview = async (profileId: string, questionAnswer: qa[]) => {
  const prompt = generatePrompt(questionAnswer as any);

  try {
    // const response = await openai.createCompletion({
    //   model: 'gpt-3.5-turbo', // or whichever model you're using
    //   prompt: prompt,
    //   max_tokens: 1000,
    //   temperature: 0.7,
    // });

    // return response.data.choices[0].text.trim();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log(response.choices[0].message.content);
    // return response.choices[0].message.content;
    const parsedData = JSON.parse(
      response.choices[0].message.content as string,
    );
    // save why in database with user
    const result = await Why.create({ ...parsedData, user: profileId });
    console.log('Formatted JSON Output:', parsedData);
    return result;
  } catch (error) {
    console.error('Error generating overview:', error);
    throw error;
  }
};

function generatePrompt(
  questionsAndAnswers: [{ question: string; answer: string }],
) {
  const prompt = `
      Based on the following answers to personal growth questions, generate an overview in the requested format:
  
      Questions and Answers:
      ${questionsAndAnswers
        .map((qna) => `Q: ${qna.question}\nA: ${qna.answer}\n`)
        .join('\n')}
  
      Generate the overview with these fields:
      {
        "initialSummary": "string",
        "keyPoints": [
          "string"
        ],
        "strengths": [
          {
            "title": "string",
            "description": "string"
          }
        ],
        "weaknesses": [
          {
            "title": "string",
            "description": "string"
          }
        ],
        "pieChartData": [
          {
            "category": "string",
            "percentage": "number"
          }
        ],
        "progressBarData": [
          {
            "label": "string",
            "percentage": "number"
          }
        ],
        "finalSummary": "string"
      }`;

  return prompt;
}

const getAllWhy = async (query: Record<string, unknown>) => {
  const whyQuery = new QueryBuilder(
    Why.find().populate({
      path: 'user',
      select: 'name profile_image phone email',
    }),
    query,
  )
    .search(['title', 'description'])
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = await whyQuery.modelQuery;
  const meta = await whyQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getMyWhy = async (profileId: string) => {
  const result = await Why.find({ user: profileId });
  return result;
};
const getSingleWhy = async (id: string) => {
  const result = await Why.findById(id);
  return result;
};

const deleteWhy = async (profileId: string, whyId: string) => {
  const why = await Why.findOne({ user: profileId, _id: whyId });

  if (!why) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Why not found that you want to delete',
    );
  }
  const result = await Why.findByIdAndDelete(whyId);
  return result;
};

const WhyService = {
  generateWhyOverview,
  getAllWhy,
  getMyWhy,
  deleteWhy,
  getSingleWhy,
};

export default WhyService;
