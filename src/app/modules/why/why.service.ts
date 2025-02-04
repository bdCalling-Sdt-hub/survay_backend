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

    // console.log('Formatted JSON Output:', parsedData);
    // Convert AI-generated course topics into search links
    parsedData.courseSuggestions = parsedData.courseTopics.flatMap(
      (topic: any) => generateCourseSearchLinks(topic),
    );

    console.log('parsed data', parsedData);
    const result = await Why.create({ ...parsedData, user: profileId });
    return result;
  } catch (error) {
    console.error('Error generating overview:', error);
    throw error;
  }
};

// function generatePrompt(
//   questionsAndAnswers: [{ question: string; answer: string }],
// ) {
//   const prompt = `
//       Based on the following answers to personal growth questions, generate an overview in the requested format:

//       Questions and Answers:
//       ${questionsAndAnswers
//         .map((qna) => `Q: ${qna.question}\nA: ${qna.answer}\n`)
//         .join('\n')}

//       Generate the overview with these fields:
//       {
//         "initialSummary": "string",
//         "keyPoints": [
//           "string"
//         ],
//         "strengths": [
//           {
//             "title": "string",
//             "description": "string"
//           }
//         ],
//         "weaknesses": [
//           {
//             "title": "string",
//             "description": "string"
//           }
//         ],
//         "pieChartData": [
//           {
//             "category": "string",
//             "percentage": "number"
//           }
//         ],
//         "progressBarData": [
//           {
//             "label": "string",
//             "percentage": "number"
//           }
//         ],
//         "finalSummary": "string"
//       }`;

//   return prompt;
// }

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
        "finalSummary": "string",
        "courseTopics": [
        "string"
      ]
      }

     In the "courseTopics" section, suggest at least 3 learning topics that would help improve the weaknesses.
  `;

  return prompt;
}

const generateCourseSearchLinks = (topic: any) => {
  return [
    {
      title: `Learn ${topic} on Udemy`,
      description: `Find courses on ${topic} from Udemy.`,
      platform: 'Udemy',
      link: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(
        topic,
      )}`,
    },
    {
      title: `Learn ${topic} on Coursera`,
      description: `Explore ${topic} courses on Coursera.`,
      platform: 'Coursera',
      link: `https://www.coursera.org/search?query=${encodeURIComponent(
        topic,
      )}`,
    },
    {
      title: `Watch ${topic} Courses on YouTube`,
      description: `Free video courses on ${topic} from YouTube.`,
      platform: 'YouTube',
      link: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        topic + ' course',
      )}`,
    },
  ];
};

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
