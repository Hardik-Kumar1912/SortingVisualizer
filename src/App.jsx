import { Toaster } from 'react-hot-toast';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <SortingVisualizer />
      <Toaster />
    </div>
  );
}

export default App;
