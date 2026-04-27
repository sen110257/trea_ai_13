export const categories = [
  {
    id: 'recommend',
    name: '精选推荐',
    icon: 'Star',
    color: '#9333EA',
    templates: []
  },
  {
    id: 'traditional',
    name: '中国传统节日',
    icon: 'Promotion',
    color: '#EF4444',
    items: [
      { id: 'spring', name: '春节', icon: 'Cup', color: '#EF4444' },
      { id: 'lantern', name: '元宵节', icon: 'Sunny', color: '#F59E0B' },
      { id: 'qingming', name: '清明节', icon: 'Rainy', color: '#10B981' },
      { id: 'dragon', name: '端午节', icon: 'Van', color: '#10B981' },
      { id: 'qixi', name: '七夕节', icon: 'Heart', color: '#EC4899' },
      { id: 'midautumn', name: '中秋节', icon: 'Moon', color: '#F59E0B' },
      { id: 'double9', name: '重阳节', icon: 'Calendar', color: '#10B981' },
      { id: 'dongzhi', name: '冬至', icon: 'Snowy', color: '#3B82F6' }
    ]
  },
  {
    id: 'legal',
    name: '法定节假日',
    icon: 'Document',
    color: '#3B82F6',
    items: [
      { id: 'newyear', name: '元旦', icon: 'Calendar', color: '#9333EA' },
      { id: 'women', name: '妇女节', icon: 'User', color: '#EC4899' },
      { id: 'labor', name: '劳动节', icon: 'Tools', color: '#10B981' },
      { id: 'children', name: '儿童节', icon: 'UserFilled', color: '#06B6D4' },
      { id: 'teacher', name: '教师节', icon: 'Reading', color: '#F59E0B' },
      { id: 'national', name: '国庆节', icon: 'Flag', color: '#EF4444' }
    ]
  },
  {
    id: 'solar',
    name: '二十四节气',
    icon: 'Clock',
    color: '#10B981',
    items: [
      { id: 'lichun', name: '立春', icon: 'Sunny', color: '#10B981' },
      { id: 'yushui', name: '雨水', icon: 'Rainy', color: '#3B82F6' },
      { id: 'jingzhe', name: '惊蛰', icon: 'Lightning', color: '#F59E0B' },
      { id: 'chunfen', name: '春分', icon: 'Sunrise', color: '#10B981' },
      { id: 'qingming2', name: '清明', icon: 'Rainy', color: '#10B981' },
      { id: 'guyu', name: '谷雨', icon: 'Watermelon', color: '#10B981' },
      { id: 'lixia', name: '立夏', icon: 'Sunny', color: '#EF4444' },
      { id: 'xiaoman', name: '小满', icon: 'Wheat', color: '#F59E0B' },
      { id: 'mangzhong', name: '芒种', icon: 'Connection', color: '#10B981' },
      { id: 'xiazhi', name: '夏至', icon: 'Sunny', color: '#EF4444' },
      { id: 'xiaoshu', name: '小暑', icon: 'HotWater', color: '#EF4444' },
      { id: 'dashu', name: '大暑', icon: 'Sunny', color: '#EF4444' },
      { id: 'liqiu', name: '立秋', icon: 'MapLocation', color: '#F59E0B' },
      { id: 'chushu', name: '处暑', icon: 'Sunset', color: '#F59E0B' },
      { id: 'bailu', name: '白露', icon: 'Drizzling', color: '#3B82F6' },
      { id: 'qiufen', name: '秋分', icon: 'Sunset', color: '#F59E0B' },
      { id: 'hanlu', name: '寒露', icon: 'Snowy', color: '#3B82F6' },
      { id: 'shuangjiang', name: '霜降', icon: 'Snowy', color: '#3B82F6' },
      { id: 'lidong', name: '立冬', icon: 'Snowy', color: '#3B82F6' },
      { id: 'xiaoxue', name: '小雪', icon: 'Snowy', color: '#3B82F6' },
      { id: 'daxue', name: '大雪', icon: 'Snowy', color: '#3B82F6' },
      { id: 'dongzhi2', name: '冬至', icon: 'Snowy', color: '#3B82F6' },
      { id: 'xiaohan', name: '小寒', icon: 'ColdDrink', color: '#3B82F6' },
      { id: 'dahan', name: '大寒', icon: 'Snowy', color: '#3B82F6' }
    ]
  },
  {
    id: 'life',
    name: '人生礼仪',
    icon: 'House',
    color: '#EC4899',
    items: [
      { id: 'birthday', name: '生日快乐', icon: 'Cake', color: '#EC4899' },
      { id: 'wedding', name: '婚礼祝福', icon: 'Coin', color: '#EF4444' },
      { id: 'baby', name: '生子满月', icon: 'UserFilled', color: '#EC4899' },
      { id: 'hundred', name: '百天宴', icon: 'Calendar', color: '#EC4899' },
      { id: 'birthdayold', name: '老人祝寿', icon: 'Cup', color: '#F59E0B' },
      { id: 'house', name: '乔迁新居', icon: 'House', color: '#10B981' },
      { id: 'business', name: '开业升职', icon: 'TrendCharts', color: '#F59E0B' },
      { id: 'graduation', name: '毕业祝福', icon: 'Reading', color: '#3B82F6' },
      { id: 'friend', name: '闺蜜送礼', icon: 'ChatLineRound', color: '#EC4899' },
      { id: 'business2', name: '商务答谢', icon: 'Briefcase', color: '#6B7280' },
      { id: 'valentine', name: '情人节告白', icon: 'Heart', color: '#EF4444' }
    ]
  },
  {
    id: 'wishes',
    name: '日常祝福',
    icon: 'ChatLineSquare',
    color: '#06B6D4',
    items: [
      { id: 'morning', name: '早安问候', icon: 'Sunrise', color: '#F59E0B' },
      { id: 'night', name: '晚安祝福', icon: 'Moon', color: '#6B7280' },
      { id: 'thanks', name: '感谢问候', icon: 'ChatLineRound', color: '#9333EA' },
      { id: 'sorry', name: '道歉表达', icon: 'Warning', color: '#EF4444' },
      { id: 'missing', name: '思念问候', icon: 'Heart', color: '#EC4899' },
      { id: 'encourage', name: '鼓励打气', icon: 'Trophy', color: '#10B981' }
    ]
  }
]

export const templateStyles = [
  { id: 'elegant', name: '优雅轻奢', color: '#9333EA' },
  { id: 'romantic', name: '浪漫唯美', color: '#EC4899' },
  { id: 'festive', name: '喜庆热闹', color: '#EF4444' },
  { id: 'simple', name: '简约清新', color: '#10B981' },
  { id: 'ancient', name: '国潮古风', color: '#F59E0B' },
  { id: 'cartoon', name: '可爱卡通', color: '#06B6D4' }
]

export const cardSizes = [
  { id: 'square', name: '朋友圈方形', width: 800, height: 800, icon: 'Grid' },
  { id: 'vertical', name: '微信竖版', width: 720, height: 1280, icon: 'Document' },
  { id: 'horizontal', name: '海报横版', width: 1280, height: 720, icon: 'Picture' },
  { id: 'avatar', name: '头像尺寸', width: 400, height: 400, icon: 'UserFilled' }
]
