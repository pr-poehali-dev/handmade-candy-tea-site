import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { CartItem } from './Cart'

interface OrderFormProps {
  cartItems: CartItem[]
  totalAmount: number
  onOrderSubmit: (orderData: OrderData) => void
}

export interface OrderData {
  customerInfo: {
    name: string
    phone: string
    email: string
  }
  deliveryInfo: {
    type: 'courier' | 'pickup' | 'post'
    address: string
    city: string
    postalCode: string
    comment: string
  }
  paymentMethod: 'cash' | 'card' | 'online'
}

export default function OrderForm({ cartItems, totalAmount, onOrderSubmit }: OrderFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<OrderData>({
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    },
    deliveryInfo: {
      type: 'courier',
      address: '',
      city: 'Москва',
      postalCode: '',
      comment: ''
    },
    paymentMethod: 'cash'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerInfo.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }

    if (!formData.customerInfo.phone.trim()) {
      newErrors.phone = 'Введите номер телефона'
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.customerInfo.phone)) {
      newErrors.phone = 'Некорректный номер телефона'
    }

    if (!formData.customerInfo.email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerInfo.email)) {
      newErrors.email = 'Некорректный email'
    }

    if (formData.deliveryInfo.type !== 'pickup' && !formData.deliveryInfo.address.trim()) {
      newErrors.address = 'Введите адрес доставки'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onOrderSubmit(formData)
      setIsOpen(false)
      // Сброс формы
      setFormData({
        customerInfo: { name: '', phone: '', email: '' },
        deliveryInfo: { type: 'courier', address: '', city: 'Москва', postalCode: '', comment: '' },
        paymentMethod: 'cash'
      })
    }
  }

  const deliveryCost = formData.deliveryInfo.type === 'courier' ? (totalAmount >= 2000 ? 0 : 300) : 
                     formData.deliveryInfo.type === 'post' ? 350 : 0

  const finalAmount = totalAmount + deliveryCost

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold"
          disabled={cartItems.length === 0}
        >
          <Icon name="CreditCard" size={20} className="mr-2" />
          Оформить заказ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Icon name="Package" size={24} className="text-primary" />
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Информация о заказе */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">×{item.quantity}</span>
                    </div>
                    <span className="font-semibold">{item.price * item.quantity} ₽</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Товары:</span>
                  <span>{totalAmount} ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Доставка:</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{finalAmount} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={formData.customerInfo.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, name: e.target.value }
                  }))}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.customerInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, phone: e.target.value }
                  }))}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={formData.customerInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, email: e.target.value }
                  }))}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Способ доставки */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Способ доставки</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.deliveryInfo.type}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  deliveryInfo: { ...prev.deliveryInfo, type: value as 'courier' | 'pickup' | 'post' }
                }))}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="courier" id="courier" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="courier" className="font-semibold">Курьерская доставка</Label>
                    <p className="text-sm text-gray-600">
                      По Москве и области. {totalAmount >= 2000 ? 'Бесплатно' : '300 ₽'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="pickup" className="font-semibold">Самовывоз</Label>
                    <p className="text-sm text-gray-600">
                      Москва, ул. Сладкая, д. 15. Бесплатно
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="post" id="post" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="post" className="font-semibold">Почтовая доставка</Label>
                    <p className="text-sm text-gray-600">
                      По всей России. От 350 ₽
                    </p>
                  </div>
                </div>
              </RadioGroup>

              {formData.deliveryInfo.type !== 'pickup' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="city">Город</Label>
                    <Select
                      value={formData.deliveryInfo.city}
                      onValueChange={(value) => setFormData(prev => ({
                        ...prev,
                        deliveryInfo: { ...prev.deliveryInfo, city: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Москва">Москва</SelectItem>
                        <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                        <SelectItem value="Другой">Другой город</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      placeholder="Улица, дом, квартира"
                      value={formData.deliveryInfo.address}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        deliveryInfo: { ...prev.deliveryInfo, address: e.target.value }
                      }))}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  {formData.deliveryInfo.type === 'post' && (
                    <div>
                      <Label htmlFor="postalCode">Почтовый индекс</Label>
                      <Input
                        id="postalCode"
                        placeholder="123456"
                        value={formData.deliveryInfo.postalCode}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          deliveryInfo: { ...prev.deliveryInfo, postalCode: e.target.value }
                        }))}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea
                      id="comment"
                      placeholder="Дополнительная информация для курьера"
                      value={formData.deliveryInfo.comment}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        deliveryInfo: { ...prev.deliveryInfo, comment: e.target.value }
                      }))}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Способ оплаты */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Способ оплаты</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  paymentMethod: value as 'cash' | 'card' | 'online'
                }))}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Наличными при получении</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Картой при получении</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Онлайн оплата</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Отменить
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <Icon name="Check" size={20} className="mr-2" />
              Подтвердить заказ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}