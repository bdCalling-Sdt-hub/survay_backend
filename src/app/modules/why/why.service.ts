import OpenAI from 'openai';
import config from '../../config';
const openai = new OpenAI({
  apiKey: config.open_ai_api_key,
});
/* eslint-disable @typescript-eslint/no-explicit-any */
const generateWhyOverview = async () => {
  const practicalLifeQA = [
    {
      question: 'What am I passionate about?',
      answer:
        'Technology and its potential to solve problems, personal fitness and healthy living, and teaching others new skills. These are areas where I consistently find motivation and energy.',
    },
    {
      question: 'What activities make me feel alive or energized?',
      answer:
        'Morning workouts, solving complex problems at work, teaching others new skills, and having deep conversations about technology and innovation. Physical activity combined with mental challenges keeps me energized.',
    },
    {
      question:
        "When do I lose track of time because I'm so engrossed in what I'm doing?",
      answer:
        'When coding and building new features, during intense workout sessions, while learning new technologies, and when helping colleagues solve technical problems.',
    },
    {
      question:
        'What topics or issues do I feel compelled to learn more about?',
      answer:
        "Artificial intelligence developments, sustainable living practices, investment strategies, and emerging technologies that could impact daily life. I'm drawn to topics that combine innovation with practical applications.",
    },
    {
      question: 'What principles or beliefs do I hold most dear?',
      answer:
        'Continuous learning is essential for growth, honesty in all interactions, reliability in professional and personal commitments, and the importance of maintaining work-life balance.',
    },
    {
      question:
        'What would I fight for or stand up for, no matter the consequences?',
      answer:
        'Fair treatment in the workplace, protecting team members from unreasonable demands, maintaining ethical standards in business practices, and defending the right to maintain work-life boundaries.',
    },
    {
      question: 'Which qualities in others do I admire the most?',
      answer:
        'Consistency in their commitments, ability to admit mistakes and learn from them, willingness to help others grow, and maintaining professionalism under pressure.',
    },
    {
      question: 'How do I want to be remembered by others?',
      answer:
        'As someone who helped others advance their careers, maintained high professional standards, contributed to team success, and balanced achievement with personal well-being.',
    },
    {
      question:
        'What kind of impact do I want to leave on my community or the world?',
      answer:
        'Creating tools or systems that make work more efficient, mentoring others to achieve their professional goals, and contributing to sustainable business practices.',
    },
    {
      question:
        'If I could accomplish just one thing in my life, what would it be?',
      answer:
        'Building a successful company that prioritizes both employee well-being and environmental responsibility while delivering valuable solutions to customers.',
    },
    {
      question:
        'What experiences or achievements have made me feel truly proud?',
      answer:
        'Successfully leading major project implementations, helping team members get promoted, maintaining fitness goals while managing a busy career, and learning new technologies independently.',
    },
    {
      question: 'What gives me a sense of purpose or deep satisfaction?',
      answer:
        'Solving complex technical problems, seeing direct positive impact from my work, helping others develop their skills, and achieving personal development goals.',
    },
    {
      question: 'How do I define personal success?',
      answer:
        'Maintaining expertise in my field while helping others grow, achieving financial stability without sacrificing health or relationships, and consistently meeting professional and personal goals.',
    },
    {
      question: 'What talents or skills come naturally to me?',
      answer:
        'Problem-solving in technical contexts, explaining complex concepts simply, organizing efficient work processes, and adapting quickly to new technologies.',
    },
    {
      question: 'How do my unique abilities contribute to the world around me?',
      answer:
        'My technical skills help create efficient solutions, my teaching ability helps others advance their careers, and my organizational skills improve team productivity.',
    },
    {
      question: 'What do others often ask for my help with?',
      answer:
        'Technical problem-solving, career advice, project planning and organization, and understanding new technologies or systems.',
    },
    {
      question:
        'How have past hardships or difficult experiences shaped my perspective on life?',
      answer:
        'Failed projects taught me the importance of thorough planning, career setbacks showed the value of continuous learning, and work stress highlighted the necessity of maintaining boundaries.',
    },
    {
      question: 'What have I learned from overcoming adversity?',
      answer:
        'The importance of maintaining updated skills, building strong professional networks, having multiple income streams, and prioritizing health despite work pressures.',
    },
    {
      question: 'How do I want to use my struggles to help others?',
      answer:
        'Share lessons learned from career challenges, mentor others through difficult professional transitions, and teach stress management techniques that worked for me.',
    },
    {
      question: 'What types of people do I want in my life?',
      answer:
        'Growth-minded professionals who value continuous learning, reliable teammates who follow through on commitments, and friends who respect work-life boundaries.',
    },
    {
      question:
        'How do I want to show up for others, and how do I want them to show up for me?',
      answer:
        "Be reliable and supportive in professional contexts, respect others' time and boundaries, and expect the same level of professionalism and respect in return.",
    },
    {
      question:
        'What role do I want to play in my family, friendships, and community?',
      answer:
        "A reliable resource for technical and career guidance, a supporter of others' professional growth, and an advocate for sustainable business practices.",
    },
    {
      question:
        'What emotions or states of being do I want to experience regularly?',
      answer:
        'Professional confidence, satisfaction from solving problems, excitement about learning new technologies, and calm from maintaining work-life balance.',
    },
    {
      question:
        'How do I want to feel when I wake up in the morning and when I go to bed at night?',
      answer:
        'Energized and focused on clear goals in the morning, satisfied with meaningful progress and maintaining boundaries at night.',
    },
    {
      question: 'What does a sense of balance, peace, or joy look like for me?',
      answer:
        'Having time for both career advancement and personal development, maintaining physical health while meeting professional goals, and feeling financially secure.',
    },
    {
      question: 'How do I want to make people feel when they interact with me?',
      answer:
        'Confident in their ability to learn new skills, supported in their professional growth, and respected in their work boundaries.',
    },
    {
      question:
        'What role do I want to play in helping others grow, learn, or heal?',
      answer:
        'Be a technical mentor, guide others in career development, and share effective strategies for maintaining work-life balance.',
    },
    {
      question:
        'In what way do I want to contribute to the well-being of others?',
      answer:
        'Create efficient systems that reduce work stress, teach valuable technical skills, and promote healthy work-life practices.',
    },
    {
      question: 'If there were no limitations, how would I spend my time?',
      answer:
        'Building innovative technology solutions, mentoring others full-time, traveling to learn different business practices, and maintaining optimal health routines.',
    },
    {
      question:
        "What kind of work or creative projects would I pursue if I wasn't worried about making a living?",
      answer:
        'Developing open-source software for social good, creating comprehensive learning platforms, and researching sustainable technology solutions.',
    },
    {
      question: "What risks would I take if I knew I couldn't fail?",
      answer:
        'Starting a technology company focused on sustainability, developing innovative educational platforms, and implementing new workplace well-being programs.',
    },
    {
      question: 'What does a truly fulfilling life look like for me?',
      answer:
        'Leading successful technical projects while maintaining work-life balance, continuously learning and sharing knowledge, and achieving financial security through valuable work.',
    },
    {
      question:
        'What needs to change in my life to make me feel more aligned with my values and passions?',
      answer:
        'Setting stricter work boundaries, dedicating more time to learning new technologies, and creating structured mentoring programs.',
    },
    {
      question: "How do I define happiness in a way that's meaningful to me?",
      answer:
        "Achieving professional excellence while maintaining health, having financial security through valuable work, and making meaningful contributions to others' growth.",
    },
    {
      question:
        'What am I most afraid of, and how does that fear shape my decisions and actions?',
      answer:
        'Fear of technical obsolescence leads to continuous learning, fear of financial instability drives multiple income streams, fear of burnout enforces better boundaries.',
    },
    {
      question:
        'Does my fear stem from a desire to protect myself, or is it a call to grow beyond my comfort zone?',
      answer:
        'Fears about staying relevant drive professional growth, while fears about work-life balance protect well-being. Both serve valuable purposes when properly managed.',
    },
    {
      question: 'What would happen if I faced this fear head-on?',
      answer:
        'Taking calculated risks in career transitions could lead to better opportunities, addressing work-life balance fears might improve overall productivity and satisfaction.',
    },
    {
      question:
        'When do I feel most at peace with myself and the world around me?',
      answer:
        'After successfully completing challenging projects, during focused learning sessions, while exercising, and when helping others overcome technical challenges.',
    },
    {
      question:
        "What experiences make me feel like I'm part of something bigger than myself?",
      answer:
        'Contributing to open-source projects, mentoring others to career success, and participating in technology initiatives for social good.',
    },
    {
      question:
        'How do I connect with nature, other people, or my spiritual beliefs?',
      answer:
        'Through outdoor exercise, collaborative problem-solving at work, and maintaining regular meditation practice for mental clarity.',
    },
    {
      question: 'What experiences or places are on my bucket list?',
      answer:
        'Working with cutting-edge tech companies, attending major technology conferences, and visiting innovation hubs around the world.',
    },
    {
      question: 'What knowledge or skills do I want to acquire before I die?',
      answer:
        'Mastery of emerging technologies, advanced project management skills, effective leadership techniques, and sustainable business practices.',
    },
    {
      question: 'How can these desires shape my broader purpose?',
      answer:
        'Combining technical expertise with leadership skills to create positive change in how technology is developed and implemented in business.',
    },
    {
      question:
        'What would I deeply regret never trying or achieving in my life?',
      answer:
        'Not starting my own technology company, failing to make a significant impact through innovation, or not helping enough others advance their careers.',
    },
    {
      question: 'What dreams or aspirations have I put aside, and why?',
      answer:
        'Entrepreneurial ventures due to financial security concerns, advanced certifications due to time constraints, and leadership roles due to technical comfort zone.',
    },
    {
      question:
        'If I only had a limited amount of time left, what would I make sure to do?',
      answer:
        'Document and share technical knowledge, ensure ongoing projects have clear handover plans, and mentor others to take over key responsibilities.',
    },
    {
      question:
        'How do I define growth, and what does it look like in my life?',
      answer:
        "Continuous technical skill development, improved leadership abilities, better work-life balance management, and increased positive impact on others' careers.",
    },
    {
      question: 'What areas of my life do I want to improve or evolve?',
      answer:
        'Leadership capabilities, stress management techniques, ability to delegate effectively, and strategic career planning skills.',
    },
    {
      question:
        'What lessons have I learned, and how do I want to continue learning?',
      answer:
        'The importance of staying technically current, maintaining professional networks, and balancing career growth with personal well-being.',
    },
    {
      question:
        'Who do I admire and look up to, and what qualities do they embody?',
      answer:
        'Successful tech leaders who maintain work-life balance, innovators who prioritize sustainable practices, and mentors who actively help others grow.',
    },
    {
      question:
        'What aspects of their life or journey resonate with my own aspirations?',
      answer:
        'Their ability to innovate while maintaining ethics, balance professional success with personal well-being, and create positive impact through technology.',
    },
    {
      question:
        'How can I emulate the best traits of those I admire in my own life?',
      answer:
        'Adopt their learning habits, implement their time management strategies, and follow their examples of ethical leadership in technology.',
    },
    {
      question: 'If I lost everything today, what would I pursue next?',
      answer:
        'Focus on rebuilding technical skills in emerging areas, establish a strong online presence, and create value through teaching and consulting.',
    },
    {
      question:
        'What parts of my current life would I rebuild, and what would I leave behind?',
      answer:
        'Rebuild: technical expertise, professional networks, and healthy routines. Leave behind: inefficient work patterns and unclear boundaries.',
    },
    {
      question:
        'How would I go about creating a life that feels meaningful and true to me?',
      answer:
        'Focus on creating valuable technical solutions, maintaining strong professional relationships, and ensuring sustainable work practices while pursuing goals.',
    },
  ];
  const prompt = generatePrompt(practicalLifeQA as any);

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
    return response.choices[0].message.content;
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

const WhyService = {
  generateWhyOverview,
};

export default WhyService;
