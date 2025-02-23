import { PuffLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <PuffLoader color="#2563eb" size={80} aria-label="Loading" />
    </div>
  )
}
