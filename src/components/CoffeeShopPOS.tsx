'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Coffee, Cake, IceCream, ShoppingCart, DollarSign, TrendingUp, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { listProducts } from '@/services/ProductService'

type Product = {
    id: number
    name: string
    price: number
    category: 'coffee' | 'pastry' | 'dessert'
    imgUrl: string
}

type CartItem = Product & { quantity: number }

// const products: Product[] = [
//     { id: 1, name: 'Espresso', price: 2.5, category: 'coffee', image: 'https://i.pinimg.com/564x/fe/eb/7d/feeb7da08ad6833143122b12bb31dd99.jpg' },
//     { id: 2, name: 'Latte', price: 3.5, category: 'coffee', image: 'https://i.pinimg.com/564x/f9/68/d6/f968d6cbefadd0aa8ed53f321be9491c.jpg' },
//     { id: 3, name: 'Cappuccino', price: 3.5, category: 'coffee', image: 'https://i.pinimg.com/564x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg' },
//     { id: 4, name: 'Croissant', price: 2.0, category: 'pastry', image: 'https://i.pinimg.com/564x/fe/44/1d/fe441dc93ec730d2d92cfe6c0cb66866.jpg' },
//     { id: 5, name: 'Chocolate Cake', price: 4.0, category: 'pastry', image: 'https://i.pinimg.com/564x/b1/ff/76/b1ff76226cb167de0152fbdcc8d8e080.jpg' },
//     { id: 6, name: 'Ice Cream', price: 3.0, category: 'dessert', image: 'https://i.pinimg.com/564x/b1/b0/c8/b1b0c89d4291bfb089d415c4e7c59931.jpg' },
// ]


export default function CoffeeShopPOS() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([])
    const [dailySales, setDailySales] = useState(0)
    const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'pastry' | 'dessert'>('all')

    useEffect(() => {
        listProducts().then(response => setProducts(response.data))
    }, [])

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const handleCheckout = () => {
        const total = getTotalPrice()
        setDailySales(prevSales => prevSales + total)
        setCart([])
        alert(`Venta completada. Total: $${total.toFixed(2)}`)
    }

    const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)

    return (
        <div className="container mx-auto p-4 bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">Coffee Shop</h1>
            <Tabs defaultValue="menu" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 h-14 items-stretch">
                    <TabsTrigger value="menu" className="text-lg">Menú</TabsTrigger>
                    <TabsTrigger value="cart" className="text-lg">Carrito</TabsTrigger>
                    <TabsTrigger value="management" className="text-lg">Gestión</TabsTrigger>
                </TabsList>
                <TabsContent value="menu" className="space-y-4">
                    <div className="flex justify-center space-x-2 mb-4">
                        <Button
                            variant={activeCategory === 'all' ? "default" : "outline"}
                            onClick={() => setActiveCategory('all')}
                        >
                            Todos
                        </Button>
                        <Button
                            variant={activeCategory === 'coffee' ? "default" : "outline"}
                            onClick={() => setActiveCategory('coffee')}
                        >
                            <Coffee className="mr-2 h-4 w-4" />
                            Café
                        </Button>
                        <Button
                            variant={activeCategory === 'pastry' ? "default" : "outline"}
                            onClick={() => setActiveCategory('pastry')}
                        >
                            <Cake className="mr-2 h-4 w-4" />
                            Pasteles
                        </Button>
                        <Button
                            variant={activeCategory === 'dessert' ? "default" : "outline"}
                            onClick={() => setActiveCategory('dessert')}
                        >
                            <IceCream className="mr-2 h-4 w-4" />
                            Postres
                        </Button>
                    </div>
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <CardHeader className="p-0">
                                            <Image
                                                src={product.imgUrl}
                                                alt={product.name}
                                                className="w-full h-40 object-cover"
                                                width={400}
                                                height={400}
                                                quality={100}
                                                priority // Prioriza el cargado
                                            />

                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <CardTitle className="flex items-center justify-between mb-2">
                                                {product.name}
                                                <Badge variant="secondary">
                                                    ${product.price.toFixed(2)}
                                                </Badge>
                                            </CardTitle>
                                            <Button className="w-full" onClick={() => addToCart(product)}>
                                                Agregar al carrito
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </TabsContent>
                <TabsContent value="cart">
                    <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Carrito de Compras</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] pr-4">
                                {cart.map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Image src={item.imgUrl} alt={item.name} className="w-12 h-12 object-fill rounded" width={100} height={100} />
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </ScrollArea>
                            <div className="mt-6 space-y-4">
                                <p className="text-2xl font-bold text-right">Total: ${getTotalPrice().toFixed(2)}</p>
                                <Button
                                    className="w-full h-12 text-lg"
                                    onClick={handleCheckout}
                                    disabled={cart.length === 0}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Completar Compra
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="management">
                    <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Panel de Gestión</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Ventas Diarias</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold flex items-center justify-center h-24">
                                            <DollarSign className="mr-2 h-8 w-8" />
                                            {dailySales.toFixed(2)}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Producto Más Vendido</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-semibold flex items-center justify-center h-24">
                                            <TrendingUp className="mr-2 h-6 w-6" />
                                            Latte
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}