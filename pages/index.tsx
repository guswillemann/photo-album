import { Footer, Header, PhotosList } from '../src/components';
import photosData from '../public/photosData.json';
import Button from '../src/components/Button';
import { useSettingsContext } from '../src/hooks';

const { photos }: any = photosData;

export default function Home() {
  const { isAutoLoad } = useSettingsContext();

  return (
    <div className="app-container">
      <Header />
      <main>
        <PhotosList photoDataArr={photos} />
        {isAutoLoad && <Button variant="default">Load more</Button>}
      </main>
      <Footer />
    </div>
  )
}
