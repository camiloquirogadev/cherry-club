import CategoryCard from '../components/CategoryCard'
import remeraImg from '../assets/remera.jpg'
import tazaImg from '../assets/taza.jpg'
import stickerImg from '../assets/sticker.jpg'

const Categories = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Categorías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CategoryCard title="Remeras" image={remeraImg} />
        <CategoryCard title="Tazas" image={tazaImg} />
        <CategoryCard title="Stickers" image={stickerImg} />
      </div>
    </section>
  )
}

export default Categories
