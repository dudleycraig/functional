import React from 'react';
import CarouselItem from './CarouselItem';

export default ({ items, width, ...props }, ref) => [items.map((item) => <CarouselItem key={`carousel-item-${item.name}`} item={item} />)];
