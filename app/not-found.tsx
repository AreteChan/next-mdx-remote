import { SmileySad } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center pt-[10%] gap-2">
      <SmileySad size={48} className="text-gray-400"/>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find this page.</p>
      <Button variant='secondary'>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}