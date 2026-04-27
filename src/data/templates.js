export const templates = [
  {
    id: 'spring-1',
    name: '新年快乐 - 福到万家',
    category: 'spring',
    style: 'festive',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20with%20red%20background%20golden%20fu%20character%20lanterns%20fireworks%20elegant%20festive%20design&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20with%20red%20background%20golden%20fu%20character%20lanterns%20fireworks%20elegant%20festive%20design&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FF0000 0%, #FF4444 50%, #FFD700 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '新年快乐',
        x: 50,
        y: 25,
        fontSize: 64,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#FFD700',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '福到万家，万事如意',
        x: 50,
        y: 45,
        fontSize: 32,
        fontFamily: 'Noto Serif SC, serif',
        color: '#FFFFFF',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'text',
        id: 'date',
        content: '二〇二五年 农历乙巳年',
        x: 50,
        y: 70,
        fontSize: 24,
        fontFamily: 'Noto Serif SC, serif',
        color: '#FFD700',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.6
      },
      {
        type: 'decoration',
        id: 'lantern1',
        emoji: '🏮',
        x: 15,
        y: 10,
        size: 60,
        animation: 'swing'
      },
      {
        type: 'decoration',
        id: 'lantern2',
        emoji: '🏮',
        x: 85,
        y: 10,
        size: 60,
        animation: 'swing',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'fu',
        emoji: '🧧',
        x: 50,
        y: 55,
        size: 80,
        animation: 'pulse'
      }
    ],
    effects: ['fireworks', 'sparkle'],
    music: 'traditional',
    isHot: true,
    isNew: false
  },
  {
    id: 'spring-2',
    name: '新春大吉 - 迎春纳福',
    category: 'spring',
    style: 'elegant',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20elegant%20pink%20red%20plum%20blossom%20greeting%20card%20minimal%20luxury%20design&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20elegant%20pink%20red%20plum%20blossom%20greeting%20card%20minimal%20luxury%20design&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FFE4E6 0%, #FFC0CB 50%, #FF69B4 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '新春大吉',
        x: 50,
        y: 30,
        fontSize: 56,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#C41E3A',
        textAlign: 'center',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '迎春纳福，岁岁平安',
        x: 50,
        y: 50,
        fontSize: 28,
        fontFamily: 'Noto Serif SC, serif',
        color: '#8B0000',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      }
    ],
    effects: ['petals'],
    music: 'elegant',
    isHot: true,
    isNew: true
  },
  {
    id: 'midautumn-1',
    name: '中秋快乐 - 月圆人圆',
    category: 'midautumn',
    style: 'romantic',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mid-Autumn%20Festival%20full%20moon%20night%20sky%20rabbit%20mooncake%20elegant%20blue%20gold%20greeting%20card&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mid-Autumn%20Festival%20full%20moon%20night%20sky%20rabbit%20mooncake%20elegant%20blue%20gold%20greeting%20card&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '中秋快乐',
        x: 50,
        y: 35,
        fontSize: 56,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#FFD700',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(255,215,0,0.5)',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '月圆人团圆，千里共婵娟',
        x: 50,
        y: 55,
        fontSize: 28,
        fontFamily: 'Noto Serif SC, serif',
        color: '#E0E0E0',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'decoration',
        id: 'moon',
        emoji: '🌕',
        x: 50,
        y: 15,
        size: 70,
        animation: 'pulse'
      },
      {
        type: 'decoration',
        id: 'rabbit',
        emoji: '🐰',
        x: 30,
        y: 70,
        size: 50,
        animation: 'bounce'
      },
      {
        type: 'decoration',
        id: 'rabbit2',
        emoji: '🐰',
        x: 70,
        y: 70,
        size: 50,
        animation: 'bounce',
        delay: 0.3
      }
    ],
    effects: ['stars', 'sparkle'],
    music: 'elegant',
    isHot: true,
    isNew: false
  },
  {
    id: 'birthday-1',
    name: '生日快乐 - 温馨祝福',
    category: 'birthday',
    style: 'cartoon',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Happy%20Birthday%20colorful%20party%20confetti%20balloons%20cake%20warm%20pink%20orange%20gradient%20greeting%20card&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Happy%20Birthday%20colorful%20party%20confetti%20balloons%20cake%20warm%20pink%20orange%20gradient%20greeting%20card&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FFE5EC 0%, #FFC3A0 50%, #FFAFBD 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '生日快乐',
        x: 50,
        y: 25,
        fontSize: 56,
        fontFamily: 'ZCOOL KuaiLe, cursive',
        color: '#FF6B6B',
        textAlign: 'center',
        animation: 'bounce'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '愿你的每一天都充满欢笑与惊喜！',
        x: 50,
        y: 45,
        fontSize: 24,
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#666',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'text',
        id: 'wish',
        content: '岁岁年年，万喜万般宜',
        x: 50,
        y: 60,
        fontSize: 22,
        fontFamily: 'Noto Serif SC, serif',
        color: '#FF6B6B',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'cake',
        emoji: '🎂',
        x: 50,
        y: 75,
        size: 60,
        animation: 'pulse'
      },
      {
        type: 'decoration',
        id: 'balloon1',
        emoji: '🎈',
        x: 20,
        y: 20,
        size: 40,
        animation: 'float'
      },
      {
        type: 'decoration',
        id: 'balloon2',
        emoji: '🎈',
        x: 80,
        y: 25,
        size: 35,
        animation: 'float',
        delay: 0.5
      }
    ],
    effects: ['confetti', 'sparkle'],
    music: 'happy',
    isHot: true,
    isNew: true
  },
  {
    id: 'wedding-1',
    name: '新婚快乐 - 百年好合',
    category: 'wedding',
    style: 'elegant',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wedding%20blessing%20card%20romantic%20rose%20gold%20pink%20flowers%20elegant%20minimal%20luxury%20design&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wedding%20blessing%20card%20romantic%20rose%20gold%20pink%20flowers%20elegant%20minimal%20luxury%20design&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 50%, #FFDAB9 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '新婚快乐',
        x: 50,
        y: 25,
        fontSize: 52,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#C41E3A',
        textAlign: 'center',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '百年好合，永结同心',
        x: 50,
        y: 45,
        fontSize: 28,
        fontFamily: 'Noto Serif SC, serif',
        color: '#8B4513',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'text',
        id: 'wish',
        content: '愿你们的爱情如钻石般璀璨',
        x: 50,
        y: 60,
        fontSize: 20,
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#CD5C5C',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'rings',
        emoji: '💍',
        x: 50,
        y: 75,
        size: 50,
        animation: 'pulse'
      },
      {
        type: 'decoration',
        id: 'flower1',
        emoji: '🌹',
        x: 25,
        y: 75,
        size: 40,
        animation: 'float'
      },
      {
        type: 'decoration',
        id: 'flower2',
        emoji: '🌹',
        x: 75,
        y: 75,
        size: 40,
        animation: 'float',
        delay: 0.5
      }
    ],
    effects: ['petals', 'sparkle'],
    music: 'romantic',
    isHot: true,
    isNew: false
  },
  {
    id: 'valentine-1',
    name: '情人节快乐 - 爱你如初',
    category: 'valentine',
    style: 'romantic',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Valentine%27s%20Day%20love%20heart%20pink%20red%20romantic%20gradient%20sparkle%20elegant%20greeting%20card&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Valentine%27s%20Day%20love%20heart%20pink%20red%20romantic%20gradient%20sparkle%20elegant%20greeting%20card&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 50%, #FECFEF 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '情人节快乐',
        x: 50,
        y: 30,
        fontSize: 52,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#E91E63',
        textAlign: 'center',
        animation: 'pulse'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '爱你如初，岁月可鉴',
        x: 50,
        y: 50,
        fontSize: 26,
        fontFamily: 'Noto Serif SC, serif',
        color: '#C2185B',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'decoration',
        id: 'heart1',
        emoji: '❤️',
        x: 50,
        y: 68,
        size: 60,
        animation: 'pulse'
      },
      {
        type: 'decoration',
        id: 'heart2',
        emoji: '💕',
        x: 30,
        y: 68,
        size: 40,
        animation: 'float'
      },
      {
        type: 'decoration',
        id: 'heart3',
        emoji: '💕',
        x: 70,
        y: 68,
        size: 40,
        animation: 'float',
        delay: 0.5
      }
    ],
    effects: ['hearts', 'sparkle'],
    music: 'romantic',
    isHot: true,
    isNew: true
  },
  {
    id: 'teacher-1',
    name: '教师节快乐 - 感恩恩师',
    category: 'teacher',
    style: 'elegant',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Teacher%27s%20Day%20warm%20orange%20yellow%20graduation%20cap%20book%20sunflowers%20grateful%20greeting%20card&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Teacher%27s%20Day%20warm%20orange%20yellow%20graduation%20cap%20book%20sunflowers%20grateful%20greeting%20card&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '教师节快乐',
        x: 50,
        y: 25,
        fontSize: 52,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#8B4513',
        textAlign: 'center',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '师恩似海，桃李芬芳',
        x: 50,
        y: 45,
        fontSize: 28,
        fontFamily: 'Noto Serif SC, serif',
        color: '#CD853F',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'text',
        id: 'wish',
        content: '感谢您的辛勤付出，祝您节日快乐！',
        x: 50,
        y: 60,
        fontSize: 20,
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#8B4513',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'cap',
        emoji: '🎓',
        x: 50,
        y: 78,
        size: 50,
        animation: 'float'
      },
      {
        type: 'decoration',
        id: 'book',
        emoji: '📚',
        x: 30,
        y: 78,
        size: 40,
        animation: 'bounce'
      },
      {
        type: 'decoration',
        id: 'sunflower',
        emoji: '🌻',
        x: 70,
        y: 78,
        size: 45,
        animation: 'pulse'
      }
    ],
    effects: ['sparkle'],
    music: 'warm',
    isHot: true,
    isNew: false
  },
  {
    id: 'newyear-1',
    name: '元旦快乐 - 辞旧迎新',
    category: 'newyear',
    style: 'festive',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20Year%20celebration%20fireworks%20confetti%20elegant%20purple%20gold%20blue%20gradient%20greeting%20card&image_size=square',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20Year%20celebration%20fireworks%20confetti%20elegant%20purple%20gold%20blue%20gradient%20greeting%20card&image_size=square',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
    },
    elements: [
      {
        type: 'text',
        id: 'title',
        content: '元旦快乐',
        x: 50,
        y: 25,
        fontSize: 56,
        fontFamily: 'Ma Shan Zheng, cursive',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadow: '0 4px 15px rgba(0,0,0,0.3)',
        animation: 'fadeInUp'
      },
      {
        type: 'text',
        id: 'subtitle',
        content: '辞旧迎新，开启新篇章',
        x: 50,
        y: 45,
        fontSize: 28,
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#FFD700',
        textAlign: 'center',
        animation: 'fadeInUp',
        delay: 0.3
      },
      {
        type: 'text',
        id: 'year',
        content: '2026',
        x: 50,
        y: 62,
        fontSize: 48,
        fontFamily: 'ZCOOL KuaiLe, cursive',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(255,215,0,0.8)',
        animation: 'pulse',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'firework1',
        emoji: '🎆',
        x: 20,
        y: 15,
        size: 45,
        animation: 'pulse'
      },
      {
        type: 'decoration',
        id: 'firework2',
        emoji: '🎇',
        x: 80,
        y: 15,
        size: 45,
        animation: 'pulse',
        delay: 0.5
      },
      {
        type: 'decoration',
        id: 'champagne',
        emoji: '🍾',
        x: 50,
        y: 82,
        size: 50,
        animation: 'bounce'
      }
    ],
    effects: ['fireworks', 'confetti', 'sparkle'],
    music: 'celebration',
    isHot: true,
    isNew: true
  }
]

export const hotTemplates = templates.filter(t => t.isHot)
export const newTemplates = templates.filter(t => t.isNew)

export const getTemplatesByCategory = (categoryId) => {
  return templates.filter(t => t.category === categoryId)
}

export const getTemplateById = (id) => {
  return templates.find(t => t.id === id)
}

export const searchTemplates = (keyword) => {
  if (!keyword) return templates
  const lowerKeyword = keyword.toLowerCase()
  return templates.filter(t => 
    t.name.toLowerCase().includes(lowerKeyword) ||
    t.category.includes(lowerKeyword) ||
    t.style.includes(lowerKeyword)
  )
}
