import { CheckCircle, Trash } from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';

type GalleryTitleProps = {
  marked: string[];
  handleDelete: () => void;
};

const GalleryTitle = ({ marked, handleDelete }: GalleryTitleProps) => {
  return (
    <div className='top-0 z-[1] flex min-h-[3rem] flex-wrap items-center gap-1 overflow-y-hidden border-b bg-gray-100 px-4 py-2 [&_*]:leading-6'>
      <div>
        {!marked.length && <h5>Image Gallery</h5>}
        {!!marked.length && (
          <h6>
            <CheckCircle
              color='black'
              className='mr-2 inline align-text-bottom text-lg text-accent h-4 w-4'
            />
            {marked.length}{' '}
            <span className='max-sm:hidden'>
              {marked.length > 1 ? 'Files' : 'File'} Selected
            </span>
          </h6>
        )}
      </div>

      {!!marked.length && (
        <div className='ms-auto'>
          <Button
            onClick={handleDelete}
            variant={'ghost'}
            className='font-semibold text-red-700 hover:text-danger-hover hover:underline'
          >
            <Trash className='mr-2 h-4 w-4' /> Remove item(s)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryTitle;
