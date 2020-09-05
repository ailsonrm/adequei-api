import express from 'express'
import SampleController from '@controllers/SampleController'

const routes = express.Router()
const sampleController = new SampleController()

// SAMPLE ROUTE
routes.get('/sample', sampleController.index)

export default routes
