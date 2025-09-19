import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'
import Cart from '@/components/Cart'
import { useCart } from '@/hooks/useCart'
import Logo from '@/components/Logo'

export default function Index() {
  const [activeSection, setActiveSection] = useState('catalog')
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()

  const candyProducts = [
    {
      id: 1,
      name: 'Фруктовая карамель',
      price: 350,
      image: '/img/77cdccc8-fba0-4550-9a4d-703504dc8f4c.jpg',
      description: 'Ароматная карамель с натуральными фруктовыми вкусами',
      category: 'candy'
    },
    {
      id: 2,
      name: 'Мятная карамель',
      price: 320,
      image: '/img/77cdccc8-fba0-4550-9a4d-703504dc8f4c.jpg',
      description: 'Освежающая карамель с мятой и эвкалиптом',
      category: 'candy'
    },
    {
      id: 3,
      name: 'Медовая карамель',
      price: 380,
      image: '/img/77cdccc8-fba0-4550-9a4d-703504dc8f4c.jpg',
      description: 'Натуральная карамель на основе цветочного меда',
      category: 'candy'
    }
  ]

  const teaProducts = [
    {
      id: 4,
      name: 'Черный чай Earl Grey',
      price: 450,
      image: '/img/a6ed51aa-09ed-443a-b1ce-44ba775406d2.jpg',
      description: 'Классический английский чай с бергамотом',
      category: 'tea'
    },
    {
      id: 5,
      name: 'Зеленый чай Жасмин',
      price: 520,
      image: '/img/a6ed51aa-09ed-443a-b1ce-44ba775406d2.jpg',
      description: 'Нежный зеленый чай с ароматом жасмина',
      category: 'tea'
    },
    {
      id: 6,
      name: 'Травяной сбор',
      price: 380,
      image: '/img/a6ed51aa-09ed-443a-b1ce-44ba775406d2.jpg',
      description: 'Целебный сбор из горных трав и ягод',
      category: 'tea'
    }
  ]

  const allProducts = [...candyProducts, ...teaProducts]

  const renderCatalog = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Наш каталог</h2>
        
        <div className="flex justify-center mb-8 space-x-4">
          <Button 
            variant="outline" 
            className="border-coral text-coral hover:bg-coral hover:text-white transition-all duration-300"
          >
            Все товары
          </Button>
          <Button 
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Карамель
          </Button>
          <Button 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-gray-800 transition-all duration-300"
          >
            Чай
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
              <CardHeader className="p-0">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-semibold text-gray-800">{product.name}</CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={product.category === 'candy' ? 'bg-coral text-white' : 'bg-secondary text-white'}
                  >
                    {product.category === 'candy' ? 'Карамель' : 'Чай'}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 mb-4">
                  {product.description}
                </CardDescription>
                <p className="text-2xl font-bold text-primary mb-4">{product.price} ₽</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 transition-all duration-300"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  const renderAbout = () => (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">О нас</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/img/36db249e-be8d-47c9-b91e-99bd4bd92cd9.jpg" 
                alt="Наша команда"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                Мы — семейная мастерская, которая уже более 10 лет создает уникальную карамель ручной работы прямо в нашем магазине и подбирает лучшие сорта чая со всего мира.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Каждая конфета варится вручную на ваших глазах, используя только натуральные ингредиенты без искусственных добавок и консервантов. Вы можете наблюдать весь процесс создания карамели!
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-gray-600">лет опыта</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-gray-600">довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderDelivery = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Доставка</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Icon name="Truck" size={24} className="mr-3" />
                  Курьерская доставка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">По Москве и области</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• В пределах МКАД — 300 ₽</li>
                  <li>• За МКАД — 300 ₽ + 30 ₽/км</li>
                  <li>• Бесплатно при заказе от 2000 ₽</li>
                  <li>• Доставка в день заказа</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-secondary">
                  <Icon name="Package" size={24} className="mr-3" />
                  Почтовая доставка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">По всей России</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Почта России — от 350 ₽</li>
                  <li>• СДЭК — от 280 ₽</li>
                  <li>• Boxberry — от 250 ₽</li>
                  <li>• Доставка 3-7 дней</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 border-accent">
            <CardHeader>
              <CardTitle className="text-center text-gray-800">Условия доставки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <Icon name="Clock" size={32} className="mx-auto mb-2 text-accent" />
                  <h4 className="font-semibold text-gray-800">Быстро</h4>
                  <p className="text-gray-600 text-sm">Отправка в день заказа</p>
                </div>
                <div>
                  <Icon name="Shield" size={32} className="mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-gray-800">Надежно</h4>
                  <p className="text-gray-600 text-sm">Защитная упаковка</p>
                </div>
                <div>
                  <Icon name="MapPin" size={32} className="mx-auto mb-2 text-secondary" />
                  <h4 className="font-semibold text-gray-800">Удобно</h4>
                  <p className="text-gray-600 text-sm">Отслеживание заказа</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  const renderContacts = () => (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Контакты</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Свяжитесь с нами</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Icon name="Phone" size={20} className="mr-3 text-primary" />
                <span className="text-gray-700">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center">
                <Icon name="Mail" size={20} className="mr-3 text-primary" />
                <span className="text-gray-700">info@caramel-tea.ru</span>
              </div>
              <div className="flex items-center">
                <Icon name="MapPin" size={20} className="mr-3 text-primary" />
                <span className="text-gray-700">Москва, ул. Сладкая, д. 15</span>
              </div>
              <div className="flex items-center">
                <Icon name="Clock" size={20} className="mr-3 text-primary" />
                <span className="text-gray-700">Пн-Вс: 9:00 - 21:00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-secondary">Напишите нам</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="border-gray-300 focus:border-secondary" />
                <Input placeholder="Ваш email" type="email" className="border-gray-300 focus:border-secondary" />
                <Input placeholder="Телефон" className="border-gray-300 focus:border-secondary" />
                <textarea 
                  placeholder="Ваше сообщение"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-secondary focus:outline-none resize-none"
                  rows={4}
                />
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" showText={true} />
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === 'about' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                О нас
              </button>
              <button 
                onClick={() => setActiveSection('delivery')}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === 'delivery' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Доставка
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Контакты
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Cart 
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
              />
              <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-white md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Карамельный чай
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Карамель ручной работы прямо в нашем магазине и премиальный чай. 
            Создаем сладкие моменты с 2014 года
          </p>
          <Button 
            size="lg"
            onClick={() => setActiveSection('catalog')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Посмотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {activeSection === 'catalog' && renderCatalog()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'delivery' && renderDelivery()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="sm" showText={true} />
              </div>
              <p className="text-gray-400">Карамель ручной работы прямо в магазине и премиальный чай с доставкой по всей России</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Карамель</li>
                <li>Черный чай</li>
                <li>Зеленый чай</li>
                <li>Травяные сборы</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Возврат товара</li>
                <li>Контакты</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>+7 (495) 123-45-67</p>
                <p>info@caramel-tea.ru</p>
                <p>Москва, ул. Сладкая, д. 15</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Карамельный чай. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}