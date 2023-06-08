const Transaction = require('../model/transactions')
const Brand = require('../model/brands')
const Car = require('../model/cars')
const Seller = require('../model/sellers')
const User = require('../model/users')

async function brand(req, res) {
    try {
        const brand = new Brand(req.body)
        await brand.save()
        return res.status(201).json(brand)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

async function car(req, res) {
    try {
        const { sCarName, iBrandId, nYear } = req.body
        const brand = await Brand.findOne({ sBrand: iBrandId })
        console.log(brand)
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' })
        }
        const car = new Car({
            iBrandId: brand,
            sCarName,
            nYear
        })
        await car.save()
        return res.status(201).json(car)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal  server error' })
    }
}

async function user(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        return res.status(201).json(user)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal  server error' })
    }
}

async function seller(req, res) {
    try {
        const { sSellerName, sSellerCity, aCar } = req.body
        const carArr = []

        for (let car of aCar) {
            const carId = await Car.findOne({ sCarName: car })
            console.log(carId)
            if (!carId) {
                return res.status(404).json({ error: 'Car not found' })
            }
            console.log(carId)

            carArr.push(carId)
        }
        console.log(carArr)

        const seller = new Seller({
            sSellerName,
            sSellerCity,
            iCarId: carArr
        })

        await seller.save()
        return res.status(201).json(seller)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal  server error' })
    }
}

async function transaction(req, res) {
    try {

        const { iCarId, iSellerId, iUserId } = req.body
        const sellerId = await Seller.findOne({ sSellerName: iSellerId })
        // console.log("sellerId:",sellerId)
        const userId = await User.findOne({ sUserName: iUserId })
        // console.log(userId)
        const carId = await Car.findOne({ sCarName: iCarId })
        // console.log(carId)
        if(!carId){
            return res.status(404).json({error:"Car not found"})
        }

        const transaction = new Transaction({
            iSellerId: sellerId,
            iUserId: userId,
            iCarId: carId
        })
        await transaction.save()
        return res.status(201).json(transaction)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal  server error' })
    }
}

async function getTotalSoldCar(req, res) {
    const findCars = await Transaction.find().count()
    console.log(findCars)
    return res.status(200).json({ "Total Sold Car": findCars })
}

module.exports = {
    brand,
    car,
    user,
    seller,
    transaction,
    getTotalSoldCar
}