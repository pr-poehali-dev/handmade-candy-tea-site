import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Icon from '@/components/ui/icon'
import OrderForm from './OrderForm'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onClearCart: () => void
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) {
  const [isOpen, setIsOpen] = useState(false)

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(id)
    } else {
      onUpdateQuantity(id, newQuantity)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} className="text-primary" />
            Корзина
          </SheetTitle>
          <SheetDescription>
            {totalItems > 0 
              ? `${totalItems} ${totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'} на сумму ${totalAmount} ₽`
              : 'Ваша корзина пуста'
            }
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="ShoppingCart" size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-6">Корзина пуста</p>
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Перейти к покупкам
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-2 border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`mt-1 ${item.category === 'candy' ? 'bg-coral text-white' : 'bg-secondary text-white'}`}
                        >
                          {item.category === 'candy' ? 'Карамель' : 'Чай'}
                        </Badge>
                        <p className="text-lg font-bold text-primary mt-2">{item.price} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-8 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        {item.price * item.quantity} ₽
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {items.length > 0 && (
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={onClearCart}
                    className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Очистить корзину
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-6 space-y-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Итого:</span>
                <span className="text-primary">{totalAmount} ₽</span>
              </div>
              <OrderForm 
                cartItems={items}
                totalAmount={totalAmount}
                onOrderSubmit={(orderData) => {
                  console.log('Заказ оформлен:', orderData)
                  alert(`Спасибо за заказ, ${orderData.customerInfo.name}! Мы свяжемся с вами в ближайшее время.`)
                  onClearCart()
                }}
              />
              <p className="text-xs text-gray-500 text-center">
                Бесплатная доставка при заказе от 2000 ₽
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}