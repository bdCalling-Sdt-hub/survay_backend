import NormalUser from '../normalUser/normalUser.model';
import Story from '../story/story.model';

const getDashboardMetaData = async () => {
  const totalUser = await NormalUser.countDocuments();
  const totalStory = await Story.countDocuments();
  // need to dynamic the why
  const totalWhy = 200;

  return {
    totalUser,
    totalStory,
    totalWhy,
  };
};

const getUserChartData = async (year: number) => {
  const startOfYear = new Date(year, 0, 1);

  const endOfYear = new Date(year + 1, 0, 1);

  const chartData = await NormalUser.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalUser: { $sum: 1 },
      },
    },
    {
      $project: {
        month: '$_id',
        totalUser: 1,
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const data = Array.from({ length: 12 }, (_, index) => ({
    month: months[index],
    totalUser:
      chartData.find((item) => item.month === index + 1)?.totalUser || 0,
  }));
  return data;
};

const MetaService = {
  getDashboardMetaData,
  getUserChartData,
};
export default MetaService;
