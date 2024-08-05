import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo, useState } from 'react';
import { Star, CheckCircleIcon } from 'lucide-react';
import { Switch } from '../../../../../../components/ui/switch';
import Image from 'next/image';

interface ImageProps {
  image: {
    id: string;
    src: string;
  };
  className?: string;
  featured: boolean;
  isMarked: boolean;
  handleMarked: (id: string, marked: boolean) => void;
  handleFeatured: (id: string) => void;
  style?: React.CSSProperties;
}

const ImageContainer: React.FC<ImageProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
    handleFeatured,
    ...sanitizedProps
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    transition: {
      duration: 300,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: '0 0',
    touchAction: 'none',
    ...sanitizedProps.style,
  };

  const containerClasses = [
    'cursor-grab relative overflow-hidden flex items-center justify-center',
    className ?? '',
    isDragging ? '[&>*]:opacity-30 [&>*]:brightness-75 shadow-inner' : '',
    featured ? 'col-span-2 row-span-2' : '',
  ]
    .join(' ')
    .trim();

  return (
    <div
      {...sanitizedProps}
      {...attributes}
      {...listeners}
      className={containerClasses}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      style={style}
    >
      <Image
        className={`h-full w-full object-cover transition-transform duration-300 ${
          isHovered && !isDragging ? 'sm:scale-105' : ''
        }`}
        width={0}
        height={0}
        src={image?.src}
        alt={image?.id}
      />

      <div
        className={`overlay absolute inset-0 grid grid-cols-[repeat(2,_max-content)] place-content-between p-2 ${
          isMarked ? 'backdrop-brightness-105 backdrop-contrast-50' : ''
        }`}
      >
        <div>
          {!featured && isHovered && (
            <button
              className='rounded-full border-2 border-transparent bg-white fill-none text-2xl text-yellow-400 opacity-70 transition-colors hover:fill-current hover:opacity-100'
              onClick={() => {
                setIsHovered(false);
                handleFeatured(image.id);
              }}
              title='Set as featured image'
            >
              <Star className='fill-inherit w-5 h-5' />
            </button>
          )}
        </div>

        <div>
          <Switch
            checked={isMarked}
            onCheckedChange={(bool) => handleMarked(image.id, bool)}
          >
            <CheckCircleIcon
              color='blue'
              className={`fill-current transition-opacity w-5 h-5 ${
                isMarked ? 'opacity-100' : 'opacity-30 hover:opacity-70'
              }`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
ImageContainer.displayName = 'ImageContainer';
export default ImageContainer;
