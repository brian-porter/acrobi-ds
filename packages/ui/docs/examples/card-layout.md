# Card Layout Example

Responsive card layouts for displaying content in organized, scannable formats using the Acrobi Design System.

## Overview

This example demonstrates various card layout patterns including grid layouts, masonry layouts, and responsive designs. Cards are fundamental for organizing content in dashboards, product catalogs, and content feeds.

## Features

- **Responsive Grid Layouts** - Adapts to different screen sizes
- **Masonry Layout** - Pinterest-style staggered grid
- **Interactive Cards** - Hover effects and click handling
- **Loading States** - Skeleton loading for better UX
- **Empty States** - Graceful handling of no content
- **Accessibility** - Keyboard navigation and screen reader support

## Basic Card Grid

```tsx
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Avatar
} from '@acrobi/ui';

function BasicCardGrid() {
  const cards = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A revolutionary new approach to data visualization',
      status: 'active',
      progress: 75,
      team: ['john.jpg', 'jane.jpg', 'mike.jpg'],
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Marketing Campaign',
      description: 'Q1 product launch campaign across all channels',
      status: 'planning',
      progress: 30,
      team: ['sarah.jpg', 'tom.jpg'],
      dueDate: '2024-03-01'
    },
    {
      id: 3,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website and branding',
      status: 'completed',
      progress: 100,
      team: ['alex.jpg', 'emma.jpg', 'david.jpg'],
      dueDate: '2024-01-30'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={
                  card.status === 'active' ? 'default' :
                  card.status === 'completed' ? 'success' : 'secondary'
                }>
                  {card.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Due {new Date(card.dueDate).toLocaleDateString()}
                </span>
              </div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{card.progress}%</span>
                  </div>
                  <Progress value={card.progress} className="h-2" />
                </div>
                
                <div>
                  <span className="text-sm text-gray-600 mb-2 block">Team</span>
                  <div className="flex -space-x-2">
                    {card.team.map((member, index) => (
                      <Avatar
                        key={index}
                        src={`/avatars/${member}`}
                        fallback={member[0].toUpperCase()}
                        size="sm"
                        className="border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Product Card Grid

```tsx
function ProductCardGrid() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: '/products/headphones.jpg',
      rating: 4.5,
      reviews: 128,
      badge: 'Sale',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: '/products/watch.jpg',
      rating: 4.8,
      reviews: 89,
      badge: 'New',
      inStock: true
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 79.99,
      originalPrice: 99.99,
      image: '/products/speaker.jpg',
      rating: 4.2,
      reviews: 256,
      inStock: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              {product.badge && (
                <Badge 
                  className="absolute top-2 left-2"
                  variant={product.badge === 'Sale' ? 'destructive' : 'default'}
                >
                  {product.badge}
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Masonry Layout

```tsx
import { useState, useEffect } from 'react';

function MasonryLayout() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts with varying heights
    const loadPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPosts = [
        {
          id: 1,
          title: 'Beautiful Sunset',
          image: '/images/sunset.jpg',
          height: 300,
          author: 'John Doe',
          likes: 42,
          comments: 8
        },
        {
          id: 2,
          title: 'Mountain Adventure',
          image: '/images/mountain.jpg',
          height: 400,
          author: 'Jane Smith',
          likes: 128,
          comments: 23
        },
        {
          id: 3,
          title: 'City Lights',
          image: '/images/city.jpg',
          height: 250,
          author: 'Mike Johnson',
          likes: 89,
          comments: 15
        },
        // More posts...
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <MasonryLoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Photo Gallery</h1>
      
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {posts.map((post) => (
          <Card 
            key={post.id} 
            className="mb-6 break-inside-avoid hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
                style={{ height: `${post.height}px` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm opacity-90">by {post.author}</p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Loading States

```tsx
function MasonryLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="mb-6 break-inside-avoid">
            <div 
              className="bg-gray-200 animate-pulse"
              style={{ height: `${200 + Math.random() * 200}px` }}
            ></div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

## Interactive Cards

```tsx
function InteractiveCards() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [favoriteCards, setFavoriteCards] = useState(new Set());

  const toggleFavorite = (cardId) => {
    setFavoriteCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleKeyDown = (event, card) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(card);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`
            cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${selectedCard?.id === card.id ? 'ring-2 ring-primary' : ''}
          `}
          tabIndex={0}
          onClick={() => handleCardClick(card)}
          onKeyDown={(e) => handleKeyDown(e, card)}
          role="button"
          aria-label={`Select ${card.title}`}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="group-hover:text-primary transition-colors">
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(card.id);
                }}
                className="ml-2"
                aria-label={`${favoriteCards.has(card.id) ? 'Remove from' : 'Add to'} favorites`}
              >
                <svg 
                  className={`w-4 h-4 ${
                    favoriteCards.has(card.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400'
                  }`}
                  fill={favoriteCards.has(card.id) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{card.category}</span>
              <span>{card.date}</span>
            </div>
          </CardContent>
          
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <Badge variant={card.status === 'published' ? 'success' : 'secondary'}>
                {card.status}
              </Badge>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button size="sm">
                  View
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

## Responsive Behavior

```tsx
function ResponsiveCardGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile: Single column */}
      {/* Tablet: 2 columns */}
      {/* Desktop: 3 columns */}
      {/* Large: 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-base sm:text-lg">{card.title}</CardTitle>
              <CardDescription className="text-sm">{card.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              {/* Content that grows to fill available space */}
            </CardContent>
            
            <CardFooter className="flex-shrink-0">
              <Button className="w-full text-sm">
                Action
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Empty State

```tsx
function EmptyCardGrid() {
  const [hasCards, setHasCards] = useState(false);

  if (!hasCards) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first project.</p>
          <Button onClick={() => setHasCards(true)}>
            Create Project
          </Button>
        </div>
      </div>
    );
  }

  return <CardGrid />;
}
```

## Best Practices

### Performance
- Use `React.memo` for card components in large lists
- Implement virtual scrolling for very large datasets
- Lazy load images with proper loading states
- Use CSS `contain` property for better rendering performance

### Accessibility
- Include proper ARIA labels and roles
- Ensure keyboard navigation works correctly
- Provide sufficient color contrast
- Use semantic HTML structure

### Responsive Design
- Design mobile-first with progressive enhancement
- Use CSS Grid for flexible layouts
- Consider touch targets on mobile devices
- Test on various screen sizes

### User Experience
- Provide loading states for better perceived performance
- Include hover and focus states for interactive elements
- Use consistent spacing and alignment
- Handle empty states gracefully

## Related Examples

- [Data Tables](./data-tables.md) - Tabular data display
- [Dashboard App](./dashboard-app.md) - Complete dashboard with cards
- [Responsive Design](./responsive-design.md) - Mobile-first patterns

## Next Steps

- Implement infinite scrolling for large datasets
- Add drag-and-drop functionality
- Create custom card variants
- Add animation and micro-interactions