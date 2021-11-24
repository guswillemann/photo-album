import { Footer, Header, PhotosList } from '../src/components';
import photosData from '../public/photosData.json';
import Button from '../src/components/Button';

const { photos }: any = photosData;

export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <PhotosList photoDataArr={photos} />
        <Button variant="default">Load more</Button>
      </main>
      <Footer />
    </div>
  )
}
