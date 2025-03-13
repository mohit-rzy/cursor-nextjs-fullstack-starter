import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorDisplayProps {
  title?: string;
  description?: string;
  retry?: () => void;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  description = 'There was an error loading your gifts. Please try again later.',
  retry,
}: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-2">
        <p>{description}</p>
        {retry && (
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="w-fit mt-2"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
