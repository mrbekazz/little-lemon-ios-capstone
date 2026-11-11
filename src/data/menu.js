export const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export const MENU = [
  { id: '1', title: 'Greek Salad', category: 'Starters', price: 12.99, description: 'Crisp cucumber, tomato, olives and feta, with our signature dressing.', image: require('../../assets/dishes/greek-salad.png') },
  { id: '2', title: 'Bruschetta', category: 'Starters', price: 7.99, description: 'Grilled bread topped with fresh tomatoes, basil and olive oil.', image: require('../../assets/dishes/bruschetta.png') },
  { id: '3', title: 'Lemon Pasta', category: 'Mains', price: 16.50, description: 'Silky pasta tossed with lemon, parmesan and fresh herbs.', image: require('../../assets/dishes/lemon-pasta.png') },
  { id: '4', title: 'Grilled Fish', category: 'Mains', price: 21.00, description: 'Pan-seared Mediterranean fish with lemon and garden vegetables.', image: require('../../assets/dishes/grilled-fish.png') },
  { id: '5', title: 'Falafel Bowl', category: 'Mains', price: 14.50, description: 'Golden falafel with hummus, greens and tangy tahini.', image: require('../../assets/dishes/falafel-bowl.png') },
  { id: '6', title: 'Lemon Dessert', category: 'Desserts', price: 8.50, description: 'Our soft lemon cake with creamy topping and citrus zest.', image: require('../../assets/dishes/lemon-dessert.png') },
  { id: '7', title: 'Tiramisu', category: 'Desserts', price: 9.00, description: 'Classic coffee-soaked layers and a light cocoa finish.', image: require('../../assets/dishes/tiramisu.png') },
  { id: '8', title: 'Fresh Lemonade', category: 'Drinks', price: 5.00, description: 'Freshly squeezed lemons served over ice with a hint of mint.', image: require('../../assets/dishes/lemonade.png') },
  { id: '9', title: 'Mint Iced Tea', category: 'Drinks', price: 4.50, description: 'Refreshing house-brewed iced tea with garden mint.', image: require('../../assets/dishes/iced-tea.png') },
];

export function filterMenu(items, category, search) {
  const q = search.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const categoryMatches = category === 'All' || item.category === category;
    const textMatches = !q || `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase().includes(q);
    return categoryMatches && textMatches;
  });
}
